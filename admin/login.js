    import { auth, db } from './firebase./js/general/basics.js';
    import {
        getAuth,
        GoogleAuthProvider,
        signInWithPopup,
        signOut,
        onAuthStateChanged,
        signInWithEmailAndPassword
    } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";

    // 🔧 tu config
    const firebaseConfig = {
    apiKey: "AIzaSyC3ASWc6EH8qX46wHcOfMmg0sevivOQJh8",
    authDomain: "tramitados-9a3f1.firebaseapp.com",
    projectId: "tramitados-9a3f1",
    storageBucket: "tramitados-9a3f1.firebasestorage.app",
    messagingSenderId: "642561222614",
    appId: "1:642561222614:web:eba3fb0711da8c1e222677",
    measurementId: "G-WTHP4FXM8N"
    };

    // --- Google provider (fuerza selector de cuenta) ---
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });

    // --- Email/Password (opcional) ---
    const form = document.getElementById('login-form');
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;

        if (!email || !password) {
        document.getElementById('error').classList.remove('oculto');
        return;
        }

        try {
        await signInWithEmailAndPassword(auth, email, password);
        window.location.href = "panel.html";
        } catch (error) {
        console.error(error.code, error.message);
        document.getElementById('error').classList.remove('oculto');
        }
    });

    // // --- Google popup ---
    // document.getElementById('btnGoogle').addEventListener('click', () => {
    //     signInWithPopup(auth, provider)
    //     .then(() => (window.location.href = "panel.html"))
    //     .catch((err) => {
    //         console.error(err.code, err.message);
    //     });
    // });

    // // --- Logout ---
    // document.getElementById('btnLogout')?.addEventListener('click', () => signOut(auth));

    // // --- Estado de sesión ---
    // onAuthStateChanged(auth, (user) => {
    //     const info = document.getElementById('info');
    //     if (user) {
    //     info.textContent = `Hola, ${user.displayName} (${user.email})`;
    //     document.getElementById('btnLogout').style.display = 'inline-block';
    //     } else {
    //     info.textContent = 'No estás logueado';
    //     document.getElementById('btnLogout').style.display = 'none';
    //     }
    // });