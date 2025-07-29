import { db, saveDocument } from "./db";
import type { JSONContent } from "novel";

const WELCOME_DOC_ID = "welcome-guide";
const INIT_FLAG_KEY = "db-initialized";

const welcomeContent: JSONContent = {
  type: "doc",
  content: [
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: "Write whatever is on your mind. Don't worry about grammar, just write. After, click chat."
        }
      ]
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: "All the stuff here is local. We save it in your browser. Here's how you can check:"
        }
      ]
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: "1. Right-click anywhere on this page"
        }
      ]
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: "2. Click \"Inspect\" or \"Inspect Element\""
        }
      ]
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: "3. Go to the \"Application\" tab (might be under >> if hidden)"
        }
      ]
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: "4. Look for \"IndexedDB\" in the left sidebar"
        }
      ]
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: "5. Click the arrow next to \"WriteDB\" - that's where your words live"
        }
      ]
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: "Nothing leaves your computer unless you choose to share it. This is your space."
        }
      ]
    }
  ]
};

export const initializeDatabase = async () => {
  try {
    const hasBeenInitialized = localStorage.getItem(INIT_FLAG_KEY);
    
    if (!hasBeenInitialized) {
      await saveDocument(
        WELCOME_DOC_ID,
        "Write whatever is on your",
        welcomeContent,
        Date.now()
      );
      
      localStorage.setItem(INIT_FLAG_KEY, "true");
      return { isFirstTime: true, welcomeDocId: WELCOME_DOC_ID };
    }
    
    return { isFirstTime: false, welcomeDocId: null };
  } catch (error) {
    console.error("Failed to initialize database:", error);
    return { isFirstTime: false, welcomeDocId: null };
  }
};