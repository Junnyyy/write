import { db } from "@/lib/db";
import { useLiveQuery } from "dexie-react-hooks";

const useDocumentTitles = () => {
  const documentTitles = useLiveQuery<
    { id: string; title: string }[]
  >(async () => {
    const documents = await db.documents
      .orderBy("updatedAt")
      .reverse()
      .toArray();
    return documents.map(({ id, title }) => ({
      id,
      title: title === "" ? "Untitled" : title,
    }));
  }, []);

  return documentTitles;
};

export { useDocumentTitles };
