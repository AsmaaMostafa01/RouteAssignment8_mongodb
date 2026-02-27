import { LogModel } from "../../DB/model/log.model.js";
import { ObjectId } from "mongodb";
export const insertLog = async (inputs) => {
  const logData = {
    ...inputs,
    book_id: new ObjectId(inputs.book_id),
  };
  const log = await LogModel.insertOne(logData);
  return log;
};
//7-
