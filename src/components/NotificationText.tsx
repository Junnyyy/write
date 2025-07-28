"use client";

type NotificationTextProps = {
  message: string;
  isVisible: boolean;
};

const NotificationText = ({ message, isVisible }: NotificationTextProps) => {
  return (
    <div
      className={`fixed top-4 right-4 text-sm text-muted-foreground animate-in fade-in slide-in-from-top-4 duration-1000 ${
        isVisible ? "opacity-100" : "opacity-0"
      } transition-opacity hidden sm:block`}
    >
      {message}
    </div>
  );
};

export default NotificationText;
