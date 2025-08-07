import { auth } from './firebaselogin.js';
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        await signInWithEmailAndPassword(auth, email, password);
        window.location.href = "panel.html"; // redirige al panel
    } catch (error) {
        const p=document.getElementById("error");
        p.classList.remove("oculto");
    }
});
