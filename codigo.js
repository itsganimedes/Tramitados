//variables
let str=" responsables inscriptos.";

let total=16;

//cantidad de inscriptos por servicio
let inscriptos=[
    0,              //1 ASISTENCIA FÍSICA
    0,              //2 CUIDADO DE MAYORES
    0,              //3 CUIDADO DE NIÑOS
    0,              //4 CUIDADO DEL HOGAR
    0,              //5 ELECTRICISTA 
    0,              //6 FLETES
    0,              //7 FOTOGRAFÍA
    0,              //8 GASISTA 
    0,              //9 JARDINERÍA
    0,              //10 MÚSICA
    0,              //11 ORGANIZACIÓN
    0,              //12 PLOMERÍA 
    0,              //13 PROFESORES
    0,              //14 RECADOS
    0,              //15 SERVICIO TECNICO 
    0               //16 TRÁMITES LEGALES
];

const disponibles = document.querySelectorAll(".available");
const nodisponibles = document.querySelectorAll(".unavailable");

for (let i = 0; i < disponibles.length; i++) {
    disponibles[i].textContent = "Disponible";
}
for (let i = 0; i < nodisponibles.length; i++) {
    nodisponibles[i].textContent = "No Disponible";
}

//escribir cuantos responsables inscriptos hay
for(let i = 0 ; i < total; i++)
{
    const parrafo=document.getElementById("res-ins-" + i)
    parrafo.textContent=inscriptos[i] + String(str);
}

//evitar funcion al clickear el formulario del servicio 
document.querySelectorAll('.formulario-servicio').forEach(form => {
    form.addEventListener('click', function(event) {
        event.stopPropagation();
    });
});


//barra de búsqueda
function servicesearch() {
    let nombre = document.getElementById("busqueda").value.toLowerCase();
    let services = document.querySelectorAll(".servicevig"); 
            
        for (let prof of services) {
            let servicename = prof.querySelector(".title-2").innerText.toLowerCase();
            if (servicename.includes(nombre)) {
                prof.scrollIntoView({ behavior: "smooth", block: "start" });
                return;
                }
            }
        alert("Servicio no encontrado"); 
        }

    //aparecer formulario de contratacion
    function mostrarFormulario(idServicio) {
    const form = document.getElementById('form-' + idServicio);
    if (form.classList.contains('oculto')) {
        form.classList.remove('oculto');
    } else {
        form.classList.add('oculto');
    }
    }

    function available(){
        let p=document.querySelector("available");
        p.textContent="BANANA";
    }