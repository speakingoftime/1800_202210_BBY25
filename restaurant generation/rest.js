const populateRestaurants = () => {

  const names = ["Noah", "Emma",
    "Liam", "Olivia",
    "Jacob", "Sophia",
    "William", "Isabella",
    "Mason", "Ava",
    "Ethan", "Mia",
    "Michael", "Abigail",
    "Alexander", "Emily",
    "James", "Charlotte",
    "Elijah", "Madison",
    "Benjamin", "Elizabeth",
    "Daniel", "Amelia",
    "Aiden", "Evelyn",
    "Logan", "Ella",
    "Jayden	", "Chloe",
    "Matthew	", "Harper",
    "Lucas", "Avery",
    "David", "Sofia",
    "Jackson", "Grace",
    "Joseph", "Addison",
    "Anthony", "Victoria",
    "Samuel", "Lily",
    "Joshua", "Natalie",
    "Gabriel", "Aubrey",
    "Andrew", "Lillian"]

  const food = ["Sushi", "Pasta", "Steakhouse", "Ramen", "Pho", "Dumpling House", "Pizzeria", "Thai", "Seafood", "Halal", "Southern Restaurant", "Mexican Restaurant", "Indian Restaurant", "French Cuisine", "Poké", "Sandwich Shop", "Burgers"]
  const photo = ["sushi", "pasta", "steak", "ramen", "pho", "dumpling", "pizzeria", "thai", "seafood", "halal", "southern", "mexican", "indian", "french", "poke", "sandwich", "burger"];
  const genTimestamps = () => {
    const twoMonths = 311040000;
    return (Date.now() - Math.floor(Math.random() * twoMonths));
  }

  const uuidv4 = () => {
    return ([1e7]+1e19).replace(/[018]/g, c =>
      (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16));
  }

  const genReview = (upperbound) => {
    const myRandom = upperbound ? Math.floor(Math.random() * 25 + 25) : Math.floor(Math.random() * 50)
    const ret = {};
    for (let i = 0; i < myRandom; i++) {
      ret[uuidv4()] = genTimestamps();
    }
    return ret;
  }

  const restaurants = [];
  const streetNames = ["Granville St", "Main St", "W Broadway", "Lougheed Hwy", "Alberni St", "Cambie Ave", "Victoria Dr", "Robson St"];
  
  const openingHours = ["9:00AM", "10:00AM", "11:00AM", "11:30AM", "12:00PM", "12:30PM"];
  const closingHours = ["8:00PM", "9:00PM", "9:30PM", "10:00PM", "10:30PM", "11:00PM"];
  names.forEach((element, index) => {
    const foodIndex = Math.floor(Math.random() * food.length);
    const restName = element + "'s " + food[foodIndex]
    restaurants.push({
      name: restName,
      food: {
        up: genReview(true),
        down: genReview(false)
      },
      value: {
        up: genReview(true),
        down: genReview(false)
      },
      service: {
        up: genReview(true),
        down: genReview(false)
      },
      language: {
        up: genReview(true),
        down: genReview(false)
      },
      address: Math.floor(Math.random() * 10000) + " " +  
        streetNames[Math.floor(Math.random() * streetNames.length)] + ", V" +  
        Math.floor(Math.random() * 9) +
        String.fromCharCode(Math.floor(Math.random() * 26) + 65) + " " + 
        Math.floor(Math.random() * 9) +
        String.fromCharCode(Math.floor(Math.random() * 26) + 65) + 
        Math.floor(Math.random() * 9),
      phoneNumber: "+1 604-555-" + (index < 10 ? "000" + index : "00" + index),
      hours: "7 days a week " + openingHours[Math.floor(Math.random() * openingHours.length)] + " - " +
        closingHours[Math.floor(Math.random() * closingHours.length)],
      website: "www." + restName.replace(/'| /g, "").toLowerCase() + ".com",
      photoPrefix: photo[foodIndex]
    });
  })

  const collection = db.collection("restaurantsJM");
  for (let i = 0; i < restaurants.length; i++) {
    collection.add(restaurants[i]);
  }

  console.log(restaurants);
}