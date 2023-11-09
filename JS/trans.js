import {getDatabase, set, get, update, remove, ref, child, onValue} from "https://www.gstatic.com/firebasejs/10.3.1/firebase-database.js"; 
import {getSeparatedDate} from "./getDateFormat.js"

window.db = getDatabase();
window.UsersDir = ref(db,'Users/');
window.LocIdDir = ref(db,'Loc_ID/');
window.ProdDir = ref(db,'Products/');
window.TransDir = ref(db,'Transactions/');

console.log(getSeparatedDate().serial)


var selectedDate
try{
    selectedDate = localStorage.getItem("date")
}
catch{
    selectedDate = year+month+day;
}




const USER = localStorage.getItem("USER")


if(USER==null){
    alert("Sesión expirada")
    location.href = "index.html"
}



const loggedUser = document.getElementById("loggedUser")
const dateSel = document.getElementById("date")
const searchButton=document.getElementById("search-button")

searchButton.addEventListener("click",()=>{
    selectedDate = String(dateSel.value).replace("-","")
    selectedDate = selectedDate.replace("-","").substring(2)
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
                    transactionList.innerHTML += `<li onclick="console.log('clicked');if(document.getElementById('total-'+${count}).textContent==''){document.getElementById('total-'+${count}).textContent=' Total: $ ${ChildSnapshot.val().total}'}else{document.getElementById('total-'+${count}).textContent=''}"><span>ID: ${ChildSnapshot.key}</span><br><span id="total-${count}" class="order-sub"></span></li>`   
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

