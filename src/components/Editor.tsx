"use client";

import { EditorContent, EditorRoot, JSONContent } from "novel";
import { useCallback } from "react";
import { defaultExtensions } from "@/lib/extensions";
import { useEditorStore } from "@/store/useEditorStore";
import { nanoid } from "nanoid";
import debounce from "lodash.debounce";

const extensions = [...defaultExtensions];

const MIN_WORDS = 5;

const Editor = () => {
  const { documentId, setDocumentId } = useEditorStore();

  const debouncedSave = useCallback(
    debounce((json: JSONContent) => {
      if (!documentId) {
        // console.log("no document id");
        return;
      }

      // console.log("saved document");
    }, 1000),
    [documentId]
  );

  const handleUpdate = useCallback(
    (json: JSONContent, text: string) => {
      const wordCount = text.split(" ").length;

      if (!documentId && wordCount > MIN_WORDS) {
        const newDocumentId = nanoid();
        setDocumentId(newDocumentId);
      }

      if (documentId && wordCount > MIN_WORDS) {
        debouncedSave(json);
      }
    },
    [documentId, setDocumentId, debouncedSave]
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
