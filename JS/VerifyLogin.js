
try{

        window.loggedUser1 = localStorage.getItem("USER");
        window.loggedUser2 = sessionStorage.getItem("USER");

}
catch(exception2){

}    
    
console.log(loggedUser1)
console.log(loggedUser2)


if(loggedUser1 == null && loggedUser2 == null){
    //location.href = 'index.html';
    console.log("USER NOT FOUND")
}