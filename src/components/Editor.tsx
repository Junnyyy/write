"use client";

import { EditorContent, EditorRoot, JSONContent } from "novel";
import { useState } from "react";
import { defaultExtensions } from "@/lib/extensions";

const extensions = [...defaultExtensions];

const defaultContent = {
  type: "doc",
  content: [
    {
      type: "paragraph",
      content: [{ type: "text", text: "What's on your mind?" }],
    },
  ],
};

const Editor = () => {
  const [content, setContent] = useState<JSONContent | null>(defaultContent);

  return (
    <div className="h-full">
      <EditorRoot>
        <EditorContent
          className="h-full"
          extensions={extensions}
          initialContent={content || undefined}
          onUpdate={({ editor }) => {
            const json = editor.getJSON();
            console.log("Editor", json);
            setContent(json);
          }}
          editorProps={{
            attributes: {
              class:
                "prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto border-none font-[family-name:var(--font-noto-sans)]",
            },
          }}
        />
      </EditorRoot>
    </div>
  );
};

export default Editor;
