import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { JSONContent } from "novel";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

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
