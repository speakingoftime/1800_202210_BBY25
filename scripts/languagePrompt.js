const langPrompt = document.getElementById("offcanvasBottom");

// Check if user has first visited by checking if there's a "Prompt" key in localStorage
if (localStorage.getItem("Prompted") === null) {
  langPrompt.classList.toggle("show");
  localStorage.setItem("Prompted", "true");
  localStorage.setItem("Language", "Eng");
} else {

  // User has visited before
  // If user is logged in, save and/or get the language from their profile
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      let docRef = db.collection("users").doc(user.uid);
      docRef.get().then(snapshot => {

        // Add user's name to the Welcome Message
        let userName = snapshot.data().name;
        document.getElementById("user-name-here").innerHTML = ", <br/>" + userName;

        // Translate the page according to user's "Language" field setting
        if (snapshot.data().language) {
          console.log("User has a language setting");
          if (snapshot.data().language === "Cn") {
            translateToCn();
          }
        } else {

          // User doesn't have a language setting
          // Add language from localstorage
          docRef.update({ "language": localStorage.getItem("Language") });
          console.log("Added language to user profile");
        }
      });

      // If user has selected "Ask later" when they first visited, logged in, and visited index.html again
      // Keep localStorage AND their profile language settings consistent and up-to-date
      if (localStorage.getItem("Prompted") === "Ask again") {
        langPrompt.classList.toggle("show");
      }
      document.getElementById("yesChangeLangBtn").addEventListener("click", function () {
        localStorage.setItem("Prompted", "true");
        docRef.update({ "language": localStorage.getItem("Language") });
      })
      document.getElementById("langEng").addEventListener("click", function () {
        localStorage.setItem("Language", "Eng");
        docRef.update({ "language": localStorage.getItem("Language") });
        translateToEng();
      });
      document.getElementById("langCn").addEventListener("click", function () {
        localStorage.setItem("Language", "Cn");
        docRef.update({ "language": localStorage.getItem("Language") });
        translateToCn();
      });
    } else {

      // User not signed in
      // Get the language setting from localStorage
      if (localStorage.getItem("Prompted") === "Ask again") {
        langPrompt.classList.toggle("show");
      }
      if (localStorage.getItem("Language") === "Cn") {
        translateToCn();
      } else {
        translateToEng();
      }
    }
  });
}

// When the prompt is open
// If user clicks Yes > choose option
document.getElementById("yesChangeLangBtn").addEventListener("click", function () {
  localStorage.setItem("Prompted", "true");
})
document.getElementById("langEng").addEventListener("click", function () {
  localStorage.setItem("Language", "Eng");
  translateToEng();
});
document.getElementById("langCn").addEventListener("click", function () {
  localStorage.setItem("Language", "Cn");
  translateToCn();
});
// If user clicks No, prompt closes, no translation, nothing else happens

// If user clicks Later, update the localStorage
document.getElementById("askLaterLangBtn").addEventListener("click", function () {
  localStorage.setItem("Prompted", "Ask again");
});

// Changes content to Chinese simplified
function translateToCn() {
  // Change text in index.html

  //Nav
  document.getElementById("home-btn").innerText = "??????";
  document.getElementById("search-btn").innerText = "??????";
  document.getElementById("saved-btn").innerText = "???????????????";
  document.getElementById("login-btn").innerText = "????????????";

  // Hero text
  document.querySelector("h1").innerText = "?????????????????????";
  document.querySelector("p").innerText = "????????????? ?????????????????????";

  // Search bar
  document.getElementById("searchBar").setAttribute("placeholder", "??????");

  // Filters
  document.getElementById("filterDesc").innerText = "????????????";
  document.getElementById("foodLabel").innerText = "????????????";
  document.getElementById("valueLabel").innerText = "????????????";
  document.getElementById("serviceLabel").innerText = "????????????";
  document.getElementById("languageLabel").innerText = "?????????????????????";

  // Language prompt content
  document.getElementById("langBtn").innerHTML = document.getElementById("langBtn").innerHTML.replace('Language', '??????');
  document.getElementById("offcanvasBottomLabel").innerText = "????????????";
  document.getElementById("yesChangeLangBtn").innerText = "??????";
  document.getElementById("noChangeLangBtn").innerText = "??????????????????";
  document.getElementById("askLaterLangBtn").innerText = "????????????";
}

// Changes content back to English
function translateToEng() {
  // Change text in index.html

  // Nav
  document.getElementById("home-btn").innerText = "Home";
  document.getElementById("search-btn").innerText = "Search";
  document.getElementById("saved-btn").innerText = "Saved List";
  document.getElementById("login-btn").innerText = "Log in";

  // Hero text
  document.querySelector("h1").innerText = "Welcome to Vancouver";
  document.querySelector("p").innerText = "Hungry? Start your search below";

  // Search bar
  document.getElementById("searchBar").setAttribute("placeholder", "Search");

  // Filters
  document.getElementById("filterDesc").innerText = "Filter restaurants by:";
  document.getElementById("foodLabel").innerText = "Food Quality";
  document.getElementById("valueLabel").innerText = "Value";
  document.getElementById("serviceLabel").innerText = "Service";
  document.getElementById("languageLabel").innerText = "Little English Needed";

  // Language prompt content
  document.getElementById("langBtn").innerHTML = document.getElementById("langBtn").innerHTML.replace('??????', 'Language');
  document.getElementById("offcanvasBottomLabel").innerText = "Change language";
  document.getElementById("yesChangeLangBtn").innerText = "Yes";
  document.getElementById("noChangeLangBtn").innerText = "No";
  document.getElementById("askLaterLangBtn").innerText = "Later";
}