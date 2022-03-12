
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    let savedList = db.collection("savedRestaurants").doc(user.uid);
    let userList = db.collection("users").doc(user.uid);

    // Add name to welcome page
    userList.get().then((doc) => {
      let userName = doc.data().name;
      document.getElementById("user-name-here").innerText = userName;
    });

    // Create and add cards for each restaurant in saved list
    savedList.get().then((doc) => {
      if (doc.exists) {
        let currentData = doc.data().restaurants;
        let savedCardTemplate = document.getElementById("savedCardTemplate");
        let savedListCard = document.getElementById("saved-list-placeholder");
        
        // Display the cards
        if (currentData.length !== 0) {
          currentData.forEach(element => {
            const savedCard = savedCardTemplate.content.cloneNode(true);
            let name = savedCard.querySelector(".card-title").innerText = element;
            savedCard.querySelector("a").setAttribute("href", "./restaurant.html?" + element);
            let saveBtn = savedCard.getElementById("btn-check-outlined");
            let count = 1;

            // Determine save button functions
            saveBtn.addEventListener("click", function() {
              localStorage.setItem("restaurant name", name);
              let restName = localStorage.getItem("restaurant name");
              // Filter restaurant name (in card) from the user's saved restaurants database
              let filterData = currentData.filter(function(result) {
                return result != restName; // Returns a new array
              });
              if (count == 1) {
                console.log("Removed");
                saveBtn.classList.remove("active");
                saveBtn.querySelector(".saveIcon").innerText = "favorite_border";
                // Rewrite list
                savedList.update({
                  restaurants: filterData
                });
                count--;
              }
              else if (count == 0) {
                console.log("Saved");
                saveBtn.classList.add("active");
                saveBtn.querySelector(".saveIcon").innerText = "favorite";
                let newData = [restName].concat(filterData);
                // Rewrite list
                savedList.update({
                  restaurants: newData
                });
                count++;
              }
            })
            savedListCard.appendChild(savedCard);
          })
        } else {
          const emptyList = document.createElement("p");
          let message = emptyList.innerText = "Nothing to see here!"
          savedListCard.appendChild(emptyList);
          console.log(message);
        }
        
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
    // Load modal prompting user to log in
    let loginModal = new bootstrap.Modal(document.getElementById("loginModal"));
    loginModal.show(loginModal);
  };
});

