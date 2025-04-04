const express = require("express");
const { getAllBooks, getBookById, deleteBookById } = require("../services/book-service");
const { isValidJwt } = require("../middleware/auth.middleware");

const bookRouter = express.Router();

bookRouter.get("/books", isValidJwt, async (req, res) => {
  const { query } = req;
  await getAllBooks(query)
    .then((books) => res.json(books))
    .catch((error) => res.status(400).send({ error }));
});

bookRouter.get("/books/:id", isValidJwt, async (req, res) => {
  const id = req.params.id;
  await getBookById(id)
    .then((book) => res.json(book))
    .catch((error) => res.status(404).send({ error }));
});

bookRouter.delete("/books/:id", isValidJwt, async (req, res) => {
  const id = req.params.id;
  await deleteBookById(id)
    .then((result) => res.json(result))
    .catch((error) => res.status(400).send({ error }));
});

module.exports = bookRouter;
