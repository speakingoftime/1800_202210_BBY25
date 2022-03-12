let saveBtn = document.getElementById("btn-check-outlined");
let restName = localStorage.getItem("restaurant name");
console.log(restName);


firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    var uid = user.uid;
    let savedList = db.collection("savedRestaurants").doc(user.uid);

    savedList.get().then((doc) => {
      if (doc.exists) {
        // Check if user's saved list contains the restaurant
        let currentData = doc.data().restaurants;
        let match = currentData.find(element => {
          if (element.includes(restName)) {
            return true;
          }
        });
        console.log("Undefined? " + match); 
        // If the restaurant is in the user's list, 
        // change the button's state to the appropriate one
        let count = 0;
        if (match == undefined) {
          saveBtn.removeAttribute("checked");
          count = 0;
        } else {
          count = 1;
        }

        // Add restaurant to user's saved list on click of button
        saveBtn.addEventListener("click", function() {
          if (count == 0) {
            console.log("Saved");
            count++;
            // Get restaurant name from local storage
            let tempData = [restName];
            // Concatenate restaurant name to top of current list
            let newData = tempData.concat(currentData);
            // Rewrite list
            savedList.update({
              restaurants: newData
            });
          } else if (count == 1) {
            console.log("Removed");
            count--;
            // Filter restaurant name stored in localStorage from the user's saved restaurants
            let tempData = currentData.filter(function(result) {
              return result != restName; // Returns a new array
            })
            // Rewrite list
            savedList.update({
              restaurants: tempData
            });
          }
        })
        
      } else {
        // doc.data() will be undefined
        console.log("No such document!");
      }
    }).catch((error) => {
      console.log("Error getting document:", error);
    });
  } else {
    // User is signed out
    console.log("Not logged in");
    saveBtn.removeAttribute("checked");
  }
});
