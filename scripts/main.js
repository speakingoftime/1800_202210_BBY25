// Checks if user is logged in
// If not, they will be prompted to log in
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    let savedList = db.collection("users").doc(user.uid);
    // Create and add cards for each saved restaurant
    savedList.get().then((doc) => {
      if (doc.exists) {
        // Add name to welcome page
        document.getElementById("user-name-here").innerText = doc.data().name;;

        // Changes the page language depending on the user's choice
        document.getElementById("langEng").addEventListener("click", function() {
          localStorage.setItem("Language", "Eng");
          savedList.update({"language": localStorage.getItem("Language")});
          translateToEng();
        });
        document.getElementById("langCn").addEventListener("click", function() {
          localStorage.setItem("Language", "Cn");
          savedList.update({"language": localStorage.getItem("Language")});
          translateToCn();
        });

        // Dynamically create and display the Saved Restaurants cards
        let currentData = doc.data().restaurants;
        let savedCardTemplate = document.getElementById("savedCardTemplate");
        let savedListCard = document.getElementById("saved-list-placeholder");
        if (currentData.length !== 0) {
          currentData.forEach((element, index) => {
            const savedCard = savedCardTemplate.content.cloneNode(true);
            let name = savedCard.querySelector(".card-title").innerText = element;
            savedCard.querySelector("a").setAttribute("href", "./restaurant.html?" + element);
            
            // Gets the images for the restaurant
            const tempImg = savedCard.getElementById("restImg");
            tempImg.id = "restImg" + index;
            db.collection("restaurants").where("name", "==", element).limit(1).get()
              .then(result => {
                result.forEach(element => {
                  const storageRef = firebase.storage().ref();
                  storageRef.child(`/imgs/${element.data().photoPrefix}_01.jpeg`).getDownloadURL()
                    .then(url => {
                      const tempImg2 = document.getElementById("restImg" + index);
                      tempImg2.src = url;
                    })
                })
              })

            // Determine save button functions
            let saveBtn = savedCard.getElementById("btn-check-outlined");
            saveBtn.addEventListener("click", function() {
              localStorage.setItem("restaurant name", name);
              let restName = localStorage.getItem("restaurant name");
              // Filter restaurant name (in card) from the user's saved restaurants database
              let filterData = currentData.filter(function(result) {
                return result != restName; // Returns a new array
              });
              // Removes restaurant from Saved if it's already on the list
              if (saveBtn.classList.contains("active")) {
                console.log("Removed");
                saveBtn.classList.remove("active");
                saveBtn.querySelector(".saveIcon").innerText = "favorite_border";
                // Rewrite list
                savedList.update({
                  restaurants: filterData
                });
              }
              else {
                // Adds restaurant to Saved if not already on it
                console.log("Saved");
                saveBtn.classList.add("active");
                saveBtn.querySelector(".saveIcon").innerText = "favorite";
                let newData = [restName].concat(filterData);
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
          emptyList.innerText = "Nothing to see here!";
          savedListCard.appendChild(emptyList);
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
