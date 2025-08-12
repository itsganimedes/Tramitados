// import { auth } from './firebaselogin.js';
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";
    import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
    import { getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut
        } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";

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

        // 🔧 Tu config de Firebase
        const firebaseConfig = {
            apiKey: "AIzaSyC3ASWc6EH8qX46wHcOfMmg0sevivOQJh8",
            authDomain: "tramitados-9a3f1.firebaseapp.com",
            projectId: "tramitados-9a3f1",
            storageBucket: "tramitados-9a3f1.firebasestorage.app",
            messagingSenderId: "642561222614",
            appId: "1:642561222614:web:eba3fb0711da8c1e222677",
            measurementId: "G-WTHP4FXM8N"
        };


        const app = initializeApp(firebaseConfig);
        const auth = getAuth(app);
        const provider = new GoogleAuthProvider();

        // Login
        document.addEventListener('click', e => {
        if (e.target.matches('#btnGoogle')) {
            signInWithPopup(auth, provider).catch(console.error);
        }
        if (e.target.matches('#btnLogout')) signOut(auth);
        });

        // Estado de sesión
        onAuthStateChanged(auth, (user) => {
            const info = document.getElementById('info');
            if (user) {
                info.textContent = `Hola, ${user.displayName} (${user.email})`;
                document.getElementById('btnLogout').style.display = 'inline-block';
            } else {
                info.textContent = 'No estás logueado';
                document.getElementById('btnLogout').style.display = 'none';
            }
        });