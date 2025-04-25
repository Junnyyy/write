import { useEffect } from "react";
import { useState } from "react";

const useDevice = () => {
  const [isMac, setIsMac] = useState(false);
  const [metaKey, setMetaKey] = useState("Ctrl");

  useEffect(() => {
    setIsMac(/Mac|iPhone|iPod|iPad/.test(navigator.userAgent));
  }, []);

  useEffect(() => {
    setMetaKey(isMac ? "⌘" : "Ctrl");
  }, [isMac]);

  return { isMac, metaKey };
};

export { useDevice };
