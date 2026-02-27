import { MongoClient } from "mongodb";
import { DB_NAME, DB_URI } from "../../config/config.service.js";

//open connection
const client = new MongoClient(DB_URI, { serverSelectionTimeoutMS: 5000 });
//use database
export const db = client.db(DB_NAME);
//test connection
export const authenticateDB = async () => {
  try {
    await client.connect();
    console.log(`conncted to DB successfully`);
  } catch (error) {
    console.log(`fail to connect on DB ${error}`);
  }
};
