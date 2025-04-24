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

import { MoreHorizontal } from "lucide-react";
import { useDocumentTitles } from "@/hooks/useDocumentTitles";
import { useEditorStore } from "@/store/useEditorStore";

import dynamic from "next/dynamic";

const SidebarMenuSkeleton = dynamic(
  () =>
    import("@/components/ui/sidebar").then((mod) => mod.SidebarMenuSkeleton),
  {
    ssr: false,
  }
);

const NavProjectsSkeleton = () => {
  return (
    <SidebarMenu>
      {Array.from({ length: 5 }).map((_, index) => (
        <SidebarMenuItem key={index}>
          <SidebarMenuSkeleton className="animate-in fade-in slide-in-from-bottom-4 duration-1000" />
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
};

const WritingList = () => {
  const documents = useDocumentTitles();
  const { setDocumentId } = useEditorStore();
  if (!documents) {
    return <NavProjectsSkeleton />;
  }

  return (
    <SidebarMenu className="animate-in fade-in slide-in-from-bottom-4 duration-1000">
      {documents.map((document) => (
        <SidebarMenuItem
          key={document.id}
          onClick={() => {
            console.log("setting document id", document.id);
            setDocumentId(document.id);
          }}
        >
          <SidebarMenuButton>{document.title}</SidebarMenuButton>
          <SidebarMenuAction>
            <MoreHorizontal />
          </SidebarMenuAction>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
};

export function AppSidebar() {
  return (
    <Sidebar variant="inset">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>
            <h1>Writings</h1>
          </SidebarGroupLabel>
          <WritingList />
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
