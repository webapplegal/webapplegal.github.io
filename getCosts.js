    import {getDatabase, set, get, update, remove, ref, child, onValue} from "https://www.gstatic.com/firebasejs/10.3.1/firebase-database.js"; 
    window.ItemDir = ref(db,'Items/');
    window.itemCosts = {}
    console.log(itemCosts)

    onValue(ItemDir, (snapshot)=>{
        snapshot.forEach(
        function(ChildSnapshot){
            itemCosts[ChildSnapshot.key] = ChildSnapshot.val()
        })
    });
