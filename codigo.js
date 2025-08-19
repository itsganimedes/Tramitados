document.addEventListener("DOMContentLoaded", () => {
//variables
let str=" responsables inscriptos.";

let total=21;

//cantidad de inscriptos por servicio
let inscriptos=[
    0,              //1 ASISTENCIA FÍSICA
    0,              //2 CADENA DE ORACIÓN
    0,              //3 CERRAJERÍA
    0,              //4 CUIDADO DEL MAYORES
    0,              //5 CUIDADO DE NIÑOS
    0,              //6 CUIDADO DEL HOGAR
    0,              //7 DJ
    0,              //8 ELECTRICISTA 
    0,              //9 FLETES
    0,              //10 FOTOGRAFÍA
    0,              //11 GASISTA
    0,              //12 JARDINERÍA 
    0,              //13 MÚSICA
    0,              //14 ORGANIZACIÓN
    0,              //15 PINTOR
    0,              //16 PLOMERÍA 
    0,               //17 PROFESORES
    0,               //18 RECADOS
    0,               //19 SERVICIO TÉCNICO
    0               //20 TRÁMITES LEGALES
];

let recarga_emergencias=10;
let recarga_urgencias=5;

const disponibles = document.querySelectorAll(".available");
const nodisponibles = document.querySelectorAll(".unavailable");

const parrafo_recarga_e=document.querySelectorAll(".recargaemergencia");
const parrafo_recarga_u=document.querySelectorAll(".recargaurgencia");

//escribir si está disponible o no y recargas por nivel de urgencia
for (let i = 0; i < disponibles.length; i++) {
    disponibles[i].textContent = "Disponible";
}
for (let i = 0; i < nodisponibles.length; i++) {
    nodisponibles[i].textContent = "No Disponible";
}
for (let i = 0; i < parrafo_recarga_e.length; i++) {
    parrafo_recarga_e[i].textContent = String("(+")+String(recarga_emergencias)+String("%)");
}
for (let i = 0; i < parrafo_recarga_u.length; i++) {
    parrafo_recarga_u[i].textContent = String("(+")+String(recarga_urgencias)+String("%)");
}

//evitar funcion al clickear el formulario del servicio 
document.querySelectorAll('.formulario-servicio').forEach(form => {
    form.addEventListener('click', function(event) {
        event.stopPropagation();
    });
});

//escribir cantidad de responsables y asignar ID único a cada servicio
let serviciostotal = document.querySelectorAll(".servicevig");

serviciostotal.forEach((servicio, index) => {
    const p = servicio.querySelector(".res-ins"); // usamos clase
    if (p) {
        p.id = `res-ins-${index}`;
        p.textContent = `${inscriptos[index]} responsables inscriptos.`;
    }
});

//barra de busqueda
let btn = document.getElementById("btn-search");
btn.addEventListener("click", servicesearch);

});






//CUANDO CARGUE EL DOM (ARRIBA)

//FUNCIONES (ABAJO)






let filtroactivo = null;

function filtro(clase){
    const serviciostotal2 = document.querySelectorAll(".servicevig");
    const p = document.getElementById('no-services');
    let existen = 0;
    p.classList.add("oculto");

    if (filtroactivo === clase){
        serviciostotal2.forEach(servicioactual => {
            servicioactual.classList.remove("oculto");
        })
        filtroactivo = null;
        return;
    }

    serviciostotal2.forEach(servicioactual => {
        servicioactual.classList.add("oculto");
        if (clase==="todos" || servicioactual.classList.contains(clase)){
            servicioactual.classList.remove("oculto");
            existen = 1;
        }
    })

    if (existen === 0) {
        p.classList.remove("oculto");
    }

    filtroactivo = clase;
}

//barra de búsqueda
function servicesearch() {
    let nombre = document.getElementById("busqueda").value.toLowerCase();
    let services = document.querySelectorAll(".servicevig"); 
    const p=document.getElementById("no-encontrado");
        for (let prof of services) {
            let servicename = prof.querySelector(".title-2").innerText.toLowerCase();
            if (servicename.includes(nombre)) {
                prof.scrollIntoView({ behavior: "smooth", block: "start" });
                if (!p.classList.contains("oculto")){
                    p.classList.add("oculto");
                }
                return;
                }
            }
        p.classList.remove("oculto");
}

    //aparecer formulario de contratacion
    function mostrarFormulario(idServicio) {
        const formularios = document.querySelectorAll('.formulario-servicio');
        const form = document.getElementById('form-' + idServicio);
        
        const yaEstabaVisible = !form.classList.contains('oculto');

        // Oculta todos
        formularios.forEach(form => form.classList.add('oculto'));

        // Si no estaba visible, lo mostramos (si ya estaba visible, lo dejamos oculto)
        if (!yaEstabaVisible) {
            form.classList.remove('oculto');
        }
    }

    //mostrar info

    function mostrarInfo(){
        const infoo = document.querySelector(".infoMostrar");
        const yaEstabaVisible = !infoo.classList.contains('oculto');

        infoo.classList.add("oculto");

        // Si no estaba visible, lo mostramos (si ya estaba visible, lo dejamos oculto)
        if (!yaEstabaVisible) {
            infoo.classList.remove('oculto');
        }
    }