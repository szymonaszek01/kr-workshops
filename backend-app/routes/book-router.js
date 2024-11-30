const express = require("express");
const { getAllBooks, getBookById } = require("../services/book-service");

const bookRouter = express.Router();

bookRouter.get("/books", async (req, res) => {
  const { query } = req;
  await getAllBooks(query)
    .then((books) => res.json(books))
    .catch((error) => res.status(400).send({ error }));
});

bookRouter.get("/books/:id", async (req, res) => {
  const id = req.params.id;
  await getBookById(id)
    .then((book) => res.json(book))
    .catch((error) => res.status(404).send({ error }));
});

module.exports = bookRouter;
