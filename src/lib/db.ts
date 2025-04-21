import Dexie, { type EntityTable } from "dexie";
import type { JSONContent } from "novel";

interface Document {
  id: string;
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

const saveDocument = async (document: Document) => {
  await db.documents.put(document);
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

export type { Document };
export { db, saveDocument, getDocument, deleteDocument, getAllDocuments };
