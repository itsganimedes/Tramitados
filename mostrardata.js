// importar lo necesario
import { db, auth } from './admin/firebaselogin.js';
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

// botón para cerrar sesión
document.getElementById("signout-button").addEventListener("click", async () => {
    try {
        await signOut(auth);
        console.log("Sesión cerrada correctamente");
        alert("Has Cerrado Sesión");
        // si querés redirigir al login:
        window.location.href = "index.html"; 
    } catch (error) {
        console.error("Error al cerrar sesión:", error);
    }
});


// apenas cargue la página
onAuthStateChanged(auth, async (user) => {
    const user_data_info = document.querySelector(".user-data");
    if (user) {
        const uid = user.uid;

        try {
            let button2 = document.getElementById("login-button");
            button2.classList.add("oculto");
            let button3 = document.getElementById("signout-button");
            button3.classList.remove("oculto");
            const userRef = doc(db, "usuarios", uid);
            const userSnap = await getDoc(userRef);

            user_data_info.classList.remove("oculto");

            if (userSnap.exists()) {
                const userData = userSnap.data();
                document.getElementById("username").textContent = userData.nombre || "Sin nombre";
            } else {
                console.log("No existe el documento del usuario");
            }
        } catch (error) {
            console.error("Error al obtener usuario:", error);
        }
    } else {
        console.log("No hay usuario autenticado");
        let button3 = document.getElementById("signout-button");
        button3.classList.add("oculto");
    }
});


// apenas cargue la página
auth.onAuthStateChanged(async (user) => {
    if (user) {
        const uid = user.uid; // uid del usuario logueado

        try {
        // suponiendo que tus documentos están en la colección "usuarios" y el nombre del doc = uid
        const userRef = doc(db, "usuarios", uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
            const userData = userSnap.data();
            document.getElementById("username").textContent = userData.nombre || "Sin nombre";
        } else {
            console.log("No existe el documento del usuario");
        }
        } catch (error) {
        console.error("Error al obtener usuario:", error);
        }
    } else {
        console.log("No hay usuario autenticado");
    }
});