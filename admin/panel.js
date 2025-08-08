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
    query,
    } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

    // Verifica si el usuario está logueado
    onAuthStateChanged(auth, async (user) => {
    if (user) {
        const uid = user.uid;

        // Verificamos el rol en la colección "usuarios"
        const docRef = doc(db, "usuarios", uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
        const data = docSnap.data();
        if (data.rol === "admin") {
            document.getElementById("eliminarTodo").style.display = "inline-block";
            document.getElementById("eliminarTodo").addEventListener("click", eliminarSolicitudes);
        }
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

    const q = query(collection(db, "solicitudes"), orderBy("urgencia", "asc"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        const data = doc.data();
        const div = document.createElement("div");
        div.className = "solicitud";
        let realizadotext="INDEFINIDO";
        if (data.realizado===0){
            realizadotext="VIGENTE";
        }else{
            realizadotext="TOMADO";
        }

        const urgenciaClase = data.urgencia.toLowerCase();

        div.innerHTML = `
        <div class="solicitud-box ${urgenciaClase}";>
            <div class="servicio-title">
                <p class="servicio">${data.servicio}</p>
                <button class="eliminarSolicitud oculto" onclick="eliminarSolicitud('${doc.id}')">Borrar</button>
                <button id="cambiarEstado" onclick="cambiarEstado('${doc.id}')">Cambiar Estado</button>
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
    }

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

        // Actualizar solo el campo "realizado"
        await updateDoc(solicitudRef, {
            realizado: nuevoEstado
        });

        console.log(`✅ Estado cambiado a ${nuevoEstado}`);
        // Opcional: recargar la lista para ver el cambio
        await cargarSolicitudes();
        
    } catch (error) {
        console.error("Error al cambiar estado:", error);
        alert("Error al cambiar estado.");
    }
}

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
        await deleteDoc(doc(db, "solicitudes", docId));
        alert("Solicitud eliminada correctamente.");
        cargarSolicitudes(); // recargar la lista
    } catch (error) {
        console.error("Error al eliminar solicitud:", error);
        alert("Error al eliminar solicitud.");
    }
}
