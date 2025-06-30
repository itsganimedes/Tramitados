/*barra de busqueda*/
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

            function mostrarFormulario(idServicio) {
    const form = document.getElementById('form-' + idServicio);
    if (form.classList.contains('oculto')) {
        form.classList.remove('oculto');
    } else {
        form.classList.add('oculto');
    }
    }