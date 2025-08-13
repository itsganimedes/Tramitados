import { auth, db } from './firebaselogin.js';
import {
    signOut,
    onAuthStateChanged
    } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";
    import {
    collection,
    updateDoc,
    getDocs,
    doc,
    getDoc,
    deleteDoc,
    orderBy,
    onSnapshot,
    query,
    deleteField,
    } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

    // Verifica si el usuario está logueado
    onAuthStateChanged(auth, async (user) => {
    if (user) {
        const uid = user.uid;

        // Verificamos el rol en la colección "usuarios"
        const docRef = doc(db, "usuarios", uid);
        const docSnap = await getDoc(docRef);
        const data = docSnap.data();

        const pfecha = document.getElementById("fechaactual");
        const fechaActual = new Date();
        const dia = String(fechaActual.getDate()).padStart(2, '0');
        const mes = String(fechaActual.getMonth() + 1).padStart(2, '0'); // +1 porque enero es 0
        const año = fechaActual.getFullYear();
        const fechaFormateada = `${dia}/${mes}/${año}`;
        pfecha.textContent = fechaFormateada;

        if (docSnap.exists()) {            
            if (data.rol === "admin") {
                document.getElementById("eliminarTodo").style.display = "inline-block";
                document.getElementById("eliminarTodo").addEventListener("click", eliminarSolicitudes);
            }
            const p = document.getElementById("username");
            p.textContent = data.nombre;
        }

        cargarSolicitudes();
    } else {
        window.location.href = "login.html"; // Redirige si no está logueado
    }
    });

    // Cerrar sesión
    document.getElementById("logout").addEventListener("click", async () => {
    await signOut(auth);
    window.location.href = "login.html";
    });






    
    // Cargar solicitudes desde Firestore
    async function cargarSolicitudes() {
    const container = document.getElementById("solicitudes-container");
    container.innerHTML = "";

    const user = auth.currentUser;
    
    if (!user) {
        alert("No estás logueado.");
        return;
    }

    // Obtener el documento del usuario para ver su rol
    const userDocRef = doc(db, "usuarios", user.uid);
    const userDocSnap = await getDoc(userDocRef);

    if (!userDocSnap.exists()) {
        alert("Tu usuario no tiene permisos.");
        return;
    }

    const userData = userDocSnap.data();
    const rol = userData.rol;

    if (rol === "admin"){
        const p=document.getElementById("adminp");
        p.classList.remove('oculto');
    } else if (rol === "mod"){
        const p=document.getElementById("modp");
        p.classList.remove('oculto');
    } else {
        window.location.href="login.html";
        return
    }

    const q = query(collection(db, "solicitudes"), orderBy("prioridad", "asc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
        container.innerHTML = "";

        querySnapshot.forEach((docSnap) => {

        const data = docSnap.data();
        const id = docSnap.id;
        const div = document.createElement("div");
        div.className = "solicitud";
        let realizadotext="INDEFINIDO";
        let estadocolor = "none";
        if (data.realizado===0){
            realizadotext="VIGENTE";
        }else{
            realizadotext="TOMADO";
            estadocolor = "cambiarcolor"; // ahora es un color
        }
        const urgenciaClase = data.urgencia.toLowerCase();

        div.innerHTML = `
        <div class="solicitud-box ${urgenciaClase} ${estadocolor}">
            <div class="servicio-title">
                <p class="servicio ${data.urgencia}">
                    ${data.servicio}${data.servicio === "Servicio Técnico" && data.servicio_esp ? " - " + data.servicio_esp : ""}
                </p>
                <button class="eliminarSolicitud oculto" onclick="eliminarSolicitud('${docSnap.id}')">Borrar</button>
                <button id="cambiarEstado" onclick="cambiarEstado('${docSnap.id}')">Cambiar Estado</button>
            </div>
            <div><span class="label estado">Estado:</span> ${realizadotext}</div>
            <div><span class="label">Nombre:</span> ${data.nombre}</div>
            <div><span class="label">Teléfono:</span> ${data.telefono}</div>
            <div><span class="label">Ubicación:</span> ${data.ubicacion}</div>
            <div><span class="label">Urgencia:</span> ${data.urgencia}</div>
            <div><span class="label">Hora:</span> ${data.hora}</div>
            <div>
                <span class="label">Comentario:</span>
                <div class="comentario">${data.comentario}</div>
            </div>
        </div>
        `;
        if (rol === "admin"){
            const btnEliminar = div.querySelector(".eliminarSolicitud");
            btnEliminar.classList.remove("oculto");
        }
        
        container.appendChild(div);
    });
    const totalSolicitudes = querySnapshot.size;
    document.getElementById("totalSolicitudes").textContent = `Total de solicitudes: ${totalSolicitudes}`;
    })};








    // Eliminar TODAS las solicitudes
    async function eliminarSolicitudes() {
    if (!confirm("¿Estás seguro de que querés eliminar TODAS las solicitudes?")) return;

    const querySnapshot = await getDocs(collection(db, "solicitudes"));
    for (const docu of querySnapshot.docs) {
        await deleteDoc(doc(db, "solicitudes", docu.id));
    }

    alert("Todas las solicitudes fueron eliminadas.");
    cargarSolicitudes(); // Recargar panel vacío
}

window.cambiarEstado = async function (docId) {
    const user = auth.currentUser;
    if (!user) {
        alert("No estás logueado.");
        return;
    }

    const userDocRef = doc(db, "usuarios", user.uid);
    const userDocSnap = await getDoc(userDocRef);

    if (!userDocSnap.exists()) {
        alert("Tu usuario no tiene permisos.");
        return;
    }

    const userData = userDocSnap.data();
    const rol = userData.rol;

    if (rol !== "admin" && rol !== "mod") {
        alert("No tienes permiso para cambiar el estado de solicitudes.");
        return;
    }

    try {
        // Referencia a la solicitud
        const solicitudRef = doc(db, "solicitudes", docId);

        // Obtener el documento actual
        const solicitudSnap = await getDoc(solicitudRef);
        if (!solicitudSnap.exists()) {
            alert("La solicitud no existe.");
            return;
        }

        const data = solicitudSnap.data();

        const nuevoEstado = data.realizado === 0 ? 1 : 0; // Alternar entre 0 y 1

        // Lógica para prioridad:
        // Si prioridad actual es distinto de 0, la pongo a 0 y guardo original en prioridadOriginal
        // Si prioridad es 0, la vuelvo a prioridadOriginal y elimino prioridadOriginal
        let nuevaPrioridad = data.prioridad;
        let updates = { realizado: nuevoEstado };

        if (data.prioridad !== 4) {
            // Poner prioridad a 4
            updates.prioridad = 4;
        } else {
            // Restaurar prioridad desde prioridadOriginal si existe
            if (data.prioridadOriginal !== undefined) {
                updates.prioridad = data.prioridadOriginal;
            } else {
                // Si no existe prioridadOriginal, dejamos prioridad como está
                updates.prioridad = 0;
            }
        }

        // Actualizar documento con los cambios
        await updateDoc(solicitudRef, updates);

        console.log(`✅ Estado cambiado a ${nuevoEstado}, prioridad actualizada.`);
        await cargarSolicitudes();

    } catch (error) {
        console.error("Error al cambiar estado:", error);
        alert("Error al cambiar estado.");
    }

}

// Eliminar una solicitud
window.eliminarSolicitud = async function(docId) {
    const user = auth.currentUser;
    if (!user) {
        alert("No estás logueado.");
        return;
    }

    // Obtener el documento del usuario para ver su rol
    const userDocRef = doc(db, "usuarios", user.uid);
    const userDocSnap = await getDoc(userDocRef);

    if (!userDocSnap.exists()) {
        alert("Tu usuario no tiene permisos.");
        return;
    }

    const userData = userDocSnap.data();
    const rol = userData.rol;

    if (rol !== "admin") {
        alert("No tienes permiso para eliminar solicitudes.");
        return;
    }

    // Si pasó todas las validaciones, eliminamos la solicitud
    try {
        console.log(docId);
        await deleteDoc(doc(db, "solicitudes", docId));
        alert("Solicitud eliminada correctamente.");
        cargarSolicitudes(); // recargar la lista
    } catch (error) {
        console.error("Error al eliminar solicitud:", error);
        alert("Error al eliminar solicitud.");
    }
}
