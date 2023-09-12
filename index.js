import {getDatabase, set, get, update, remove, ref, child, onValue} from "https://www.gstatic.com/firebasejs/10.3.1/firebase-database.js";
//reference to login page items
window.fieldUsername = document.querySelector("#enterUsername");
window.fieldPassword = document.querySelector("#enterPassword");
window.submitButton = document.querySelector("#loginSubmit"); 
submitButton.addEventListener('click',findUser);
    
// Enter key can submit login ingo
fieldPassword.addEventListener("keypress", function(event) {
        // If the user presses the "Enter" key on the keyboard
        if (event.key === "Enter") {
          // Cancel the default action, if needed
        event.preventDefault();
        console.log("Enter pressed")
          // Trigger the button element with a click
        submitButton.click();
        }
    });

//create local ref to database
    const dbref = ref(db)

    function findUser(){
        get(child(dbref,'Users/'+fieldUsername.value))
        .then((snapshot)=>{
            if(snapshot.exists()){
                if(snapshot.val().password == fieldPassword.value){
                    console.log(snapshot.val())
                    window.USER = snapshot.val();
                    localStorage.setItem("USER",USER.username)
                    localStorage.setItem("canEdit",USER.canEdit)
                    localStorage.setItem('canAdd',USER.canAdd)
                    location.href = 'main.html';
                }
                else{
                    alert('invalid password')
                    fieldUsername.value = ""
                    fieldPassword.value = ""
                }
            }
            else{   
                alert('user not found')
                fieldUsername.value = ""
                fieldPassword.value = ""
            }   
        })
        
    }

    

