/* LLEVAR AL PERFIL */

document.addEventListener("DOMContentLoaded", () => {
    const divv = document.querySelectorAll(".user-data");
        divv.forEach(i => {
            i.addEventListener('click', function(e) {
            window.location.href = "miperfil.html";
        })
    })
});