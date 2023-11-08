import {getDatabase, set, get, update, remove, ref, child, onValue} from "https://www.gstatic.com/firebasejs/10.3.1/firebase-database.js"; 
import {getSeparatedDate} from "./getDateFormat.js"

let orderID = getSeparatedDate().serial

window.db = getDatabase();
window.UsersDir = ref(db,'Users/');
window.LocIdDir = ref(db,'Loc_ID/');
window.ProdDir = ref(db,'Products/');
const dbref = ref(getDatabase());

window.tempItems = {};
window.orderItems = {}
window.itemCosts = {};
window.tempSubtotales = {};
window.subtotales = {};

const loggedUser = document.getElementById("loggedUser")
const selectedItem = document.getElementById("item-selector")
const USER = localStorage.getItem("USER")
loggedUser.textContent = USER;

if(USER==null){
    alert("Sesión expirada")
    location.href = "index.html"
}



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
        RFC.textContent = snapshot.val().RFC
        LocName.textContent = snapshot.val().NAME
    }
})



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
    if(tempItems.hasOwnProperty(selectedItem.value)==false || tempItems[selectedItem.value]==0){
        let cost = itemCosts[selectedItem.value]    

        selectedItem.value==""||selectedQuantity.value==""? alert("Revisa que Articulo o Cantidad no este vacio."):itemList.innerHTML += 
        `
        <li id="${item_id}">
            <div class="flex-container">
                <div class="delete-li"> 
                    <button class="remove-item-button" onClick="document.getElementById('${item_id}').remove();tempItems['${selectedItem.value}']=0;tempSubtotales['${selectedItem.value}']=0;console.log('Cantidades:',tempItems);console.log('tempSubtotales:',tempSubtotales);getTotal(tempSubtotales);">X</button>
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
            if(tempItems[selectedItem.value] == null){
                tempItems[selectedItem.value] = Number(selectedQuantity.value)
                tempSubtotales[selectedItem.value] = Number(selectedQuantity.value)*Number(cost)
                console.log('Cantidades:',tempItems);
                console.log('tempSubtotales:',tempSubtotales);
                getTotal(tempSubtotales) 
            }
            else{
                let cuant = String(tempItems[selectedItem.value]).split("@")
                let currentQuantity = Number(cuant[0])
                tempItems[selectedItem.value] = (Number(selectedQuantity.value) + currentQuantity)
                tempSubtotales[selectedItem.value] = (Number(selectedQuantity.value) + currentQuantity)*Number(cost)
                console.log('Cantidades:',tempItems);
                console.log('tempSubtotales:',tempSubtotales);
                getTotal(tempSubtotales)
                 
            }
        }
        item_id += 1;
        selectedQuantity.value = ""
    }
    else{
        alert("Articulo ya existe en orden, si desea cambiar la cantidad, borrelo e intente de nuevo.")
    }

    

})


const closeOrderButton = document.getElementById("close-order-button")
closeOrderButton.addEventListener("click",()=>{

    let temp1 = Object.entries(tempItems);
    temp1.forEach((set)=>{
        if(set[1]!=0){
            orderItems[set[0]] = set[1]
        }
    })
    let temp2 = Object.entries(tempSubtotales);
    temp2.forEach((set)=>{
        if(set[1]!=0){
            subtotales[set[0]] = set[1]
        }
    })
    console.log(orderItems)
    console.log(subtotales)

    if(getTotal(orderItems)==0){
        alert("Orden vacia")
    }
    else{
        set(ref(db,'Transactions/'+ orderID),{
            user: localStorage.getItem("USER"),
            when: String(new Date()).substring(4,24),
            type: "sell",
            Loc_ID: localStorage.getItem("Loc_ID"),
            cantidades: tempItems,
            client: LocName.textContent,
            subtotales: subtotales,
            total: getTotal(subtotales)
        });
    
        alert("Orden Enviada")
        itemList.innerHTML = ""
        localStorage.setItem("ORDER",orderItems);
        location.href = "qrScan.html"
    }
})

function getTotal(obj){
    const values = Object.values(obj);

                const sum = values.reduce((accumulator, value) => {
                  return accumulator + value;
                }, 0);
                
                console.log('Total:',sum);
                return sum;
}
export default getTotal

