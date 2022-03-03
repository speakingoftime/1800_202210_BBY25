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



// card.onclick = function() {
  
// }

$.load("./restaurant.html", function() {
  let restName = document.getElementById("rest-name-placeholder");
  restName = dummyData.name;
});

