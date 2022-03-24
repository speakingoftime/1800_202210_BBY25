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

  const genTimestamps = () => {
    const twoMonths = 311040000;
    const numStamps = Math.floor(Math.random() * 200);
    const arr = [];
    for (let i = 0; i < numStamps; i++) {
      arr.push(Date.now() - Math.floor(Math.random() * twoMonths));
    }
    return arr;
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
        up: genTimestamps(),
        down: genTimestamps()
      },
      value: {
        up: genTimestamps(),
        down: genTimestamps()
      },
      service: {
        up: genTimestamps(),
        down: genTimestamps()
      },
      language: {
        up: genTimestamps(),
        down: genTimestamps()
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
      website: "www." + restName.replace(/'| /g, "").toLowerCase() + ".com"

    });
  })

  const collection = db.collection("restaurants");
  for (let i = 0; i < restaurants.length; i++) {
    collection.add(restaurants[i]);
  }

  console.log(restaurants);
}