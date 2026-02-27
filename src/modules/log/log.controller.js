import { Router } from "express";
import { insertLog } from "./log.service.js";

const router = Router();

router.post("/", async (req, res, next) => {
  const result = await insertLog(req.body);
  res.status(201).json(result);
});
export default router;
