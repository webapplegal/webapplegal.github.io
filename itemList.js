import {getDatabase, set, get, update, remove, ref, child, onValue} from "https://www.gstatic.com/firebasejs/10.3.1/firebase-database.js"; 

let DateInfo = new Date()
let date = String(DateInfo)
console.log(date)
let dt = date

const docContainer = document.getElementById("doc-container")
const newDocButton = document.getElementById('button-add-doc')

newDocButton.addEventListener('click',()=>{location.href = 'addDoc.html'})

console.log(dt)
//Test for multiple item
//console.log(USER); need to get USER varibale across all files from index

onValue(itemRef, (snapshot)=>{
        console.log(snapshot)
        document.getElementById("itemList").innerHTML = "" // on change, reset to black and re-render
        docContainer.innerHTML=""
        snapshot.forEach(
            function(ChildSnapshot){
                let doc = ChildSnapshot.val();
            
                docContainer.innerHTML += 
                `<div class="card">
                    <div class="left-side-card">
                        <h4>Folio: ${doc.id} </h4>
                        <h5>Cliente: ${doc.client}</h5>
                        <h5>Encargado: ${doc.assigned_to}</h5>
                        <h6>Status: ${doc.status} Last Mod: ${doc.mod_date} Due: ${doc.due_date}</h6>
                    </div>

                    <div class="right-side-card">
                        <div id="status-indicator" class="${doc.status}"></div>
                    </div>
                </div>`
            }
        )
});


    