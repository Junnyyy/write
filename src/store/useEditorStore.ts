import { create } from "zustand";

type EditorStore = {
  documentId: string | null;
  setDocumentId: (documentId: string) => void;
  lastSaved: number;
  setLastSaved: (timestamp: number) => void;
};

const useEditorStore = create<EditorStore>((set) => ({
  documentId: null,
  setDocumentId: (documentId) => set({ documentId }),
  lastSaved: Date.now(),
  setLastSaved: (timestamp) => set({ lastSaved: timestamp }),
}));

export { useEditorStore };
