"use client";

import { useState, useCallback } from "react";

type NotificationOptions = {
  message: string;
  duration?: number;
};

export const useNotification = () => {
  const [message, setMessage] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  const showNotification = useCallback(
    ({ message, duration = 3000 }: NotificationOptions) => {
      setMessage(message);
      setIsVisible(true);

      const timer = setTimeout(() => {
        setIsVisible(false);
      }, duration);

      return () => clearTimeout(timer);
    },
    []
  );

  return {
    message,
    isVisible,
    showNotification,
  };
};
