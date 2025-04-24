import { create } from "zustand";

type EditorStore = {
  documentId: string | null;
  setDocumentId: (documentId: string) => void;
  clearDocumentId: () => void;
};

const useEditorStore = create<EditorStore>((set) => ({
  documentId: null,
  setDocumentId: (documentId) => set({ documentId }),
  clearDocumentId: () => set({ documentId: null }),
}));

export { useEditorStore };
