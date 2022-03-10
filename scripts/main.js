
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
              if (count == 1) {
                console.log("Removed");
                count--;
                // Filter restaurant name (in card) from the user's saved restaurants database
                let tempData = currentData.filter(function(result) {
                  return result != name; // Returns a new array
                })
                // Rewrite list
                savedList.update({
                  restaurants: tempData
                });
              }
              else if (count == 0) {
                console.log("Saved");
                count++;
                // Get restaurant name from card
                let tempData = [name];
                // Concatenate restaurant name to top of current list
                let newData = tempData.concat(currentData);
                // Rewrite list
                savedList.update({
                  restaurants: newData
                });
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
    // Redirect user to login page
    location.href = "./login.html";
  }
});

