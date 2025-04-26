import { saveDocument } from "@/lib/db";
import { calculateTitle } from "@/lib/utils";
import { JSONContent } from "novel";
import { create } from "zustand";

type EditorStore = {
  documentId: string | null;
  setDocumentId: (documentId: string) => void;
  clearDocumentId: () => void;
  jsonContent: JSONContent | null;
  textContent: string | null;
  setEditorContent: (json: JSONContent | null, text: string | null) => void;
  saveCurrentDocument: () => Promise<boolean>;
};

const useEditorStore = create<EditorStore>((set, get) => ({
  documentId: null,
  jsonContent: null,
  textContent: null,
  setDocumentId: (documentId) => set({ documentId }),
  clearDocumentId: () =>
    set({ documentId: null, jsonContent: null, textContent: null }),
  setEditorContent: (json, text) =>
    set({ jsonContent: json, textContent: text }),
  saveCurrentDocument: async () => {
    const { documentId, jsonContent, textContent } = get();

    if (!documentId) {
      return false;
    }

    if (!jsonContent) {
      return false;
    }

    const title = calculateTitle(textContent);

    try {
      await saveDocument(documentId, title, jsonContent, Date.now());
      return true;
    } catch (error) {
      return false;
    }
  },
}));

export { useEditorStore };
