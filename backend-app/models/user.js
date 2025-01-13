const db = require("../database/db-config");

const { Schema } = db;

const userModel = new Schema({
  username: { type: String },
  password: { type: String },
  firstname: { type: String },
  lastname: { type: String },
  phoneNumber: { type: String },
  age: { type: Number },
  role: { type: String }
});

module.exports = db.model("User", userModel);
