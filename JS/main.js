import {getDatabase, set, get, update, remove, ref, child, onValue} from "https://www.gstatic.com/firebasejs/10.3.1/firebase-database.js"; 
window.db = getDatabase();
window.UsersDir = ref(db,'Users/');
window.LocIdDir = ref(db,'Loc_ID/');
window.ProdDir = ref(db,'Products/');
const dbref = ref(getDatabase());

window.orderItems = {};
window.itemCosts = {};


let date = String(new Date()).substring(4,24);
console.log(date)


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

onValue(ProdDir, (snapshot)=>{
    selectedItem.innerHTML = `<option value="">Articulos:</option>`
    snapshot.forEach(
        function(ChildSnapshot){
            selectedItem.innerHTML += `
            <option value="${ChildSnapshot.key}">${ChildSnapshot.key}</option>
            `
            itemCosts[ChildSnapshot.key] = ChildSnapshot.val().cost
        }
    )
});

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
    //need to check if ul li text-content has element already 
    if(orderItems.hasOwnProperty(selectedItem.value)==false || orderItems[selectedItem.value]==0){
        let cost = itemCosts[selectedItem.value]    

        selectedItem.value==""||selectedQuantity.value==""? alert("Revisa que Articulo o Cantidad no este vacio."):itemList.innerHTML += 
        `
        <li id="${item_id}">
            <div class="flex-container">
                <div class="delete-li"> 
                    <button class="remove-item-button" onClick="document.getElementById('${item_id}').remove();orderItems['${selectedItem.value}']-=${selectedQuantity.value};console.log(orderItems)">X</button>
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
                orderItems[selectedItem.value] = Number(selectedQuantity.value)//+"@"+Number(cost)
                console.log(orderItems)
            }
            else{
                let cuant = String(orderItems[selectedItem.value]).split("@")
                let currentQuantity = Number(cuant[0])
                orderItems[selectedItem.value] = (Number(selectedQuantity.value) + currentQuantity)//+"@"+Number(cost)
                console.log(orderItems)
            }
        }
        item_id += 1;
    }
    else{
        alert("Articulo ya existe en orden, si desea cambiar la cantidad, borrelo e intente de nuevo.")
    }

    

})


const closeOrderButton = document.getElementById("close-order-button")
closeOrderButton.addEventListener("click",()=>{
   
    console.log("sending...")
    set(ref(db,'OPERATION/'+ date),{
        user: localStorage.getItem("USER"),
        when: String(new Date()).substring(4,24),
        type: "sell",
        Loc_ID: localStorage.getItem("Loc_ID"),
        content: orderItems,
        client: LocName.textContent
    });
    alert("Orden Enviada")
    itemList.innerHTML = ""
    localStorage.setItem("ORDER",orderItems);

})





