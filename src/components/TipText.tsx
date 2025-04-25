"use client";

import { useEffect, useState } from "react";
import { useSidebar } from "@/components/ui/sidebar";

const TipText = () => {
  const [isMac, setIsMac] = useState(false);
  const { open } = useSidebar();

  useEffect(() => {
    setIsMac(/Mac|iPhone|iPod|iPad/.test(navigator.userAgent));
  }, []);

  if (open) {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-4 text-sm text-muted-foreground animate-in fade-in slide-in-from-bottom-4 duration-1000 hidden sm:block">
      Press{" "}
      <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
        {isMac ? "⌘" : "Ctrl"} K
      </kbd>{" "}
      to open command menu
    </div>
  );
};

export default TipText;
