import { BookModel } from "../../DB/model/book.model.js";
import { LogModel } from "../../DB/model/log.model.js";

//5-
export const insertBook = async (inputs) => {
  const book = await BookModel.insertOne(inputs);
  return book;
};

//6-
export const insertBooks = async (inputs) => {
  const book = await BookModel.insertMany(inputs);
  return book;
};

//8-
export const updateBook = async () => {
  const book = await BookModel.updateOne(
    { title: "Future" },
    { $set: { year: 2022 } },
  );
  return book;
};

//9-
export const findBookByTitle = async (inputs) => {
  const book = await BookModel.findOne(inputs);
  if (!book) {
    throw new Error("book not found ", { cause: { status: 404 } });
  }
  return book;
};

//10-
export const findBookByYear = async (inputs) => {
  const books = await BookModel.find({
    year: { $gte: parseInt(inputs.from), $lte: parseInt(inputs.to) },
  }).toArray();
  if (!books[0]) {
    throw new Error("books not found ", { cause: { status: 404 } });
  }
  return books;
};

//11-
export const findBookByGenre = async (inputs) => {
  const { genre } = inputs;
  console.log(genre);
  const books = await BookModel.find({ genres: genre }).toArray();
  if (!books.length) {
    throw new Error("books not found ", { cause: { status: 404 } });
  }
  return books;
};

//12-
export const findBooksByPagination = async () => {
  const books = await BookModel.find()
    .skip(2)
    .limit(3)
    .sort({ year: -1 })
    .toArray();
  if (!books.length) {
    throw new Error("books not found ", { cause: { status: 404 } });
  }
  return books;
};

//13-
export const findBooksIfYearInteger = async () => {
  const books = await BookModel.find({ year: { $type: "int" } }).toArray();
  if (!books.length) {
    throw new Error("books not found ", { cause: { status: 404 } });
  }
  return books;
};

//14-
export const findBooksExcludeGenres = async () => {
  const books = await BookModel.find({
    genres: { $nin: ["Horror", "Science Fiction"] },
  }).toArray();

  if (!books.length) {
    throw new Error("books not found ", { cause: { status: 404 } });
  }
  return books;
};

//15-
export const deleteBooksByYear = async (inputs) => {
  const { year } = inputs;
  const books = await BookModel.deleteMany({ year: { $lt: parseInt(year) } });

  return books;
};

//16-
export const aggregateFilterAndSort = async () => {
  const books = await BookModel.aggregate([
    { $match: { year: { $gt: 2000 } } },
    { $sort: { year: -1 } },
  ]).toArray();
  if (!books.length) {
    throw new Error("books not found ", { cause: { status: 404 } });
  }
  return books;
};

//17-
export const aggregateProjectFields = async () => {
  const books = await BookModel.aggregate([
    { $match: { year: { $gt: 2000 } } },
    { $project: { _id: 0, title: 1, author: 1, year: 1 } },
  ]).toArray();
  if (!books.length) {
    throw new Error("books not found ", { cause: { status: 404 } });
  }
  return books;
};

//18-
export const aggregateUnwindGenres = async () => {
  const books = await BookModel.aggregate([
    { $unwind: { path: "$genres" } },
    {
      $project: {
        _id: 0,
        title: 1,
        genres: 1,
      },
    },
  ]).toArray();
  if (!books.length) {
    throw new Error("books not found ", { cause: { status: 404 } });
  }
  return books;
};

//19-
export const logsWithBookDetails = async () => {
  const result = await LogModel.aggregate([
    {
      $lookup: {
        from: "books",
        localField: "book_id",
        foreignField: "_id",
        as: "book_details",
      },
    },
    {
      $project: {
        _id: 0,
        action: 1,
        book_details: { title: 1, author: 1, year: 1 },
      },
    },
  ]).toArray();
  if (!result.length) {
    throw new Error("books not found ", { cause: { status: 404 } });
  }
  return result;
};
