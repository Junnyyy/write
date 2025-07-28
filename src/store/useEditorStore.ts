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
  isSaving: boolean;
  setSaving: (saving: boolean) => void;
};

const useEditorStore = create<EditorStore>((set, get) => ({
  documentId: null,
  jsonContent: null,
  textContent: null,
  isSaving: false,
  setDocumentId: (documentId) => set({ documentId }),
  clearDocumentId: () =>
    set({ documentId: null, jsonContent: null, textContent: null }),
  setEditorContent: (json, text) =>
    set({ jsonContent: json, textContent: text }),
  setSaving: (saving) => set({ isSaving: saving }),
  saveCurrentDocument: async () => {
    const { documentId, jsonContent, textContent, isSaving } = get();

    if (isSaving) {
      return false;
    }

    if (!documentId) {
      return false;
    }

    if (!jsonContent) {
      return false;
    }

    set({ isSaving: true });

    const title = calculateTitle(textContent);

    try {
      await saveDocument(documentId, title, jsonContent, Date.now());
      set({ isSaving: false });
      return true;
    } catch (error) {
      set({ isSaving: false });
      return false;
    }
  },
}));

export { useEditorStore };
