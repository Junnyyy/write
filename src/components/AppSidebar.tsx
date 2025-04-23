"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import { getDocumentTitles } from "@/lib/db";
import { useState, useEffect } from "react";
import { MoreHorizontal } from "lucide-react";
export function AppSidebar() {
  const [documents, setDocuments] = useState<{ id: string; title: string }[]>(
    []
  );

  useEffect(() => {
    const fetchDocuments = async () => {
      const documents = await getDocumentTitles();
      setDocuments(documents);
    };
    fetchDocuments();
  }, []);

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>
            <h1>Writings</h1>
          </SidebarGroupLabel>
          <SidebarMenu>
            {documents.map((document) => (
              <SidebarMenuItem key={document.id}>
                <SidebarMenuButton>{document.title}</SidebarMenuButton>
                <SidebarMenuAction>
                  <MoreHorizontal />
                </SidebarMenuAction>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
