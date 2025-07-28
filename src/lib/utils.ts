import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { JSONContent } from "novel";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Extracts plain text from Tiptap/Novel JSONContent
 * @param content The JSONContent to extract text from
 * @returns The plain text string
 */
export const extractTextFromJSON = (content: JSONContent | null): string => {
  if (!content) return "";

  let text = "";

  if (content.text) {
    text += content.text;
  }

  if (content.content) {
    for (const child of content.content) {
      text += extractTextFromJSON(child);
    }
  }

  // Add space after block elements
  if (
    content.type &&
    ["paragraph", "heading", "listItem"].includes(content.type)
  ) {
    text += " ";
  }

  return text;
};

/**
 * Calculates a document title based on the first few words of its text content.
 * Defaults to "Untitled" if text is empty or null.
 * @param text The text content of the document.
 * @returns The calculated title string.
 */
export const calculateTitle = (text: string | null): string => {
  if (!text) {
    return "Untitled";
  }
  const words = text.split(" ").filter((word) => word.length > 0);
  if (words.length < 1) {
    return "Untitled";
  }
  return words.slice(0, 5).join(" ");
};
