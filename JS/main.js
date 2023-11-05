import {getDatabase, set, get, update, remove, ref, child, onValue} from "https://www.gstatic.com/firebasejs/10.3.1/firebase-database.js"; 

const USER = localStorage.getItem("USER")
console.log(USER)

if(USER==null){
    alert("Sesión expirada")
    location.href = "index.html"
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

const addButton = document.getElementById("add-button")
addButton.addEventListener("click",()=>{
    selectedItem.value==""||selectedQuantity.value==""? alert("Revisa que Articulo o Cantidad no este vacio."):itemList.innerHTML += `<li><span>${selectedItem.value}</span><span class="cuant">${selectedQuantity.value} L</span></li>`
    
})

