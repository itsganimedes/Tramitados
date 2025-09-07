import { db, auth } from '../../admin/firebaselogin.js';
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

/* ESTE JS SE ENCARGA DE MOSTRAR LA INFORMACIÓN DEL USUARIO EN LA PESTAÑA "MI PERFIL" */

document.addEventListener("DOMContentLoaded", () => {

    const userData = JSON.parse(sessionStorage.getItem('userData'));
    
    let name = document.getElementById("username-data");
    let mail = document.getElementById("useremail");
    let number = document.getElementById("userphone");
    let rol = document.getElementById("userrol");
    let date = document.getElementById("userdate");
    let plan = document.getElementById("userplan");

    if (userData) {

        let rolshow = "Indefinido";

        if(userData.rol === "admin"){
            rolshow = "Administrador";
        } else if (userData.rol === "mod"){
            rolshow = "Moderador";
        } else if (userData.rol === "tramitador"){
            rolshow = "Tramitador";
        } else {
            rolshow = "Usuario";
        }

        let planshow = "Indefinido";

        if(userData.plan === "0"){
            planshow = "Básico";
        } else if (userData.plan === "1"){
            planshow = "Premium";
        } else if (userData.plan === "2"){
            planshow = "Pro";
        }

        name.textContent = 'NOMBRE: ' + userData.nombre;
        mail.textContent = 'EMAIL: ' + userData.email;
        number.textContent = 'CELULAR: ' + userData.telefono;
        rol.textContent = 'ROL: ' + rolshow;
        date.textContent = 'FECHA DE INSCRIPCIÓN: ' + userData.fecha_inscripcion;
        plan.textContent = 'PLAN: ' + planshow;
    } else {

        onAuthStateChanged(auth, async (user) => {

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

    }

})