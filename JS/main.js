import {getDatabase, set, get, update, remove, ref, child, onValue} from "https://www.gstatic.com/firebasejs/10.3.1/firebase-database.js"; 

var orderItems = {};

window.db = getDatabase();
window.UsersDir = ref(db,'Users/');
window.LocIdDir = ref(db,'Loc_ID/');
const dbref = ref(getDatabase());

const USER = localStorage.getItem("USER")
console.log(USER)

if(USER==null){
    alert("Sesión expirada")
    location.href = "index.html"
}

window.db = getDatabase();
window.UsersDir = ref(db,'Users/');
window.LocIdDir = ref(db,'Loc_ID/');

const loggedUser = document.getElementById("loggedUser")
const selectedItem = document.getElementById("item-selector")
const selectedQuantity = document.getElementById("quantity-field")
const itemList = document.getElementById("item-list")

const Loc_ID = document.getElementById("Loc_ID-text")
Loc_ID.textContent = localStorage.getItem("Loc_ID")

const rutaID = document.getElementById("route_id")
rutaID.textContent = localStorage.getItem("RUTA")

const RFC = document.getElementById("Loc_RFC")
const LocName = document.getElementById("Loc_Name")
get(child(dbref,'Loc_ID/'+Loc_ID.textContent)).then((snapshot)=>{
    if(snapshot.exists()){
        console.log("Loc_ID found")
        RFC.textContent = snapshot.val().RFC
        LocName.textContent = snapshot.val().NAME
    }
    else{   
        console.log("Loc_ID not found")
    }
})



loggedUser.textContent = USER;

const signoff_button = document.getElementById("sign-off-button");
signoff_button.addEventListener("click",()=>{
    localStorage.clear()
    sessionStorage.clear()
    location.href = "index.html"
})
let item_id = 0
const addButton = document.getElementById("add-button")

addButton.addEventListener("click",()=>{
    //console.log(item_id)
    selectedItem.value==""||selectedQuantity.value==""? alert("Revisa que Articulo o Cantidad no este vacio."):itemList.innerHTML += 
    `
    <li id="${item_id}">
        <div class="flex-container">
            <div class="delete-li"> 
                <button class="remove-item-button" onClick="document.getElementById(${item_id}).remove();">X</button>
            </div>
            <div class="li-text"> 
                <span>${selectedItem.value}</span>
            </div>
            <div class="li-quant"> 
                <span class="quant">${selectedQuantity.value} L</span></li>
            </div>
        </div>
        
        
    `
    if(selectedItem.value=="")
    {

    }
    else{
        if(orderItems[selectedItem.value] == null){
            orderItems[selectedItem.value] = Number(selectedQuantity.value)
            console.log(orderItems)
        }
        else{
            let currentQuantity = Number(orderItems[selectedItem.value])
            orderItems[selectedItem.value] = Number(selectedQuantity.value) + currentQuantity
            console.log(orderItems)
        }
    }

    item_id += 1;
})





