let saveBtn = document.getElementById("btn-check-outlined");
let restName = localStorage.getItem("restaurant name");
console.log(restName);
let count = 0;

function toggleSaveBtn() {
  if (count === 0) {
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

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    var uid = user.uid;
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
        if (match !== undefined) {
          saveBtn.classList.add("active");
          saveBtn.querySelector(".saveIcon").innerText = "favorite";
          count = 1;
        }
        // Add restaurant to user's saved list on click of button
        saveBtn.addEventListener("click", function() {
          toggleSaveBtn();
          // Filter restaurant name stored in localStorage from the user's saved restaurants
          let filterData = currentData.filter(function(result) {
            return result != restName; // Returns a new array
          });
          if (count == 0) {
            let newData = [restName].concat(filterData);
            savedList.update({
              restaurants: newData
            });
            count++;
          } else if (count == 1) {
            savedList.update({
              restaurants: filterData
            });
            count--;
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
    let count = 0;
    saveBtn.addEventListener("click", function() {
      // Load modal prompting user to log in
      let loginModal = new bootstrap.Modal(document.getElementById("loginModal"));
      loginModal.toggle(loginModal);
      // Ensure the button does not look active while not logged in
      if (count == 0) {
        saveBtn.classList.remove("active");
        saveBtn.querySelector(".saveIcon").innerText = "favorite_border";
        count++;
      };
  })};
});
