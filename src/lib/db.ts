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

export type { Document };
export { db };
