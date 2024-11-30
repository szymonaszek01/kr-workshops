const Book = require("../models/book");

const allowedParamKeys = ["title", "author", "genre", "read"];

const getAllBooks = async (params) => {
  const query = {};
  for (const paramKey in params) {
    if (allowedParamKeys.includes(paramKey)) {
      query[paramKey] = params[paramKey];
    }
  }

  if (Object.values(params).length > 0 && Object.values(query).length < 1) {
    return [];
  }

  return await Book.find(query);
};

const getBookById = async () => {
  const book = await Book.findById(id);
  if (!book) {
    throw `Book (${id}) not found`;
  }
  return book;
};

module.exports = {
  getAllBooks,
  getBookById,
};
