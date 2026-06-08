import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore, collection, query, orderBy, onSnapshot } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// ඔයාගේ Firebase Config එක මෙතනට දාන්න (app.js එකේ දාපු එකමයි)
const firebaseConfig = {
    apiKey: "YOUR_FIREBASE_API_KEY",
    authDomain: "YOUR_PROJECT.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT.appspot.com",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const logsDiv = document.getElementById("admin-logs");

// Chats එකතුවෙන් (collection) දත්ත කාලානුක්‍රමිකව ගැනීම
const q = query(collection(db, "chats"), orderBy("timestamp", "asc"));

onSnapshot(q, (snapshot) => {
    logsDiv.innerHTML = "";
    snapshot.forEach((doc) => {
        const data = doc.data();
        const p = document.createElement("p");
        p.className = data.sender;
        p.innerText = `${data.sender}: ${data.text}`;
        logsDiv.appendChild(p);
    });
});