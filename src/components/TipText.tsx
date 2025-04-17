"use client";

import { useEffect, useState } from "react";

const TipText = () => {
  const [isMac, setIsMac] = useState(false);

  useEffect(() => {
    setIsMac(/Mac|iPhone|iPod|iPad/.test(navigator.userAgent));
  }, []);

  return (
    <div className="fixed bottom-4 left-4 text-sm text-muted-foreground animate-in fade-in slide-in-from-bottom-4 duration-1000 hidden sm:block">
      Press {isMac ? "⌘" : "Ctrl"} + K to open command menu
    </div>
  );
};

export default TipText;
