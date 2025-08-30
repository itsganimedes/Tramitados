document.addEventListener("DOMContentLoaded", () => {
    const userData = JSON.parse(sessionStorage.getItem('userData'));
    
    if(userData){
        // Por ejemplo, mostrar nombre en el nav
        const usernameP = document.getElementById("username");
        const username2P = document.getElementById("username2");
        const user_data_info = document.querySelector(".user-data");

        if(usernameP) usernameP.textContent = userData.nombre;
        if(username2P) username2P.textContent = userData.nombre;

        // Mostrar botón de logout y ocultar login
        const loginBtn = document.querySelectorAll(".login-button");
        const logoutBtn = document.getElementById("signout-button");
        if(loginBtn){
            loginBtn.forEach(a => {
                a.classList.add("oculto");
            });
        }
        if(logoutBtn) logoutBtn.style.display = "inline-block";
        if(user_data_info) user_data_info.classList.remove("oculto");
    } else {
        // No hay usuario logueado
        const loginBtn = document.querySelectorAll(".login-button");
        const logoutBtn = document.getElementById("signout-button");
        if (loginBtn) {
            loginBtn.forEach(a => {
                a.classList.remove("oculto");
            });
        }
        if(logoutBtn) logoutBtn.classList.add("oculto");
    }
});

//hamburguesa 
const hamburger = document.querySelectorAll(".hamburger");
const nav = document.querySelector(".nav-links");

document.addEventListener('click', (e) =>{
    if (e.target.closest(".hamburger")){
        aparecerNav();
    }
})

function aparecerNav(){
    nav.classList.toggle("active");
};