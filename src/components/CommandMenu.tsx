"use client";

import { useState, useEffect, useCallback } from "react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandShortcut,
} from "@/components/ui/command";
import { useSidebar } from "./ui/sidebar";

import { useDevice } from "@/hooks/useDevice";
import {
  Download,
  Heart,
  MessageCircle,
  Save,
  Sidebar,
  Trash,
} from "lucide-react";
import { useEditorStore } from "@/store/useEditorStore";
import { useNotificationContext } from "@/components/NotificationProvider";
import { generateChatGPTUrl, canShareWithChatGPT } from "@/lib/chatgpt";

const CommandMenu = () => {
  const [open, setOpen] = useState(false);
  const { toggleSidebar } = useSidebar();
  const { metaKey } = useDevice();
  const { saveCurrentDocument, documentId, jsonContent, textContent } = useEditorStore();
  const { showNotification } = useNotificationContext();

  const canSave = !!documentId && !!jsonContent;
  const canShareChat = canShareWithChatGPT(textContent);

  const handleSave = useCallback(async () => {
    const success = await saveCurrentDocument();

    if (success) {
      showNotification({ message: "Saved just now" });
      setOpen(false);
      return;
    }

    if (!documentId) {
      showNotification({
        message: "Unable to save, you need 5 words first.",
      });
      return;
    }

    showNotification({ message: "Unable to save" });
  }, [saveCurrentDocument, showNotification, setOpen, documentId]);

  const handleChatGPT = useCallback(() => {
    if (!textContent) {
      showNotification({ message: "No content to share with ChatGPT" });
      return;
    }

    try {
      const chatGPTUrl = generateChatGPTUrl(textContent);
      window.open(chatGPTUrl, "_blank");
      setOpen(false);
    } catch {
      showNotification({ message: "Failed to generate ChatGPT link" });
    }
  }, [textContent, showNotification, setOpen]);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      switch (event.key) {
        case "k":
          if (event.metaKey || event.ctrlKey) {
            event.preventDefault();
            setOpen((prevOpen) => !prevOpen);
          }
          break;
        case "s":
          if (event.metaKey || event.ctrlKey) {
            event.preventDefault();
            handleSave();
          }
          break;
        default:
          break;
      }
    },
    [setOpen, handleSave]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Suggestions">
          <CommandItem
            onSelect={() => window.open("https://johnnyle.io", "_blank")}
          >
            <Heart />
            <span>Visit Johnnyle.io</span>
          </CommandItem>
          <CommandItem
            onSelect={() => {
              toggleSidebar();
              setOpen(false);
            }}
          >
            <Sidebar />
            <span>Toggle Sidebar</span>
            <CommandShortcut>{metaKey}B</CommandShortcut>
          </CommandItem>
        </CommandGroup>
        <CommandGroup heading="Actions">
          <CommandItem onSelect={handleSave} disabled={!canSave}>
            <Save />
            <span>Save</span>
            <CommandShortcut>{metaKey}S</CommandShortcut>
          </CommandItem>
          <CommandItem onSelect={handleChatGPT} disabled={!canShareChat}>
            <MessageCircle />
            <span>Chat with ChatGPT</span>
          </CommandItem>
          <CommandItem disabled>
            <Download />
            <span>Export</span>
          </CommandItem>
          <CommandItem disabled>
            <Trash />
            <span>Delete</span>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
};

export default CommandMenu;
