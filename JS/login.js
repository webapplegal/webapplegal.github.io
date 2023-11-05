import {getDatabase, set, get, update, remove, ref, child, onValue} from "https://www.gstatic.com/firebasejs/10.3.1/firebase-database.js"; 

window.db = getDatabase();
window.UsersDir = ref(db,'Users/');
window.LocIdDir = ref(db,'Loc_ID/');
const dbref = ref(getDatabase());


const login_submit_button = document.getElementById("login-submit");
const login_username = document.getElementById("username-field");
const login_password = document.getElementById("password-field");

login_submit_button.addEventListener("click",()=>{
    console.log("Usuario:",login_username.value)
    console.log("Contraseña:",login_password.value)

    let Passed = CredentialValidation(login_username.value,login_password.value)
    console.log("Passed?", Passed)

})


// Functions

function CredentialValidation(usernameToValidate,passwordToValidate){

    console.log("FindUser running")
    let status = false
    
    return get(child(dbref,'Users/'+usernameToValidate)).then((snapshot)=>{

            if(snapshot.exists()){
                console.log("User found")
                
                if(snapshot.val().password == passwordToValidate){
                    localStorage.setItem("USER",usernameToValidate);
                    localStorage.setItem("RUTA",snapshot.val().ruta);
                    sessionStorage.setItem("USER",usernameToValidate);
                    console.log("Password correct")
                    location.href = "qrScan.html"
                    return true;
                }
                else{
                    console.log("Password incorrect")
                    return false;
                } 
            }
            else{   
                console.log("User not found")
                login_username.value = ""
                login_username.value = ""
                return false;
            }

        }
    )

}








