"use client";

import { EditorContent, EditorRoot, JSONContent } from "novel";
import { useCallback, useEffect, useState } from "react";
import { defaultExtensions } from "@/lib/extensions";
import { useEditorStore } from "@/store/useEditorStore";
import { nanoid } from "nanoid";
import debounce from "lodash.debounce";
import { getDocument, saveDocument } from "@/lib/db";
import { useNotificationContext } from "@/components/NotificationProvider";

import { Skeleton } from "@/components/ui/skeleton";

const extensions = [...defaultExtensions];

const MIN_WORDS = 5;
const DEBOUNCE_TIME = 1000;

const Editor = () => {
  const { documentId, setDocumentId } = useEditorStore();
  const { showNotification } = useNotificationContext();
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
      showNotification({ message: "Saved just now" });
    }, DEBOUNCE_TIME),
    [documentId, showNotification]
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
    return (
      <div className="h-full flex flex-col space-y-4 p-4">
        <Skeleton className="h-8 w-3/4" />
        <Skeleton className="h-8 w-1/2" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-4/5" />
        <Skeleton className="h-4 w-2/3" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </div>
    );
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
