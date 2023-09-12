import {getDatabase, set, get, update, remove, ref, child, onValue} from "https://www.gstatic.com/firebasejs/10.3.1/firebase-database.js";
    
window.fieldID = document.querySelector("#enterID");
window.fieldClient = document.querySelector("#enterClient");
window.fieldAssignee = document.querySelector("#enterAssignee");
window.fieldPath = document.querySelector("#enterPath");
window.fieldStart = document.querySelector("#enterStartDate");
window.fieldEnd = document.querySelector("#enterDueDate");
window.createButton = document.querySelector("#createDocSubmit");

createButton.addEventListener('click',addItem);

//refrences DB in current scope
const dbref = ref(db)
let canAdd="true"

let DateInfo = new Date()
let date = String(DateInfo)
console.log(date)
let dt = date.substring(4,10) //+ date.substring(16,21)

fieldStart.value = dt
fieldEnd.value = dt

function addItem(){
    console.log("has entered function")
    //Checks if field is empty
    if(fieldID.value == ""){
        alert("Cannot leave item blank")
        return //if empty exit function, since it would erase all DB items
    }
    else{
        //looks for Item typed in in DB
        get(child(dbref,'Documents/'+fieldID.value))
        .then((snapshot)=>{
            if(canAdd=="true"){ //Checks users permisions
                if(snapshot.exists()){ //If found, user must choose other ID
                    alert("id taken")
                    return
                }
                else{ //If item doesnt exist, adds it to DB with default parameters
                    set(ref(db,'Documents/'+fieldID.value),{
                        id: fieldID.value,
                        client: fieldClient.value,
                        assigned_to: fieldAssignee.value,
                        mod_date: "",
                        modder: "",
                        path: fieldPath.value,
                        start_date: fieldStart.value,
                        due_date: fieldEnd.value,
                        status: "New"
                    })
                    fieldID.value= ""
                    fieldClient.value=""
                    fieldAssignee.value=""
                    fieldPath.value=""
                    fieldStart.value=""
                    fieldEnd.value=""
                }
            }
            else{
                alert("Usuario no tiene permiso de agregar")
            }
            
        });
    }
    
    
}