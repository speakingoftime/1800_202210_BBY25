// Get the url value after ?
const queryString = window.location.search;
const queryValue = queryString.slice(1, queryString.length);
// Format the restaurant name taken from the URL
let queryValueFmt = queryValue.replaceAll("%27", "'").replaceAll("%20", " ").replaceAll("%C3%A9", "é");
let restPageName = queryValueFmt;
localStorage.setItem("restaurant name", restPageName);

let restPageRatings;

db.collection("restaurants").get()
  .then(snap => {
    snap.forEach(doc => {
      // Load the restaurant's name + ratings
      if (restPageName === doc.data().name) {
        restPageRatings = doc.data();
      }
    })
  }).then(() => {
    // Changes restaurant name
    document.getElementById("rest-name-placeholder").innerText = restPageName;

    // Creates a div to hold all the ratings
    let restRatingsDiv = document.createElement("div");
    let restRatingsContent = document.getElementById("rest-ratings-content");
    restRatingsContent.appendChild(restRatingsDiv);

    // language rating
    const l = parseInt((restPageRatings.language.up.length / (restPageRatings.language.up.length + restPageRatings.language.down.length) * 100));
    let langRatingDiv = document.createElement("div");
    restRatingsDiv.appendChild(langRatingDiv);
    langRatingDiv.innerHTML = '<img src="./images/icons/icons_language.svg" alt="language icon"/>Little English Needed: ' + l + "% &#128077;";

    // food rating
    const i = parseInt((restPageRatings.food.up.length / (restPageRatings.food.up.length + restPageRatings.food.down.length) * 100));
    let foodRatingDiv = document.createElement("div");
    restRatingsDiv.appendChild(foodRatingDiv);
    foodRatingDiv.innerHTML = '<img src="./images/icons/icons_foodQuality.svg" alt="food quality icon"/>Food Quality: ' + i + "% &#128077;";

    // value rating
    const j = parseInt((restPageRatings.value.up.length / (restPageRatings.value.up.length + restPageRatings.value.down.length) * 100));
    let valRatingDiv = document.createElement("div");
    restRatingsDiv.appendChild(valRatingDiv);
    valRatingDiv.innerHTML = '<img src="./images/icons/icons_value.svg" alt="value icon"/>Value: ' + j + "% &#128077;";

    // service rating
    const k = parseInt((restPageRatings.service.up.length / (restPageRatings.service.up.length + restPageRatings.service.down.length) * 100));
    let servRatingDiv = document.createElement("div");
    restRatingsDiv.appendChild(servRatingDiv);
    servRatingDiv.innerHTML = '<img src="./images/icons/icons_service.svg" alt="service icon"/>Service: ' + k + "% &#128077;";

    // recent reviews
    const recRevs = recentReviews(restPageRatings);
    let recReviewsDiv = document.createElement("div");
    restRatingsDiv.appendChild(recReviewsDiv);
    recReviewsDiv.innerHTML = '<img src="./images/icons/icons_trending.svg" alt="recent reviews icon"/>Recent Reviews: ' + recRevs;

    // address
    document.getElementById("rest-address-placeholder").innerHTML = restPageRatings.address;

    // website
    const link = document.createElement("a");
    link.setAttribute("href", restPageRatings.website); 
    link.innerHTML = restPageRatings.website;
    const website = document.getElementById("rest-website-placeholder");
    website.removeChild(website.lastChild);
    website.appendChild(link);

    // hours
    document.getElementById("rest-hours-placeholder").innerHTML = restPageRatings.hours;

    // Phone
    document.getElementById("rest-phone-placeholder").innerHTML = restPageRatings.phoneNumber;

  }).then(() => {
    // Loads translate.js after the results
    let body = document.querySelector("body");
    let translateScript = document.createElement("script");
    translateScript.setAttribute("src", "./scripts/translate.js");
    body.appendChild(translateScript);
  })

const recentReviews = rest => {
  const oneMonth = 155520000;
  const now = Date.now();
  const metrics = ["food", "value", "service", "language"];
  let recentUp = 0;
  let recentDown = 0;
  for (prop in rest) {
    if (metrics.includes(prop)) {
      rest[prop].up.forEach(element => {
        if (now - element < oneMonth) {
          recentUp++;
        }
      })
      rest[prop].down.forEach(element => {
        if (now - element < oneMonth) {
          recentDown++;
        }
      })
    }
  }
  const ratio = parseInt((recentUp / (recentUp + recentDown)) * 100);
  let ret = "";
  if (ratio >= 80) {
    ret = "Overwhelmingly Positive";
  }
  else if (ratio >= 70) {
    ret = "Mostly Positive";
  }
  else if (ratio >= 50) {
    ret = "Mixed";
  }
  else if (ratio >= 30) {
    ret = "Mostly Negative";
  }
  else {
    ret = "Overwhelmingly Negative";
  }
  return ret;
}

// Submit Review
$("#reviewForm").submit(function(e) {
  e.preventDefault();
});

// Restaurant Document ID
db.collection("restaurants").where("name", "==", restPageName).get().then((querySnapshot) => {
  querySnapshot.forEach((doc) => {
    var docID = doc.id;
    console.log("doc id: " + docID);

    // User UID
    firebase.auth().onAuthStateChanged((user) => {
      let reviewButton = document.getElementById("reviewButton");

      if (user) {
        var userUID = user.uid; 
        console.log("user uid: " + userUID);
        
        // User logged in already or has just logged in.
        reviewButton.addEventListener("click", function() {
          var x = document.getElementById("reviewForm");
          if (x.style.display === "none" || x.style.display === "") {
            x.style.display = "block";
          } else {
            x.style.display = "none";
          }
        });

        $("#reviewForm").submit(function() {

          const foodButton = ($('input[name=food]:checked').val())
          const valueButton = ($('input[name=value]:checked').val())
          const serviceButton = ($('input[name=service]:checked').val())
          const languageButton = ($('input[name=language]:checked').val())
        
          if (foodButton == null || 
              valueButton == null || 
              serviceButton == null || 
              languageButton == null) {
              
          alert("Please select all buttons!"); 
        
          } else {

          db.collection("jmTest").doc(docID).update({
            [`food.up.${userUID}`]: firebase.firestore.FieldValue.delete(),
            [`food.down.${userUID}`]: firebase.firestore.FieldValue.delete(),
            [`value.up.${userUID}`]: firebase.firestore.FieldValue.delete(),
            [`value.down.${userUID}`]: firebase.firestore.FieldValue.delete(),
            [`service.up.${userUID}`]: firebase.firestore.FieldValue.delete(),
            [`service.down.${userUID}`]: firebase.firestore.FieldValue.delete(),
            [`language.up.${userUID}`]: firebase.firestore.FieldValue.delete(),
            [`language.down.${userUID}`]: firebase.firestore.FieldValue.delete(),
          });

            if (foodButton == "up") {
              db.collection("jmTest").doc(docID).set({
                food: {
                  up: {
                    [userUID]: Date.now()
                  }
                }
              }, {
                merge: true
              })
            }
            if (foodButton == "down") {
              db.collection("jmTest").doc(docID).set({
                food: {
                  down: {
                    [userUID]: Date.now()
                  }
                }
              }, {
                merge: true
              })
            }
            if (valueButton == "up") {
              db.collection("jmTest").doc(docID).set({
                value: {
                  up: {
                    [userUID]: Date.now()
                  }
                }
              }, {
                merge: true
              })
            }
            if (valueButton == "down") {
              db.collection("jmTest").doc(docID).set({
                value: {
                  down: {
                    [userUID]: Date.now()
                  }
                }
              }, {
                merge: true
              })
            }
            if (serviceButton == "up") {
              db.collection("jmTest").doc(docID).set({
                service: {
                  up: {
                    [userUID]: Date.now()
                  }
                }
              }, {
                merge: true
              })
            }
            if (serviceButton == "down") {
              db.collection("jmTest").doc(docID).set({
                service: {
                  down: {
                    [userUID]: Date.now()
                  }
                }
              }, {
                merge: true
              })
            }
            if (languageButton == "up") {
              db.collection("jmTest").doc(docID).set({
                language: {
                  up: {
                    [userUID]: Date.now()
                  }
                }
              }, {
                merge: true
              })
            }
            if (languageButton == "down") {
              db.collection("jmTest").doc(docID).set({
                language: {
                  down: {
                    [userUID]: Date.now()
                  }
                }
              }, {
                merge: true
              })
            }
            console.log("submitted form");
          // End of else
          }
        // End of function
        });

      } else {
        // User not logged in or has just logged out.
        reviewButton.addEventListener("click", function() {
          // Load modal prompting user to log in
          let loginModal = new bootstrap.Modal(document.getElementById("loginModal"));
          loginModal.toggle(loginModal);
        });
      }
    });
  });
});