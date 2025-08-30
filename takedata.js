import { db, auth } from './admin/firebaselogin.js';
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

document.addEventListener("DOMContentLoaded", () => {
    onAuthStateChanged(auth, async (user) => {
        let name = document.getElementById("username-data");
        let mail = document.getElementById("useremail");
        let number = document.getElementById("userphone");
        let rol = document.getElementById("userrol");
        let date = document.getElementById("userdate");

        if(!user){
            name.textContent="Indefinido";
            mail.textContent="Indefinido";
            number.textContent="Indefinido";
            rol.textContent="Indefinido";
        } else {
            try{
                const uid=user.uid;
                const userRef = doc(db, "usuarios", uid);
                const userSnap = await getDoc(userRef);
                if(userSnap.exists()) {
                    const data = userSnap.data();
                    let rolshow = "Indefinido";

                    if(data.rol === "admin"){
                        rolshow = "Administrador";
                    } else if (data.rol === "mod"){
                        rolshow = "Moderador";
                    } else if (data.rol === "tramitador"){
                        rolshow = "Tramitador";
                    } else {
                        rolshow = "Usuario";
                    }

                    name.textContent = 'Nombre: ' + data.nombre;
                    mail.textContent = 'Email: ' + data.email;
                    number.textContent = 'Número: ' + data.telefono;
                    rol.textContent = 'Rol: ' + rolshow;
                    date.textContent = 'Fecha de Registro: ' + data.fecha_inscripcion;
                }
            }
            catch(error){
                console.log(error);
            }
        }
    })
})