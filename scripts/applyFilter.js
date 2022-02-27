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

// Auto-fill form from localStorage

const searchQuery = document.getElementById("searchBar");
const valueChecked = document.getElementById("valueSwitch");
const foodChecked = document.getElementById("foodSwitch");
const serviceChecked = document.getElementById("serviceSwitch");
const languageChecked = document.getElementById("languageSwitch");

searchQuery.value = localStorage.searchQuery ? localStorage.searchQuery : "";
valueChecked.checked = localStorage.valueChecked === "true" ? true : false;
foodChecked.checked = localStorage.foodChecked === "true" ? true : false;
serviceChecked.checked = localStorage.serviceChecked === "true" ? true : false;
languageChecked.checked = localStorage.languageChecked === "true" ? true : false;

// Filters

const containsQueryFilter = (currRest) => {
  return currRest.name.toLowerCase().includes(localStorage.searchQuery.toLowerCase());
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

queryFilter = localStorage.valueChecked === "true" ? queryFilter.filter(valueFilter) : queryFilter;
queryFilter = localStorage.foodChecked === "true" ? queryFilter.filter(foodFilter) : queryFilter;
queryFilter = localStorage.serviceChecked === "true" ? queryFilter.filter(serviceFilter) : queryFilter;
queryFilter = localStorage.languageChecked === "true" ? queryFilter.filter(languageFilter) : queryFilter;

// Create and append DOM elements

if (queryFilter.length == 0) {
  const nothingFound = document.createElement("h2");
  nothingFound.innerText = "Nothing found.";
  document.getElementById("resultsPlaceholder").appendChild(nothingFound);
}
else {
  queryFilter.forEach(element => {
    const restaurant = document.createElement("h2");
    restaurant.innerText = element.name;
    document.getElementById("resultsPlaceholder").appendChild(restaurant);
  })
}