import { Router } from "express";
import {
  createAuthorsCollection,
  createBooksCollection,
  createBooksIndex,
  createLogsCollection,
} from "./collection.service.js";
const router = Router();

router.post("/books", async (req, res, next) => {
  const result = await createBooksCollection();
  res.status(201).json(result);
});

router.post("/authors", async (req, res, next) => {
  const result = await createAuthorsCollection(req.body);
  res.status(201).json({ message: "Done", result });
});

router.post("/logs/capped", async (req, res, next) => {
  const result = await createLogsCollection();
  res.status(201).json(result);
});

router.post("/books/index", async (req, res, next) => {
  const result = await createBooksIndex();
  res.status(200).json(result);
});
export default router;
