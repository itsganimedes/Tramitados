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
    let data;

    const fechaActual = new Date();
        const dia = String(fechaActual.getDate()).padStart(2, '0');
        const mes = String(fechaActual.getMonth() + 1).padStart(2, '0'); // +1 porque enero es 0
        const año = fechaActual.getFullYear();
        const fechaFormateada = `${dia}/${mes}/${año}`;

    if (servicio != "Servicio Técnico") {

    data = {
        servicio: servicio,
        nombre: form.nombre.value,
        telefono: form.telefono.value,
        ubicacion: form.ubicacion.value,
        urgencia: form.urgencia.value,
        hora: form.hora.value,
        comentario: form.comentario.value || "(Sin comentario)",
        realizado: 0,
        terminosycondiciones: form.terminosycondiciones.value,
        fecha: fechaFormateada
    };

    } else {

        data = {
        servicio: servicio,
        nombre: form.nombre.value,
        telefono: form.telefono.value,
        ubicacion: form.ubicacion.value,
        urgencia: form.urgencia.value,
        hora: form.hora.value,
        comentario: form.comentario.value || "(Sin comentario)",
        realizado: 0,
        terminosycondiciones: form.terminosycondiciones.value,
        fecha: fechaFormateada,
        servicio_esp: form.servicio_tecnico.value
    };

    }

    let prioridad=0;
    let prioridadOriginal = 0;

    switch(data.urgencia) {
    case "tomado":
        prioridad = 4;
        prioridadOriginal = 4;
        break;
    case "normal":
        prioridad = 3;
        prioridadOriginal = 3;
        break;
    case "urgente":
        prioridad = 2;
        prioridadOriginal = 2;
        break;
    case "emergencia":
        prioridad = 1;
        prioridadOriginal = 1;
        break;
    default:
        prioridad = 0;
        prioridadOriginal = 0;
    }


    data.prioridad=prioridad;
    data.prioridadOriginal=prioridadOriginal;

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