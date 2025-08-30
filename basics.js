/* LLEVAR AL PERFIL */

document.addEventListener("DOMContentLoaded", () => {
    const divv = document.querySelectorAll(".user-data");
    const divv2 = document.querySelectorAll(".user-data-mobile");

        divv.forEach(i => {
            i.addEventListener('click', function(e) {
                window.location.href = "miperfil.html";
            })
        })

        divv2.forEach(i => {
            i.addEventListener('click', function(e) {
                window.location.href = "miperfil.html";
            })
        })
});