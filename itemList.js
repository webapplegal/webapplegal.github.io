import {getDatabase, set, get, update, remove, ref, child, onValue} from "https://www.gstatic.com/firebasejs/10.3.1/firebase-database.js"; 

let DateInfo = new Date()
let date = String(DateInfo)
console.log(date)
let dt = date

const docContainer = document.getElementById("doc-container")
const newDocButton = document.getElementById('button-add-doc')
const filterValue = document.getElementById('filter-value')
const filterSelector = document.getElementById('filter-selector')
const filterSelectorValue = document.getElementById('filter-selector-value')

if(filterSelector.value=="client"){
    filterSelectorValue.innerHTML = 
    `
        <option value="hp">HP</option>
        <option value="GoDaddy">GoDaddy</option>
    `
}

if(filterSelector.value=="status"){
    filterSelectorValue.innerHTML = 
    `
        <option value="New">New</option>
        <option value="Open">Open</option>
        <option value="Closed">Closed</option>
    `
}



window.parentRef = ref(db,'/');

onValue(parentRef, (snapshot)=>{
    docContainer.innerHTML=""
    snapshot.forEach(
            function(ChildSnapshot){
                        window.folder = ChildSnapshot.val();
                        console.log(folder)
                    ChildSnapshot.forEach(
                        function(GrandChildSnapshot){
                            window.doc = GrandChildSnapshot.val();
                            console.log(doc)

                            switch(filterSelector.value){
                                case "client":
                                    if(doc.client==filterSelectorValue.value){
                                        Render(doc)
                                    }
                                    break;
                                case "status":
                                    if(doc.status==filterSelectorValue.value){
                                        Render(doc)
                                    }
                                    break;

                            }
                                
                                

                        }
                    )
            }
    )
    
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

                        <div class="pdf-view">
                            <iframe src="${doc.path+"/preview"}" width="310" height="480" allow="autoplay"></iframe>
                        </div>

                    </div>`
}

function UpdateSelector(){
    filterSelectorValue.innerHTML = ""
    
    if(filterSelector.value=="client"){
        filterSelectorValue.innerHTML = 
        `
            <option value="hp">HP</option>
            <option value="GoDaddy">GoDaddy</option>
        `
    }
    
    if(filterSelector.value=="status"){
        filterSelectorValue.innerHTML = 
        `
            <option value="New">New</option>
            <option value="Open">Open</option>
            <option value="Closed">Closed</option>
        `
    }
}
    

filterValue.addEventListener("keypress", function(event) {
    // If the user presses the "Enter" key on the keyboard
    if (event.key === "Enter") {
      // Cancel the default action, if needed
        event.preventDefault();
      // Trigger the button element with a click
        docContainer.innerHTML=""

        //We do the flag change so the onValue detects a change, but only renders in the grand child level
        update(ref(db,'/Flag'),{
            CHANGE: true
        });
        update(ref(db,'/Flag'),{
            CHANGE: false
        });
    }
});

filterSelector.addEventListener("change", function(event) {
    // If the user presses the "Enter" key on the keyboard
    
      // Cancel the default action, if needed
        event.preventDefault();
      // Trigger the button element with a click
        docContainer.innerHTML=""
        UpdateSelector()
        //We do the flag change so the onValue detects a change, but only renders in the grand child level
        update(ref(db,'/Flag'),{
            CHANGE: true
        });
        update(ref(db,'/Flag'),{
            CHANGE: false
        });
    
});


filterSelectorValue.addEventListener("change", function(event) {
    // If the user presses the "Enter" key on the keyboard
    
      // Cancel the default action, if needed
        event.preventDefault();
      // Trigger the button element with a click
        docContainer.innerHTML=""
        //We do the flag change so the onValue detects a change, but only renders in the grand child level
        update(ref(db,'/Flag'),{
            CHANGE: true
        });
        update(ref(db,'/Flag'),{
            CHANGE: false
        });
    
});