const Book = require("../models/book");
const {
  updateWarehouseDetailById,
  createWarehouseDetail,
} = require("../services/warehouse-service");

const allowedParamKeys = ["title", "author", "genre"];

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

const updateBookById = async (_id, updateBookReq) => {
  const updateBookParams = {};
  for (const paramKey in updateBookReq) {
    if (allowedParamKeys.includes(paramKey)) {
      if (!updateBookReq[paramKey]) {
        throw `${paramKey} can not be null or empty`;
      }
      updateBookParams[paramKey] = updateBookReq[paramKey];
    }
  }

  try {
    const updatedBook = await Book.updateOne(
      { _id },
      { $set: updateBookParams }
    );
    await updateWarehouseDetailById(updateBookReq.warehouseDetailId, updateBookReq);
    console.log(`Book (${updatedBook}) has been updated`);
    return _id;
  } catch (e) {
    throw `Something went wrong: ${e}`;
  }
};

const createBook = async (createBookReq) => {
  const newBookParams = {};
  for (const paramKey in createBookReq) {
    if (allowedParamKeys.includes(paramKey)) {
      if (!createBookReq[paramKey]) {
        throw `${paramKey} can not be null or empty`;
      }
      newBookParams[paramKey] = createBookReq[paramKey];
    }
  }

  const book = await Book.exists({
    title: newBookParams["title"],
    author: newBookParams["author"],
  });

  if (book) {
    throw `Book with provided title (${newBookParams["title"]}) and author (${newBookParams["author"]}) already exists`;
  }

  try {
    const newBook = await Book.create(newBookParams);
    await createWarehouseDetail({
      ...createBookReq,
      bookId: newBook.id
    });
    console.log(`Book (${newBook}) has been created`);
    return newBook.id;
  } catch (e) {
    throw `Something went wrong: ${e}`;
  }
};

const deleteBookById = async (id) => {
  try {
    const { deletedCount } = await Book.deleteOne({ _id: id });
    return deletedCount
      ? `Book (${id}) was deleted successfully`
      : `Book (${id}) not found`;
  } catch (e) {
    throw `Something went wrong: ${e}`;
  }
};

module.exports = {
  getAllBooks,
  getBookById,
  updateBookById,
  createBook,
  deleteBookById,
};
