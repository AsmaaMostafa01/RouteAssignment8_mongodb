import { Router } from "express";
import {
  aggregateFilterAndSort,
  logsWithBookDetails,
  aggregateProjectFields,
  aggregateUnwindGenres,
  deleteBooksByYear,
  findBookByGenre,
  findBookByTitle,
  findBookByYear,
  findBooksByPagination,
  findBooksExcludeGenres,
  findBooksIfYearInteger,
  insertBook,
  insertBooks,
  updateBook,
} from "./book.service.js";
const router = Router();

router.post("/", async (req, res, next) => {
  const result = await insertBook(req.body);
  res.status(201).json(result);
});

router.post("/batch", async (req, res, next) => {
  const result = await insertBooks(req.body);
  res.status(201).json(result);
});

router.patch("/future", async (req, res, next) => {
  const result = await updateBook();
  res.status(200).json(result);
});

router.get("/title", async (req, res, next) => {
  const result = await findBookByTitle(req.query);
  res.status(200).json({ message: "Done", result });
});

router.get("/year", async (req, res, next) => {
  const result = await findBookByYear(req.query);
  res.status(200).json({ message: "Done", result });
});

router.get("/genre", async (req, res, next) => {
  const result = await findBookByGenre(req.query);
  res.status(200).json({ message: "Done", result });
});

router.get("/skip-limit", async (req, res, next) => {
  const result = await findBooksByPagination();
  res.status(200).json({ message: "Done", result });
});

router.get("/year-integer", async (req, res, next) => {
  const result = await findBooksIfYearInteger();
  res.status(200).json({ message: "Done", result });
});

router.get("/exclude-genres", async (req, res, next) => {
  const result = await findBooksExcludeGenres();
  res.status(200).json({ message: "Done", result });
});

router.delete("/before-year", async (req, res, next) => {
  const result = await deleteBooksByYear(req.query);
  res.status(200).json({ message: "Done", result });
});

router.get("/aggregate1", async (req, res, next) => {
  const result = await aggregateFilterAndSort();
  res.status(200).json({ message: "Done", result });
});

router.get("/aggregate2", async (req, res, next) => {
  const result = await aggregateProjectFields();
  res.status(200).json({ message: "Done", result });
});

router.get("/aggregate3", async (req, res, next) => {
  const result = await aggregateUnwindGenres();
  res.status(200).json({ message: "Done", result });
});

router.get("/aggregate4", async (req, res, next) => {
  const result = await logsWithBookDetails();
  res.status(200).json({ message: "Done", result });
});

export default router;
