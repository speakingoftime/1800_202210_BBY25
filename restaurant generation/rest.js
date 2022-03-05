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
  names.forEach(element => {
    const index = Math.floor(Math.random() * food.length);
    restaurants.push({
      name: element + "'s " + food[index],
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
      }
    });
  })

  const collection = db.collection("testRestaurants");
  for (let i = 0; i < restaurants.length; i++) {
    collection.add(restaurants[i]);
  }

  console.log(restaurants);
}