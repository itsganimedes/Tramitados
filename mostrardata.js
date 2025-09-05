import { db, auth } from './admin/firebaselogin.js';
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

// -------------------------
// Funciones auxiliares UI
// -------------------------
function mostrarUIUsuario(nombre) {
    const usernameP = document.getElementById("username");
    const username2P = document.getElementById("username2");
    const user_data_info = document.querySelector(".user-data");
    const loginBtn = document.querySelectorAll(".login-button");
    const logoutBtn = document.getElementById("signout-button");

    if (usernameP) usernameP.textContent = nombre || "Sin nombre";
    if (username2P) username2P.textContent = nombre || "Sin nombre";
    if(loginBtn){
        loginBtn.forEach(a => {
            a.classList.add("oculto");
        });
    }
    if (logoutBtn) logoutBtn.classList.remove("oculto");
    if (user_data_info) user_data_info.classList.remove("oculto");
}

function ocultarUIUsuario() {
    const user_data_info = document.querySelector(".user-data");
    const loginBtn = document.querySelectorAll(".login-button");
    const logoutBtn = document.getElementById("signout-button");

    if(loginBtn){
        loginBtn.forEach(a => {
            a.style.display = "inline-block";
        });
    }
    
    if (logoutBtn) logoutBtn.classList.add("oculto");
    if (user_data_info) user_data_info.classList.add("oculto");
}

// -------------------------
// Al cargar la página
// -------------------------
document.addEventListener("DOMContentLoaded", () => {
    const cachedUser = JSON.parse(sessionStorage.getItem('userData'));

    if (cachedUser) {
        mostrarUIUsuario(cachedUser.nombre);
    }

    onAuthStateChanged(auth, async (user) => {
        if (!cachedUser){
            if (user) {
                try {
                    const uid = user.uid;
                    const userRef = doc(db, "usuarios", uid);
                    const userSnap = await getDoc(userRef);

                    if (userSnap.exists()) {
                        const data = userSnap.data();
                        mostrarUIUsuario(data.nombre);
                        sessionStorage.setItem('userData', JSON.stringify({ nombre: data.nombre, telefono: data.telefono, email: user.email, rol: data.rol, fecha_inscripcion: data.fecha_inscripcion, plan: data.plan}));
                    } else {
                        console.log("No existe el documento del usuario");
                    }
                } catch (error) {
                    console.error("Error al obtener usuario:", error);
                }
            } else {
                ocultarUIUsuario();
            }
        }
    });
});



//hamburguesa 
const nav = document.querySelector(".nav-links");
const hamb = document.querySelector(".hamburger");

document.addEventListener('click', (e) =>{
    if (e.target.closest(".hamburger")){
        aparecerNav();
    }
})

function aparecerNav(){
    nav.classList.toggle("active");
    hamb.classList.toggle("active");
};