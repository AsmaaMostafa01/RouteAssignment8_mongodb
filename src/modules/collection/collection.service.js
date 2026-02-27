import { db } from "../../DB/connection.db.js";

//1-
export const createBooksCollection = async () => {
  const books = await db.createCollection("books", {
    validator: {
      $jsonSchema: {
        bsonType: "object",
        required: ["title"],
        properties: {
          title: {
            bsonType: "string",
            description: "title must be a non-empty string",
          },
        },
      },
    },
  });
  return { ok: 1 };
};

//2-
export const createAuthorsCollection = async (inputs) => {
  //const { name, nationality } = inputs;

  const result = await db.collection("authors").insertOne(inputs);

  return result;
};

//3-
export const createLogsCollection = async (inputs) => {
  const result = await db.createCollection("logs", {
    capped: true,
    size: 1048576,
  });

  return { ok: 1 };
};

// 4. Create index on books title
export const createBooksIndex = async () => {
  const indexName = await db.collection("books").createIndex({ title: 1 });
  return indexName;
};
