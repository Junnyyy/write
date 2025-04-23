"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import { getDocumentTitles } from "@/lib/db";
import { useState, useEffect } from "react";
import { MoreHorizontal } from "lucide-react";
import { useEditorStore } from "@/store/useEditorStore";

export function AppSidebar() {
  const [documents, setDocuments] = useState<{ id: string; title: string }[]>(
    []
  );
  const { lastSaved } = useEditorStore();

  useEffect(() => {
    const fetchDocuments = async () => {
      const documents = await getDocumentTitles();
      setDocuments(documents);
    };
    fetchDocuments();
  }, [lastSaved]);

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
