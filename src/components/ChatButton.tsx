"use client";

import { useEditorStore } from "@/store/useEditorStore";
import { useNotificationContext } from "@/components/NotificationProvider";
import { generateChatGPTUrl, canShareWithChatGPT } from "@/lib/chatgpt";

const ChatButton = () => {
  const { textContent } = useEditorStore();
  const { showNotification } = useNotificationContext();
  const canShareChat = canShareWithChatGPT(textContent);

  const handleChatGPT = () => {
    if (!textContent) {
      showNotification({ message: "No content to share with ChatGPT" });
      return;
    }

    try {
      const chatGPTUrl = generateChatGPTUrl(textContent);
      window.open(chatGPTUrl, "_blank");
    } catch {
      showNotification({ message: "Failed to generate ChatGPT link" });
    }
  };

  return (
    <button
      onClick={handleChatGPT}
      disabled={!canShareChat}
      className={`fixed bottom-8 right-8 text-sm text-muted-foreground transition-opacity ${
        canShareChat 
          ? "opacity-100 hover:text-foreground cursor-pointer" 
          : "opacity-50 cursor-not-allowed"
      }`}
    >
      Chat
    </button>
  );
};

export default ChatButton;