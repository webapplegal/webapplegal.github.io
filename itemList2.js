import {getDatabase, set, get, update, remove, ref, child, onValue} from "https://www.gstatic.com/firebasejs/10.3.1/firebase-database.js"; 

window.rootDir = ref(db,'/');
window.clientDir = ref(db,'/Clients')

//Test for multiple item
//console.log(USER); need to get USER varibale across all files from index
function Render(doc){
    let docURL = String(doc.path)
    let previewURL = docURL.substring(0, docURL.indexOf("/view"))

    let subvisible=false;
    
    let ul = document.getElementById("itemList");

    let _folio = document.createElement('li');
    let _cliente = document.createElement('li');
    let _status = document.createElement('li');
    let _mod_date = document.createElement('li');
    let _pdf = document.createElement('span');

    _folio.classList.add("folio")
    _cliente.classList.add("cliente")
    _status.classList.add("statusTxt")
    _mod_date.classList.add("modDate")
    
    _pdf.innerHTML = `<br>`;
    _folio.innerHTML = "ID: "+doc.id;
    _cliente.innerHTML = "Client: "+doc.client+"    Assigned to: "+doc.assigned_to;
    _status.innerHTML = doc.status;
    _mod_date.innerHTML = doc.start_date;

    ul.appendChild(_folio);
    ul.appendChild(_cliente);
    ul.appendChild(_status);
    ul.appendChild(_mod_date);
    ul.appendChild(_pdf);
    ul.append();


    _folio.addEventListener("click", () => {
        if(subvisible){
            subvisible=false;
            _pdf.innerHTML = `<br>`;
        }
        else{
            subvisible=true;
            _pdf.innerHTML = 
            `<div class="pdf-view"}>
            <iframe src="${previewURL+"/preview"}" allow="autoplay"></iframe>
            </div><br>`;
        }
    }
    );

}


onValue(clientDir, (snapshot)=>{
        document.getElementById("itemList").innerHTML = "" // on change, reset to black and re-render
        snapshot.forEach(
            function(ChildSnapshot){
                ChildSnapshot.forEach(
                    function (GrandChildSnapshot){
                        window.doc = GrandChildSnapshot.val()
                        console.log(doc)
                        Render(doc);
                    }
                )
                
            }
        )
});



    