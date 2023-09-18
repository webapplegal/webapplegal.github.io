import {getDatabase, set, get, update, remove, ref, child, onValue} from "https://www.gstatic.com/firebasejs/10.3.1/firebase-database.js"; 

const dbRef = ref(getDatabase());

window.rootDir = ref(db,'/');
let DateInfo = new Date()
let date = String(DateInfo)
let dt = date

const docContainer = document.getElementById("doc-container")

let filterSelector = "client"
let filterSelectorValue = "GoDaddy"

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

                                switch(filterSelector){
                                case "client":
                                    if(doc.client==filterSelectorValue){
                                        Render(doc)
                                    }
                                    break;
                                case "status":
                                    if(doc.status==filterSelectorValue){
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
