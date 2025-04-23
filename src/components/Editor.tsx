"use client";

import { EditorContent, EditorRoot, JSONContent } from "novel";
import { useCallback, useEffect, useState } from "react";
import { defaultExtensions } from "@/lib/extensions";
import { useEditorStore } from "@/store/useEditorStore";
import { nanoid } from "nanoid";
import debounce from "lodash.debounce";
import { getDocument, saveDocument } from "@/lib/db";

const extensions = [...defaultExtensions];

const MIN_WORDS = 5;

const Editor = () => {
  const { documentId, setDocumentId } = useEditorStore();
  const [initialContent, setInitialContent] = useState<JSONContent | undefined>(
    undefined
  );
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const loadDocument = async () => {
      if (documentId) {
        const doc = await getDocument(documentId);

        if (doc) {
          setInitialContent(doc.content);
          setIsLoaded(true);
          return;
        }
      }

      setIsLoaded(true);
    };

    loadDocument();
  }, [documentId]);

  const debouncedSave = useCallback(
    debounce((json: JSONContent) => {
      if (!documentId) {
        return;
      }

      saveDocument(documentId, json, Date.now());
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

  if (!isLoaded) {
    return <div className="h-full">Loading...</div>;
  }

  return (
    <div className="h-full">
      <EditorRoot>
        <EditorContent
          className="h-full"
          extensions={extensions}
          initialContent={initialContent}
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
