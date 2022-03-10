// Change login button to sign out user
let loginBtn = document.getElementById("login-btn");

firebase.auth().onAuthStateChanged(user => {
    if (user) {
        loginBtn.setAttribute("href", "./index.html");
        loginBtn.innerHTML = "Log out";
        loginBtn.addEventListener("click", function () {
            firebase.auth().signOut().then(() => {
                // Sign-out successful.
                console.log("Sucessfully signed out");
            }).catch((error) => {
                // An error happened.
            });
        });
    } else {
        // Keep login button as is
        loginBtn.setAttribute("href", "./login.html");
        loginBtn.innerHTML = "Log in";
    }
});