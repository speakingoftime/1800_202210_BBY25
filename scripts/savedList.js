let saveBtn = document.getElementById("btn-check-outlined");
let restName = localStorage.getItem("restaurant name");

function toggleSaveBtn() {
  if (!saveBtn.classList.contains("active")) {
    console.log("Saved");
    saveBtn.classList.add("active");
    saveBtn.querySelector(".saveIcon").innerText = "favorite";
  }  
  else {
    console.log("Removed");
    saveBtn.classList.remove("active");
    saveBtn.querySelector(".saveIcon").innerText = "favorite_border";
  };
}

// Checks if user is logged in and allow them to remove items from the Saved list
// Otherwise, promt the user to login
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    let savedList = db.collection("users").doc(user.uid);

    savedList.get().then((doc) => {
      if (doc.exists) {
        // Check if user's saved list contains the restaurant
        let currentData = doc.data().restaurants;
        let match = currentData.find(element => {
          if (element.includes(restName)) {
            return true;
          }
        });
        // If the restaurant is in the user's list, 
        // change the button's state to the appropriate one
        if (match) {
          saveBtn.classList.add("active");
          saveBtn.querySelector(".saveIcon").innerText = "favorite";
        }
        
        // Add restaurant to user's saved list on click of button
        saveBtn.addEventListener("click", function() {
          toggleSaveBtn();
          // Filter restaurant name stored in localStorage from the user's saved restaurants
          let filterData = currentData.filter(function(result) {
            return result != restName; // Returns a new array
          });
          if (!saveBtn.classList.contains("active")) {
            let newData = [restName].concat(filterData);
            savedList.update({
              restaurants: newData
            });
          } else {
            savedList.update({
              restaurants: filterData
            });
          };
        });
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
    saveBtn.addEventListener("click", function() {
      // Load modal prompting user to log in
      let loginModal = new bootstrap.Modal(document.getElementById("loginModal"));
      loginModal.toggle(loginModal);
  })};
});
