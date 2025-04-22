"use client";

import { EditorContent, EditorRoot, JSONContent } from "novel";
import { useCallback } from "react";
import { defaultExtensions } from "@/lib/extensions";
import { useEditorStore } from "@/store/useEditorStore";
import { nanoid } from "nanoid";

const extensions = [...defaultExtensions];

const MIN_WORDS = 5;

const Editor = () => {
  const { documentId, setDocumentId } = useEditorStore();

  const handleUpdate = useCallback(
    (json: JSONContent, text: string) => {
      const wordCount = text.split(" ").length;
      if (!documentId && wordCount > MIN_WORDS) {
        const newDocumentId = nanoid();
        setDocumentId(newDocumentId);
        console.log("Creating new document", newDocumentId);
      }

      if (documentId && wordCount > MIN_WORDS) {
        console.log("Saving document", documentId);
      }
    },
    [documentId, setDocumentId]
  );

  return (
    <div className="h-full">
      <EditorRoot>
        <EditorContent
          className="h-full"
          extensions={extensions}
          onUpdate={({ editor }) => {
            const json = editor.getJSON();
            const text = editor.getText();
            handleUpdate(json, text);
          }}
          editorProps={{
            attributes: {
              class:
                "prose prose md:prose-lg xl:prose-2xl mx-auto border-none font-[family-name:var(--font-lato)]",
            },
          }}
          immediatelyRender={false}
        />
      </EditorRoot>
    </div>
  );
};

export default Editor;
