// Get the url value after ?
const queryString = window.location.search;
const queryValue = queryString.slice(1, queryString.length);
// Format the restaurant name taken from the URL
let queryValueFmt = queryValue.replaceAll("%27", "'").replaceAll("%20", " ");
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

    // food rating
    const i = parseInt((restPageRatings.food.up.length / (restPageRatings.food.up.length + restPageRatings.food.down.length) * 100));
    let foodRatingDiv = document.createElement("div");
    restRatingsDiv.appendChild(foodRatingDiv);
    foodRatingDiv.innerHTML = "Food Quality: " + i + "% &#128077;";

    // value rating
    const j = parseInt((restPageRatings.value.up.length / (restPageRatings.value.up.length + restPageRatings.value.down.length) * 100));
    let valRatingDiv = document.createElement("div");
    restRatingsDiv.appendChild(valRatingDiv);
    valRatingDiv.innerHTML = "Value: " + j + "% &#128077;";

    // service rating
    const k = parseInt((restPageRatings.service.up.length / (restPageRatings.service.up.length + restPageRatings.service.down.length) * 100));
    let servRatingDiv = document.createElement("div");
    restRatingsDiv.appendChild(servRatingDiv);
    servRatingDiv.innerHTML = "Service: " + k + "% &#128077;";

    // language rating
    const l = parseInt((restPageRatings.language.up.length / (restPageRatings.language.up.length + restPageRatings.language.down.length) * 100));
    let langRatingDiv = document.createElement("div");
    restRatingsDiv.appendChild(langRatingDiv);
    langRatingDiv.innerHTML = "Language Independency: " + l + "% &#128077;";

    // recent reviews
    const recRevs = recentReviews(restPageRatings);
    let recReviewsDiv = document.createElement("div");
    restRatingsDiv.appendChild(recReviewsDiv);
    recReviewsDiv.innerHTML = "Recent Reviews: " + recRevs;

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