import {getDatabase, set, get, update, remove, ref, child, onValue} from "https://www.gstatic.com/firebasejs/10.3.1/firebase-database.js"; 
import {getSeparatedDate} from "./getDateFormat.js"

window.db = getDatabase();
window.UsersDir = ref(db,'Users/');
window.LocIdDir = ref(db,'Loc_ID/');
window.ProdDir = ref(db,'Products/');
window.TransDir = ref(db,'Transactions/');

console.log(getSeparatedDate().serial);

let year = getSeparatedDate.year;
let month = getSeparatedDate.month;
let day = getSeparatedDate.day;

const loggedUser = document.getElementById("loggedUser")
const yearSel = document.getElementById("year")
const monthSel = document.getElementById("month")
const daySel = document.getElementById("day")

const searchButton=document.getElementById("search-button")

var selectedDate
try{
    selectedDate = localStorage.getItem("date")
    console.log("got from local")
    yearSel.value = "20"+String(selectedDate).substring(0,2)
    monthSel.value = String(selectedDate).substring(2,4)
    daySel.value = String(selectedDate).substring(4,6)
}
catch{
    selectedDate = year+month+day;
    console.log("set man")
    console.log(selectedDate)
    yearSel.value = "20"+String(selectedDate).substring(0,2)
    monthSel.value = String(selectedDate).substring(2,4)
    daySel.value = String(selectedDate).substring(4,6)
}
    

   


const USER = localStorage.getItem("USER")


if(USER==null){
    alert("Sesión expirada")
    location.href = "index.html"
}





searchButton.addEventListener("click",()=>{
    let day_ = daySel.value;
    let month_=monthSel.value;
    daySel.value<10? day_=String("0").concat(String(daySel.value)):day_=String(daySel.value);
    monthSel.value<10? month_=String("0").concat(String(monthSel.value)):month_=String(monthSel.value);

    selectedDate = String(String(yearSel.value).substring(2,4)+month_+day_)

    localStorage.setItem("date",selectedDate)
    location.href="transactions.html"
})
const transactionList = document.getElementById("transaction-list")


onValue(TransDir, (snapshot)=>{
    window.count = 0;
    transactionList.innerHTML = ''
    snapshot.forEach(
        function(ChildSnapshot){
            if(ChildSnapshot.val().user == USER){
                if(String(ChildSnapshot.key).substring(0,6)==selectedDate){
                    transactionList.innerHTML += 
                    `<li onclick="console.log('clicked');if(document.getElementById('total-'+${count}).textContent==''){document.getElementById('total-'+${count}).textContent=' Total: ${ChildSnapshot.val().total.toLocaleString('en-US', {style: 'currency', currency: 'USD',})}'}else{document.getElementById('total-'+${count}).textContent=''}">
                        <span>ID: ${ChildSnapshot.key}</span>
                        <br>
                        <span id="total-${count}" class="order-sub"></span>
                    </li>`   
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

