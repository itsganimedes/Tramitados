import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-analytics.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyC3ASWc6EH8qX46wHcOfMmg0sevivOQJh8",
    authDomain: "tramitados-9a3f1.firebaseapp.com",
    projectId: "tramitados-9a3f1",
    storageBucket: "tramitados-9a3f1.firebasestorage.app",
    messagingSenderId: "642561222614",
    appId: "1:642561222614:web:eba3fb0711da8c1e222677",
    measurementId: "G-WTHP4FXM8N"
};

export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);