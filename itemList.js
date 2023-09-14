import {getDatabase, set, get, update, remove, ref, child, onValue} from "https://www.gstatic.com/firebasejs/10.3.1/firebase-database.js"; 

let DateInfo = new Date()
let date = String(DateInfo)
console.log(date)
let dt = date

const docContainer = document.getElementById("doc-container")
const newDocButton = document.getElementById('button-add-doc')
const filterValue = document.getElementById('filter-value')

onValue(itemRef, (snapshot)=>{
    console.log(snapshot)
    docContainer.innerHTML=""
    snapshot.forEach(
        function(ChildSnapshot){
            window.doc = ChildSnapshot.val();
            Render(doc)
        }
    )
    
});

filterValue.addEventListener("keypress", function(event) {
    // If the user presses the "Enter" key on the keyboard
    if (event.key === "Enter") {
      // Cancel the default action, if needed
        event.preventDefault();
      // Trigger the button element with a click
        docContainer.innerHTML=""

        update(ref(db,'Documents/00001'),{
            status: "Open"
        });
        //Still not working, need to device a change flag to trigger onValue code
    }
});

newDocButton.addEventListener('click',()=>{location.href = 'addDoc.html'})


function Render(doc){
    docContainer.innerHTML += 
                    `<div class="card">
                        <div class="left-side-card">
                            <h4>Folio: ${doc.id} </h4>
                            <h5>Cliente: ${doc.client}</h5>
                            <h5>Encargado: ${doc.assigned_to}</h5>
                            <h6>Status: ${doc.status} Last Mod: ${doc.mod_date} Due: ${doc.due_date}</h6>
                        </div>

                        <div class="center-side-card">
                            <div id="status-indicator" class="${doc.status}"></div>
                        </div>


                        <div class="right-side-card">
                            <img src="https://png.pngtree.com/png-vector/20190419/ourmid/pngtree-vector-cross-icon-png-image_956622.jpg" alt="delete" class="del" id="delete-cross">
                        </div>

                    </div>`
}
    