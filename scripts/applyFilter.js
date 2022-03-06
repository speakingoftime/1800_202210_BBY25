// Get restaurant data from database
const data = [];
db.collection("testRestaurants").get()
  .then(snap => {
    snap.forEach(doc => {
      data.push({
        "name": doc.data().name,
        "food": doc.data().food,
        "service": doc.data().service,
        "value": doc.data().value,
        "language": doc.data().language
      });
    })
  }).then(() => {
    // Parse query from url
    const queryString = window.location.search;
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
      return currRest.value.up.length + currRest.value.down.length * -1 > 0;
    }

    const foodFilter = (currRest) => {
      return currRest.food.up.length + currRest.food.down.length * -1 > 0;
    }

    const serviceFilter = (currRest) => {
      return currRest.service.up.length + currRest.service.down.length * -1 > 0;
    }

    const languageFilter = (currRest) => {
      return currRest.language.up.length + currRest.language.down.length * -1 > 0;
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
      numResults.innerHTML = queryFilter.length > 1 ? `Search returned ${queryFilter.length} results.` : `Search returned ${queryFilter.length} result.`;
      cardPlaceholder.appendChild(numResults);

      queryFilter.forEach((element, index) => {
        const card = document.createElement("div");
        card.id = "card" + index;
        cardPlaceholder.appendChild(card);

        $(`#${card.id}`).load("./card.html", function () {
          card.querySelector("a").setAttribute("href", "./restaurant.html?" + element.name);

          document.getElementById("restName").innerHTML = element.name;
          document.getElementById("restName").id = "restName" + index;

          const i = parseInt((element.food.up.length / (element.food.up.length + element.food.down.length) * 100));
          document.getElementById("restFood").innerHTML = "Food Quality: " + i + "% &#128077;";
          document.getElementById("restFood").id = "restFood" + index;

          const j = parseInt((element.value.up.length / (element.value.up.length + element.value.down.length) * 100));
          document.getElementById("restValue").innerHTML = "Value: " + j + "% &#128077;";
          document.getElementById("restValue").id = "restValue" + index;

          const k = parseInt((element.service.up.length / (element.service.up.length + element.service.down.length) * 100));
          document.getElementById("restService").innerHTML = "Service: " + k + "% &#128077;";
          document.getElementById("restService").id = "restService" + index;

          const l = parseInt((element.language.up.length / (element.language.up.length + element.language.down.length) * 100));
          document.getElementById("restLanguage").innerHTML = "Language Independency: " + l + "% &#128077;";
          document.getElementById("restLanguage").id = "restLanguage" + index;

          const recRevs = recentReviews(element);
          document.getElementById("restRecentReviews").innerHTML = "Recent Reviews: " + recRevs;
          document.getElementById("restRecentReviews").id = "restRecentReviews" + index;
        });

      })
    }
  })
const recentReviews = rest => {
  const oneMonth = 155520000;
  const now = Date.now();
  let recentUp = 0;
  let recentDown = 0;
  for (prop in rest) {
    if (prop !== "name") {
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