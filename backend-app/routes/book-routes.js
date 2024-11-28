const express = require('express');
const router = express.Router();

router.get('/books', (req, res) => {
  res.send({ response: 'List of books' });
});

router.get('/books/:id', (req, res) => {
  const bookId = req.params.id;
  res.send({ response: `Details of book ${bookId}` });
});

router.post('/books', (req, res) => {
  res.send({ response: 'Create a new book' });
});

router.put('/books/:id', (req, res) => {
  const bookId = req.params.id;
  res.send({ response: `Update book ${bookId}` });
});

router.delete('/books/:id', (req, res) => {
  const bookId = req.params.id;
  res.send({ response: `Delete book ${bookId}` });
});

module.exports = router;
