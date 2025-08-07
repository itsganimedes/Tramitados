import { auth, db } from './firebaselogin.js';
import { signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

// Verifica si el usuario está logueado
onAuthStateChanged(auth, async (user) => {
    if (user) {
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

    const querySnapshot = await getDocs(collection(db, "solicitudes"));
    querySnapshot.forEach((doc) => {
        const data = doc.data();

        const div = document.createElement("div");
        div.className = "solicitud";
        div.innerHTML = `
        <div class="solicitud-box">
            <div class=servicio-title>
                <p class=servicio>${data.servicio}</p>
            </div>
            <div><span class="label">Nombre:</span> ${data.nombre}</div>
            <div><span class="label">Teléfono:</span> ${data.telefono}</div>
            <div><span class="label">Ubicación:</span> ${data.ubicacion}</div>
            <div><span class="label">Urgencia:</span> ${data.urgencia}</div>
            <div><span class="label">Hora:</span> ${data.hora}</div>
            <div><span class="label">Comentario:</span> ${data.comentario}</div>
        </div>
        `;
        container.appendChild(div);
    });
}