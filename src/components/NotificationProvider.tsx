"use client";

import { createContext, useContext, ReactNode } from "react";
import { useNotification } from "@/hooks/useNotification";
import NotificationText from "./NotificationText";

type NotificationContextType = {
  showNotification: (options: { message: string; duration?: number }) => void;
};

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined
);

export const useNotificationContext = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      "useNotificationContext must be used within a NotificationProvider"
    );
  }
  return context;
};

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const { message, isVisible, showNotification } = useNotification();

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}
      <NotificationText message={message} isVisible={isVisible} />
    </NotificationContext.Provider>
  );
};
