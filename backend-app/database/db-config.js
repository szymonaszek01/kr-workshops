const db = require("mongoose");

db.connect(
  "mongodb+srv://jakubaszekszymon:QmgtVKmFflY0BIS6@cluster-kr-workshops-1.9cgq8.mongodb.net/kr-workshops-1"

  // "mongodb+srv://klaudiarutkowska:CsJOsMQhYedD6kOD@kr-workshops.kgb6b.mongodb.net/kr-workshops-1"
)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("MongoDB connection error: ", error);
  });

module.exports = db;
