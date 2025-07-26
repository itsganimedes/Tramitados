//variables
let str=" responsables inscriptos.";

let total=15;

//inscriptos por servicio
let inscriptos=[
    0,              //1 RECADOS
    0,              //2 ORGANIZACIÓN
    0,              //3 PLOMERÍA 
    0,              //4 JARDINERÍA
    0,              //5 ELECTRICISTA 
    0,              //6 GASISTA 
    0,              //7 CUIDADO DE MAYORES
    0,              //8 CUIDADO DE NIÑOS
    0,              //9 FOTOGRAFÍA
    0,              //10 PROFESORES
    0,              //11 CUIDADO DEL HOGAR
    0,              //12 TRÁMITES LEGALES
    0,              //13 MÚSICA
    0,              //14 ASISTENCIA FÍSICA
    0               //15 SERVICIO TECNICO 
];

//escribir cuantos responsables inscriptos hay
for(let i = 0 ; i < total; i++)
{
    const parrafo=document.getElementById("res-ins-" + i)
    parrafo.textContent=inscriptos[i] + String(str);
}

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