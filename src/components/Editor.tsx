"use client";

import { useNotificationContext } from "@/components/NotificationProvider";
import { getDocument, saveDocument } from "@/lib/db";
import { defaultExtensions } from "@/lib/extensions";
import { useEditorStore } from "@/store/useEditorStore";
import debounce from "lodash.debounce";
import { nanoid } from "nanoid";
import { EditorContent, EditorRoot, JSONContent } from "novel";
import { useCallback, useEffect, useRef, useState } from "react";

import { Skeleton } from "@/components/ui/skeleton";
import { calculateTitle } from "@/lib/utils";

const extensions = [...defaultExtensions];

const MIN_WORDS = 4;
const DEBOUNCE_TIME = 1000;

const Editor = () => {
  const { documentId, setDocumentId, setEditorContent, isSaving, setSaving } = useEditorStore();
  const { showNotification } = useNotificationContext();
  const [initialContent, setInitialContent] = useState<JSONContent | undefined>(
    undefined
  );
  const [isLoaded, setIsLoaded] = useState(false);
  const isNewDocument = useRef(false);

  useEffect(() => {
    const loadDocument = async () => {
      if (isNewDocument.current) {
        setIsLoaded(true);

        isNewDocument.current = false;

        return;
      }

      if (documentId) {
        const doc = await getDocument(documentId);

        if (doc) {
          setInitialContent(doc.content);
          setIsLoaded(true);
          return;
        }
      }

      if (!documentId) {
        setEditorContent(null, null);
        setIsLoaded(true);
        return;
      }

      setIsLoaded(true);
    };

    setIsLoaded(false);
    loadDocument();
  }, [documentId, setEditorContent]);

  const debouncedSave = useCallback(
    debounce(async (json: JSONContent, title: string, currentDocumentId: string) => {
      if (!currentDocumentId || isSaving) {
        return;
      }

      setSaving(true);
      
      try {
        await saveDocument(currentDocumentId, title, json, Date.now());
        showNotification({ message: "Saved just now" });
      } catch (error) {
        console.error("Failed to save document:", error);
        showNotification({ message: "Failed to save" });
      } finally {
        setSaving(false);
      }
    }, DEBOUNCE_TIME),
    [isSaving, setSaving, showNotification]
  );

  useEffect(() => {
    return () => {
      debouncedSave.cancel();
    };
  }, [debouncedSave]);

  const handleUpdate = useCallback(
    (json: JSONContent, text: string) => {
      const words = text.split(" ").filter((word) => word.length > 0);
      const wordCount = words.length;
      let currentDocumentId = documentId;

      if (!currentDocumentId && wordCount > MIN_WORDS) {
        const newDocumentId = nanoid();
        isNewDocument.current = true;
        setDocumentId(newDocumentId);
        currentDocumentId = newDocumentId;
      }

      setEditorContent(json, text);

      if (currentDocumentId) {
        const title = calculateTitle(text);

        debouncedSave(json, title, currentDocumentId);
      }
    },
    [documentId, setDocumentId, debouncedSave, setEditorContent]
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
