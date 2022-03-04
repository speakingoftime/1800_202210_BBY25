// Get the url value after ?
const queryString = window.location.search;
const queryValue = queryString.slice(1, queryString.length);
// Format the restaurant name taken from the URL
let queryValueFmt = queryValue.replaceAll("%27", "'").replaceAll("%20", " ");
let restPageName = queryValueFmt;

let restPageRatings = [];

db.collection("restaurants").get()
  .then(snap => {
    snap.forEach(doc => {
        // Load the restaurant's name + ratings
        if (restPageName === doc.data().name) {
          restPageRatings.push({
            "food": doc.data().food,
            "service": doc.data().service,
            "value": doc.data().value,
            "language": doc.data().language
          });
        }
    })
  }).then(() => {
    // Changes restaurant name
    document.getElementById("rest-name-placeholder").innerText = restPageName;

    // Creates a div to hold all the ratings
    let restRatingsDiv = document.createElement("div");
    let restRatingsContent = document.getElementById("rest-ratings-content");
    restRatingsContent.appendChild(restRatingsDiv);

    restPageRatings.forEach(doc => {
      // food rating
      const i = parseInt((doc.food[0] / (doc.food[0] + doc.food[1]) * 100));
      let foodRatingDiv = document.createElement("div");
      restRatingsDiv.appendChild(foodRatingDiv);
      foodRatingDiv.innerHTML = "Food Quality: " + i + "% &#128077;";

      // value rating
      const j = parseInt((doc.value[0] / (doc.value[0] + doc.value[1]) * 100));
      let valRatingDiv = document.createElement("div");
      restRatingsDiv.appendChild(valRatingDiv);
      valRatingDiv.innerHTML = "Value: " + j + "% &#128077;";

      // service rating
      const k = parseInt((doc.service[0] / (doc.service[0] + doc.service[1]) * 100));
      let servRatingDiv = document.createElement("div");
      restRatingsDiv.appendChild(servRatingDiv);
      servRatingDiv.innerHTML = "Service: " + k + "% &#128077;";

      // language rating
      const l = parseInt((doc.language[0] / (doc.language[0] + doc.language[1]) * 100));
      let langRatingDiv = document.createElement("div");
      restRatingsDiv.appendChild(langRatingDiv);
      langRatingDiv.innerHTML = "Language Independency: " + l + "% &#128077;";
    });

  })