const db = require("../database/db-config");

const { Schema } = db;

const bookModel = new Schema({
  title: { type: String },
  author: { type: String },
  genre: { type: String },
  read: { type: Boolean, default: false },
});

module.exports = db.model("Book", bookModel);
