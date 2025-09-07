import { db, auth } from '../../admin/firebaselogin.js';
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

//cerrarsesión
document.getElementById("signout-button").addEventListener("click", async () => {
    try {
        await signOut(auth);
        sessionStorage.removeItem('userData');
        alert("Has Cerrado Sesión");
        location.reload();
    } catch (error) {
        console.error("Error al cerrar sesión:", error);
    }
});