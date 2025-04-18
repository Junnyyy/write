"use client";

import { EditorContent, EditorRoot, JSONContent } from "novel";
import { useState } from "react";
import { defaultExtensions } from "@/lib/extensions";

const extensions = [...defaultExtensions];

const Editor = () => {
  const [content, setContent] = useState<JSONContent | null>(null);

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
