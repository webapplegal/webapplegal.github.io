import {getDatabase, set, get, update, remove, ref, child, onValue} from "https://www.gstatic.com/firebasejs/10.3.1/firebase-database.js"; 
window.db = getDatabase();
window.UsersDir = ref(db,'Users/');
window.LocIdDir = ref(db,'Loc_ID/');
window.ProdDir = ref(db,'Products/');

window.TransDir = ref(db,'Transactions/');

const dbref = ref(getDatabase());



let months = {};
months.Jan="01";
months.Feb="02";
months.Mar="03";
months.Apr="04";
months.May="05";
months.Jun="06";
months.Jul="07";
months.Aug="08";
months.Sep="09";
months.Oct="10";
months.Nov="11";
months.Dic="12";

let date = String(new Date()).substring(4,24);
let month = months[date.substring(0,3)];
let day = date.substring(4,6);
let year = date.substring(9,11);
let hour = date.substring(12,14);
let minute = date.substring(15,17)
let orderID = year+month+day+hour+minute

console.log(date)
console.log(orderID)

const USER = localStorage.getItem("USER")
console.log(USER)

if(USER==null){
    alert("Sesión expirada")
    location.href = "index.html"
}
const loggedUser = document.getElementById("loggedUser")

const rutaID = document.getElementById("route_id")
rutaID.textContent = localStorage.getItem("RUTA")

const transactionList = document.getElementById("transaction-list")
onValue(TransDir, (snapshot)=>{
    transactionList.innerHTML = ''
    snapshot.forEach(
        function(ChildSnapshot){
            if(ChildSnapshot.val().user == USER){
            transactionList.innerHTML += `<li><span>ID: ${ChildSnapshot.key}</span> <span> Total: $ ${ChildSnapshot.val().total}</span></li>`   
            }
        }
    )
});

loggedUser.textContent = USER;

const signoff_button = document.getElementById("sign-off-button");
signoff_button.addEventListener("click",()=>{
    localStorage.clear()
    sessionStorage.clear()
    location.href = "index.html"
})

