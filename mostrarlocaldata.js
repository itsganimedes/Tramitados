document.addEventListener("DOMContentLoaded", () => {
    const userData = JSON.parse(sessionStorage.getItem('userData'));
    
    if(userData){
        // Por ejemplo, mostrar nombre en el nav
        const usernameP = document.getElementById("username");
        const user_data_info = document.querySelector(".user-data");

        if(usernameP) usernameP.textContent = userData.nombre;

        // Mostrar botón de logout y ocultar login
        const loginBtn = document.getElementById("login-button");
        const logoutBtn = document.getElementById("signout-button");
        if(loginBtn) loginBtn.style.display = "none";
        if(logoutBtn) logoutBtn.style.display = "inline-block";
        if(user_data_info) user_data_info.classList.remove("oculto");
    } else {
        // No hay usuario logueado
        const loginBtn = document.getElementById("login-button");
        const logoutBtn = document.getElementById("signout-button");
        if(loginBtn) loginBtn.style.display = "inline-block";
        if(logoutBtn) logoutBtn.style.display = "none";
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