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

import { useDevice } from "@/hooks/useDevice";
import { Download, Heart, MessageCircle, Save, Trash } from "lucide-react";

const CommandMenu = () => {
  const [open, setOpen] = useState(false);
  const { metaKey } = useDevice();

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      switch (event.key) {
        case "k":
          if (event.metaKey || event.ctrlKey) {
            event.preventDefault();
            setOpen((prevOpen) => !prevOpen);
          }
          break;
        case "?":
          event.preventDefault();
          setOpen((prevOpen) => !prevOpen);
          break;
        case "/":
          event.preventDefault();
          setOpen((prevOpen) => !prevOpen);
          break;
        default:
          break;
      }
    },
    [setOpen]
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
        <CommandGroup heading="Actions">
          <CommandItem disabled>
            <Save />
            <span>Save</span>
            <CommandShortcut>{metaKey}S</CommandShortcut>
          </CommandItem>
          <CommandItem disabled>
            <MessageCircle />
            <span>Chat</span>
            <CommandShortcut>{metaKey}C</CommandShortcut>
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
        <CommandGroup heading="Other">
          <CommandItem
            onSelect={() => window.open("https://johnnyle.io", "_blank")}
          >
            <Heart />
            <span>Visit Johnnyle.io</span>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
};

export default CommandMenu;
