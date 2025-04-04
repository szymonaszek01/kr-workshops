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

const getBookById = async (id) => {
  const book = await Book.findById(id);
  if (!book) {
    throw `Book (${id}) not found`;
  }
  return book;
};

const deleteBookById = async (id) => {
  try {
    const {deletedCount} = await Book.deleteOne( { _id: id } );
    return deletedCount ? `Book (${id}) was deleted successfully` : `Book (${id}) not found`;
 } catch (e) {
    throw `Something went wrong: ${e}`;
 }
};

module.exports = {
  getAllBooks,
  getBookById,
  deleteBookById
};
