import {getDatabase, set, get, update, remove, ref, child, onValue} from "https://www.gstatic.com/firebasejs/10.3.1/firebase-database.js"; 

const dbRef = ref(getDatabase());

window.rootDir = ref(db,'/');
let DateInfo = new Date()
let date = String(DateInfo)
let dt = date

const docContainer = document.getElementById("doc-container")
const newDocButton = document.getElementById('button-add-doc')
const filterSelector = document.getElementById('filter-selector')
const filterSelectorValue = document.getElementById('filter-selector-value')

UpdateSelector()
newDocButton.addEventListener('click',()=>{location.href = 'addDoc.html'})

onValue(rootDir, (snapshot)=>{
    docContainer.innerHTML=""
    snapshot.forEach(
            function(ChildSnapshot){
                        window.folder = ChildSnapshot.val();
                    ChildSnapshot.forEach(
                        function(GrandChildSnapshot){
                            GrandChildSnapshot.forEach(
                                function (GGChildSnap){
                                    window.doc = GGChildSnap.val();

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
            }
    )
    
});



function Render(doc){
    let docURL = String(doc.path)
    let previewURL = docURL.substring(0, docURL.indexOf("/view"))

    // I need for the PDF view to be visible only after I click on the
    docContainer.innerHTML += 
                    `<div class="card">
                        <div class="left-side-card">
                            <h4>Folio: ${doc.id} </h4>
                            <h5>Cliente: ${doc.client}</h5>
                            <h5>Encargado: ${doc.assigned_to}</h5>
                            <h6>Status: ${doc.status} Last Mod: ${doc.mod_date} Due: ${doc.due_date}</h6>
                        </div>

                        <div class="center-side-card">
                            
                        </div>


                        <div class="right-side-card">
                            <div id="status-indicator" class="${doc.status}"></div>
                        </div>

                        <div class="pdf-view"}>
                            <iframe src="${previewURL+"/preview"}" allow="autoplay"></iframe>
                        </div>

                    </div>`
}


function UpdateSelector(){
    update(ref(db,'/Flag'),{
        CHANGE: true
    });
    update(ref(db,'/Flag'),{
        CHANGE: false
    });

    filterSelectorValue.innerHTML = ""

    if(filterSelector.value=="client"){

        // Need to find way to get Element IDs from Client Directory in Firebase with get() functionx
        filterSelectorValue.innerHTML =
        `
            <option value="GoDaddy">GoDaddy</option>
            <option value="Volaris">Volaris</option>
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