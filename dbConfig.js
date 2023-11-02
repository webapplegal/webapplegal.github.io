// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-app.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import {getDatabase, set, get, update, remove, ref, child, onValue} from "https://www.gstatic.com/firebasejs/10.3.1/firebase-database.js"; 

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA2ysdR5_kmZ-ZZC1B4sJS5MxKOIRLnNvk",
    authDomain: "webapp-6b549.firebaseapp.com",
    databaseURL: "https://webapp-6b549-default-rtdb.firebaseio.com",
    projectId: "webapp-6b549",
    storageBucket: "webapp-6b549.appspot.com",
    messagingSenderId: "749635244585",
    appId: "1:749635244585:web:f86590eb6560a501c40238"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
window.db = getDatabase();

window.UsersDir = ref(db,'Users/');
window.LocIdDir = ref(db,'Loc_ID/');