// Get restaurant data from database
const data = [];
db.collection("restaurants").get()
  .then(snap => {
    snap.forEach(doc => {
      data.push({
        "name": doc.data().name,
        "food": doc.data().food,
        "service": doc.data().service,
        "value": doc.data().value,
        "language": doc.data().language,
        "photoPrefix": doc.data().photoPrefix
      });
    })
  }).then(() => {
    // Parse query from url
    const queryString = window.location.search === "" ? "?search=" : window.location.search;
    const queryValues = queryString.slice(1, queryString.length).split(new RegExp("=|&"));
    const filters = {
      search: "",
      food: false,
      value: false,
      service: false,
      language: false
    }
    filters.search = queryValues[1];
    for (let i = 2; i < queryValues.length; i += 2) {
      if (queryValues[i + 1] == "on") {
        filters[queryValues[i]] = true;
      }
    }

    // Auto-fill form from parsed url values

    const searchQuery = document.getElementById("searchBar");
    const valueChecked = document.getElementById("valueSwitch");
    const foodChecked = document.getElementById("foodSwitch");
    const serviceChecked = document.getElementById("serviceSwitch");
    const languageChecked = document.getElementById("languageSwitch");

    searchQuery.value = filters.search;
    valueChecked.checked = filters.value;
    foodChecked.checked = filters.food;
    serviceChecked.checked = filters.service;
    languageChecked.checked = filters.language;

    // Filters

    const containsQueryFilter = (currRest) => {
      return currRest.name.toLowerCase().includes(filters.search.toLowerCase());
    }

    const valueFilter = (currRest) => {
      return Object.values(currRest.value.up).length + Object.values(currRest.value.down).length * -1 > 0;
    }

    const foodFilter = (currRest) => {
      return Object.values(currRest.food.up).length + Object.values(currRest.food.down).length * -1 > 0;
    }

    const serviceFilter = (currRest) => {
      return Object.values(currRest.service.up).length + Object.values(currRest.service.down).length * -1 > 0;
    }

    const languageFilter = (currRest) => {
      return Object.values(currRest.language.up).length + Object.values(currRest.language.down).length * -1 > 0;
    }

    // Apply Filters

    let queryFilter = data.filter(containsQueryFilter);

    queryFilter = filters.value ? queryFilter.filter(valueFilter) : queryFilter;
    queryFilter = filters.food ? queryFilter.filter(foodFilter) : queryFilter;
    queryFilter = filters.service ? queryFilter.filter(serviceFilter) : queryFilter;
    queryFilter = filters.language ? queryFilter.filter(languageFilter) : queryFilter;

    // Create and append DOM elements

    if (queryFilter.length == 0) {
      const nothingFound = document.createElement("h2");
      nothingFound.innerText = "Nothing found.";
      document.getElementById("resultsPlaceholder").appendChild(nothingFound);
    }
    else {
      const cardPlaceholder = document.getElementById("resultsPlaceholder");

      const numResults = document.createElement("p");
      numResults.innerHTML = queryFilter.length > 1 ? `${queryFilter.length} results` : `${queryFilter.length} result`;
      cardPlaceholder.appendChild(numResults);

      queryFilter.forEach((element, index) => {
        let cardTemplate = document.querySelector("#cardTemplate");
        let card = cardTemplate.content.cloneNode(true);
        card.id = "card" + index;
        const storageRef = firebase.storage().ref();
        storageRef.child(`/imgs/${element.photoPrefix}_01.jpeg`).getDownloadURL()
          .then(url => {
            const tempImg = card.getElementById("restImg");
            tempImg.src = url;
            tempImg.id = "restImg" + index;
            card.querySelector("a").setAttribute("href", "./restaurant.html?" + element.name);
            card.querySelector("#restName").innerHTML = element.name;
            card.querySelector("#restName").id = "restName" + index;

            const i = parseInt((Object.values(element.food.up).length / (Object.values(element.food.up).length + Object.values(element.food.down).length) * 100));
            card.querySelector("#restFood").innerHTML = '<img src="./images/icons/icons_foodQuality.svg" alt="food quality icon"/>Food Quality: ' + i + "% &#128077;";
            card.querySelector("#restFood").id = "restFood" + index;

            const j = parseInt((Object.values(element.value.up).length / (Object.values(element.value.up).length + Object.values(element.value.down).length) * 100));
            card.querySelector("#restValue").innerHTML = '<img src="./images/icons/icons_value.svg" alt="value icon"/>Value: ' + j + "% &#128077;";
            card.querySelector("#restValue").id = "restValue" + index;

            const k = parseInt((Object.values(element.service.up).length / (Object.values(element.service.up).length + Object.values(element.service.down).length) * 100));
            card.querySelector("#restService").innerHTML = '<img src="./images/icons/icons_service.svg" alt="service icon"/>Service: ' + k + "% &#128077;";
            card.querySelector("#restService").id = "restService" + index;

            const l = parseInt((Object.values(element.language.up).length / (Object.values(element.language.up).length + Object.values(element.language.down).length) * 100));
            card.querySelector("#restLanguage").innerHTML = '<img src="./images/icons/icons_language.svg" alt="language icon"/>Little English Needed: ' + l + "% &#128077;";
            card.querySelector("#restLanguage").id = "restLanguage" + index;

            const recRevs = recentReviews(element);
            card.querySelector("#restRecentReviews").innerHTML = '<img src="./images/icons/icons_trending.svg" alt="recent reviews icon"/>Recent Reviews:<br>' + recRevs;
            card.querySelector("#restRecentReviews").id = "restRecentReviews" + index;

            card.querySelector("#restWebsite").id = "restWebsite" + index;
            card.querySelector("#restMenu").id = "restMenu" + index;

            document.querySelector("#resultsPlaceholder").appendChild(card);
          })
      })
    }
  }).then(() => {
    console.log("Translate now");
    // Loads translate.js after the results
    let body = document.querySelector("body");
    let translateScript = document.createElement("script");
    translateScript.setAttribute("src", "./scripts/translate.js");
    body.appendChild(translateScript);
  });

const recentReviews = rest => {
  const oneMonth = 2628000000;
  const now = Date.now();
  let recentUp = 0;
  let recentDown = 0;
  for (prop in rest) {
    if (rest[prop].hasOwnProperty("up")) {
      Object.values(rest[prop].up).forEach(element => {
        if (now - element < oneMonth) {
          recentUp++;
        }
      })
      Object.values(rest[prop].down).forEach(element => {
        if (now - element < oneMonth) {
          recentDown++;
        }
      })
    }
  }
  const ratio = parseInt((recentUp / (recentUp + recentDown)) * 100);
  let ret = "";
  if (ratio >= 65) {
    ret = "┣ﾍ(^▽^ﾍ)Ξ(ﾟ▽ﾟ*)ﾉ┳━┳";
  }
  else if (ratio >= 60) {
    ret = "( ˘▽˘)っ♨";
  }
  else if (ratio >= 50) {
    ret = "┬─┬ノ(ಠ_ಠノ)";
  }
  else if (ratio >= 40) {
    ret = "(ノಠ益ಠ)ノ彡┻━┻";
  }
  else if (ratio >= 0) {
    ret = "(╯°Д°）╯︵/(.□ . )";
  } else {
    ret = "¯\\_(ツ)_/¯"
  }
  return ret;
}