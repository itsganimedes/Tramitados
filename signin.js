import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";
import { db } from './firebase.js';
import { doc, setDoc } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";
import { app } from './firebase.js';

const auth = getAuth(app);


document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("login-form");
    const errorP = document.getElementById("error");

    form.addEventListener("submit", async (e) => {
        e.preventDefault(); // evita recargar la página

        const nombre = form.querySelector("input[placeholder='Nombre']").value.trim();
        const email = form.querySelector("input[placeholder='Correo']").value.trim();
        const password = form.querySelector("input[placeholder='Contraseña']").value.trim();
        let telefono = form.querySelector("input[placeholder='Teléfono (Comenzá con 54)']").value.trim();


        if (!nombre || !email || !password) {
            errorP.textContent = "Todos los campos son obligatorios.";
            errorP.classList.remove("oculto");
            return;
        }

        try {
            // 1️⃣ Crear usuario en Firebase Auth
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            await setDoc(doc(db, "usuarios", user.uid), {
                nombre: nombre,
                email: email,
                rol: "user",
                telefono: telefono,
                ban: false
            });

            // 3️⃣ Opcional: mostrar mensaje o redirigir
            alert("Usuario registrado con éxito!");
            form.reset();
            errorP.classList.add("oculto");

        } catch (error) {
            errorP.textContent = `Error: ${error.message}`;
            errorP.classList.remove("oculto");
        }
    });
});
