import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";
import { auth } from "./admin/firebaselogin.js";

document.getElementById("login-form").addEventListener("submit", async (e) => {
    e.preventDefault(); // 🚀 evita que se reinicie la página

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        console.log("Usuario logueado:", user.uid);
        window.location.href = "index.html";
    } catch (error) {
        console.error("Error en login:", error);
        document.getElementById("login-error").classList.remove("oculto");
        document.getElementById("login-error").textContent = "Correo o contraseña incorrectos";
    }
});
