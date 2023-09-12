import {getDatabase, set, get, update, remove, ref, child, onValue} from "https://www.gstatic.com/firebasejs/10.3.1/firebase-database.js"; 

let DateInfo = new Date()
let date = String(DateInfo)
console.log(date)
let dt = date

console.log(dt)
//Test for multiple item
//console.log(USER); need to get USER varibale across all files from index
function Render(id,status,mod_date,due_date){
    console.log(date)
    
    let ul = document.getElementById("itemList");
    let _id = document.createElement('li');
    let _mod_date = document.createElement('span');
    let _status = document.createElement('span');
    let _due_date = document.createElement('span');

    _status.classList.add("docStatus")
    _mod_date.classList.add("mod_date")
    _due_date.classList.add("due_date")

    _id.innerHTML = id;
    _status.innerHTML = status;
    _mod_date.innerHTML = mod_date;
    _due_date.innerHTML = due_date;

    ul.appendChild(_id);
    ul.appendChild(_status);
    ul.appendChild(_mod_date);
    ul.appendChild(_due_date);
    ul.append();
}

onValue(itemRef, (snapshot)=>{
        console.log(snapshot)
        document.getElementById("itemList").innerHTML = "" // on change, reset to black and re-render
        snapshot.forEach(
            function(ChildSnapshot){
                console.log(ChildSnapshot.val())

                let status = ChildSnapshot.val().status;
                let id = ChildSnapshot.val().id;
                let mod_date = ChildSnapshot.val().mod_date;
                let due_date = ChildSnapshot.val().due_date;

                Render(id,status,mod_date,due_date)
                
            }
        )
});


    