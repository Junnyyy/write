import type { Metadata } from "next";
import { Lato } from "next/font/google";
import "./globals.css";
import "./prosemirror.css";
import CommandMenu from "@/components/CommandMenu";
import TipText from "@/components/TipText";

import { NotificationProvider } from "@/components/NotificationProvider";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";

const lato = Lato({
  variable: "--font-lato",
  subsets: ["latin"],
  weight: ["100", "300", "400", "700", "900"],
});

export const metadata: Metadata = {
  title: "Write",
  description: "A simple, beautiful, and powerful place to speak your mind.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${lato.variable} antialiased`}>
        <NotificationProvider>
          <SidebarProvider>
            <AppSidebar />
            <CommandMenu />
            <TipText />
            <main className="w-full h-full block">
              <SidebarTrigger />
              {children}
            </main>
          </SidebarProvider>
        </NotificationProvider>
      </body>
    </html>
  );
}
