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
let second = date.substring(19,20)
let orderID = year+month+day+hour+minute+second

console.log(date)
console.log(orderID)

const USER = localStorage.getItem("USER")
console.log(USER)

if(USER==null){
    alert("Sesión expirada")
    location.href = "index.html"
}

var selectedDate = year+month+day;
console.log(selectedDate)
const loggedUser = document.getElementById("loggedUser")
const dateSel = document.getElementById("date")
dateSel.addEventListener("change",()=>{
    selectedDate = String(dateSel.value).replace("-","")
    selectedDate = selectedDate.replace("-","").substring(2)
    console.log(selectedDate)
    let currentState = get(child(dbref,'Flag/')).then((snapshot)=>{return snapshot.val().CHANGE})
    console.log(currentState)
    let nextState = !currentState;
    set(ref(db,'Flag/'),{
        CHANGE: nextState
    });

})
const transactionList = document.getElementById("transaction-list")


onValue(TransDir, (snapshot)=>{
    let count = 0;
    transactionList.innerHTML = ''
    snapshot.forEach(
        function(ChildSnapshot){
            if(ChildSnapshot.val().user == USER){
                console.log(String(ChildSnapshot.key).substring(0,6))
                if(String(ChildSnapshot.key).substring(0,6)==selectedDate){
                    transactionList.innerHTML += `<li id="${count}"><span>ID: ${ChildSnapshot.key}</span><span id="total"></span></li>`   
                
                    const _total = document.getElementById("total")
                    const listItem = document.getElementById(count)
    
                    listItem.addEventListener("click",()=>{
                        _total.textContent += `Total: $ ${ChildSnapshot.val().total}`
                        console.log("Triggered")
                    })
                    count+=1;
                }
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

