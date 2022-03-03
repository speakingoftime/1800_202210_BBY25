let dummyData = {
  "restaurants": [
    {
      "name": "John's Pasta",
      "food": [
        100,
        18
      ],
      "value": [
        20,
        89
      ],
      "service": [
        80,
        22
      ],
      "language": [
        20,
        65
      ]
    },
    {
      "name": "Sally's Sushi",
      "food": [
        88,
        56
      ],
      "value": [
        77,
        22
      ],
      "service": [
        80,
        220
      ],
      "language": [
        221,
        65
      ]
    },
    {
      "name": "Frank's Noodles",
      "food": [
        111,
        2
      ],
      "value": [
        300,
        1
      ],
      "service": [
        2,
        111
      ],
      "language": [
        100,
        1
      ]
    },
    {
      "name": "Pam's Steakhouse",
      "food": [
        120,
        1
      ],
      "value": [
        2,
        99
      ],
      "service": [
        800,
        2
      ],
      "language": [
        2,
        650
      ]
    },
    {
      "name": "Bianca's Pizza",
      "food": [
        1020,
        8
      ],
      "value": [
        200,
        89
      ],
      "service": [
        802,
        2
      ],
      "language": [
        200,
        5
      ]
    }
  ]
}

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
  return currRest.value[0] + currRest.value[1] * -1 > 0;
}

const foodFilter = (currRest) => {
  return currRest.food[0] + currRest.food[1] * -1 > 0;
}

const serviceFilter = (currRest) => {
  return currRest.service[0] + currRest.service[1] * -1 > 0;
}

const languageFilter = (currRest) => {
  return currRest.language[0] + currRest.language[1] * -1 > 0;
}

// Apply Filters

let queryFilter = dummyData.restaurants.filter(containsQueryFilter);

queryFilter = filters.search !== "" ? queryFilter.filter(valueFilter) : queryFilter;
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

  queryFilter.forEach((element, index) => {
    const card = document.createElement("div");
    card.id = "card" + index;
    cardPlaceholder.appendChild(card);
    
    $(`#${card.id}`).load("./card.html", function () {
      document.getElementById("restName").innerHTML = element.name;
      document.getElementById("restName").id = "restName" + index;

      const i = parseInt((element.food[0] / (element.food[0] + element.food[1]) * 100));
      document.getElementById("restFood").innerHTML = "Food Quality: " + i + "% &#128077;";
      document.getElementById("restFood").id = "restFood" + index;

      const j = parseInt((element.value[0] / (element.value[0] + element.value[1]) * 100));
      document.getElementById("restValue").innerHTML = "Value: " + j + "% &#128077;";
      document.getElementById("restValue").id = "restValue" + index;

      const k = parseInt((element.service[0] / (element.service[0] + element.service[1]) * 100));
      document.getElementById("restService").innerHTML = "Service: " + k + "% &#128077;";
      document.getElementById("restService").id = "restService" + index;

      const l = parseInt((element.language[0] / (element.language[0] + element.language[1]) * 100));
      document.getElementById("restLanguage").innerHTML = "Language Independency: " + l + "% &#128077;";
      document.getElementById("restLanguage").id = "restLanguage" + index;

    });

  })
}
