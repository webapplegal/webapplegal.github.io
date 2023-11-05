import {getDatabase, set, get, update, remove, ref, child, onValue} from "https://www.gstatic.com/firebasejs/10.3.1/firebase-database.js"; 

const USER = localStorage.getItem("USER")
console.log(USER)

if(USER==null){
    alert("Sesión expirada")
    location.href = "index.html"
}

var video = document.querySelector("#videoElement");

if (navigator.mediaDevices.getUserMedia) {
  navigator.mediaDevices.getUserMedia({ video: true })
    .then(function (stream) {
      video.srcObject = stream;
    })
    .catch(function (err0r) {
      console.log("Something went wrong!");
    });
}

window.db = getDatabase();
window.UsersDir = ref(db,'Users/');
window.LocIdDir = ref(db,'Loc_ID/');
const dbref = ref(getDatabase());

const loggedUser = document.getElementById("loggedUser")
const selectedItem = document.getElementById("item-selector")
const selectedQuantity = document.getElementById("quantity-field")
const itemList = document.getElementById("item-list")

loggedUser.textContent = USER;

const signoff_button = document.getElementById("sign-off-button");
signoff_button.addEventListener("click",()=>{
    localStorage.clear()
    sessionStorage.clear()
    location.href = "index.html"
})

const continue_button = document.getElementById("close-qr-button")
continue_button.addEventListener("click",()=>{
  localStorage.setItem("Loc_ID",document.getElementById('Loc_ID-input').value);
  location.href='order.html'
})

