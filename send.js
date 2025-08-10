import { db } from './firebase.js';
import {
    collection,
    setDoc,
    doc
    } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

    window.enviarFormulario = async function(event) {
    event.preventDefault(); // Evita recargar la página

    const form = event.target;

    // Obtener nombre del servicio desde el atributo del formulario
    const servicio = form.dataset.servicio || "Servicio desconocido";

    const data = {
        servicio: servicio,
        nombre: form.nombre.value,
        telefono: form.telefono.value,
        ubicacion: form.ubicacion.value,
        urgencia: form.urgencia.value,
        hora: form.hora.value,
        comentario: form.comentario.value || "(Sin comentario)",
        realizado: 0
    };

    let prioridad=0;

    if (data.urgencia.value==="tomado"){
        prioridad=4;
    }
    if (data.urgencia.value==="normal"){
        prioridad=3;
    }
    if (data.urgencia.value==="urgente"){
        prioridad=2;
    }
    if (data.urgencia.value==="emergencia"){
        prioridad=1;
    }

    data.prioridad=prioridad;

    try {
        const docId = `${servicio}-${Date.now()}`;
        await setDoc(doc(db, "solicitudes", docId), data);
        form.reset();
        window.location.href = "https://itsganimedes.github.io/Tramitados/gracias.html";
    } catch (e) {
        console.error("❌ Error al enviar solicitud:", e);
        alert("Hubo un error al enviar la solicitud.");
    }
};