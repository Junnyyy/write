import Dexie, { type EntityTable } from "dexie";
import type { JSONContent } from "novel";

interface Document {
  id: string;
  title: string;
  content: JSONContent;
  updatedAt: number;
}

const DB_NAME = "WriteDB";

const db = new Dexie(DB_NAME) as Dexie & {
  documents: EntityTable<Document, "id">;
};

db.version(1).stores({
  documents: "id, content, updatedAt",
});

const saveDocument = async (
  id: string,
  title: string,
  content: JSONContent,
  updatedAt: number
) => {
  await db.documents.put({
    id,
    title,
    content,
    updatedAt,
  });
};

const getDocument = async (id: string) => {
  return await db.documents.get(id);
};

const deleteDocument = async (id: string) => {
  await db.documents.delete(id);
};

const getAllDocuments = async () => {
  return await db.documents.orderBy("updatedAt").reverse().toArray();
};

const getDocumentTitles = async () => {
  return await db.documents
    .orderBy("updatedAt")
    .reverse()
    .toArray()
    .then((documents) =>
      documents.map(({ id, title }) => ({
        id,
        title: title === "" ? "Untitled" : title,
      }))
    );
};

export type { Document };
export {
  db,
  saveDocument,
  getDocument,
  deleteDocument,
  getAllDocuments,
  getDocumentTitles,
};
