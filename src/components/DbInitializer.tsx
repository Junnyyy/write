"use client";

import { useEffect } from "react";
import { initializeDatabase } from "@/lib/init-db";
import { useEditorStore } from "@/store/useEditorStore";

export const DbInitializer = () => {
  const { setDocumentId } = useEditorStore();

  useEffect(() => {
    const initialize = async () => {
      const { isFirstTime, welcomeDocId } = await initializeDatabase();
      
      if (isFirstTime && welcomeDocId) {
        setDocumentId(welcomeDocId);
      }
    };
    
    initialize();
  }, [setDocumentId]);

  return null;
};