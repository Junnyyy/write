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
  SidebarSeparator,
} from "@/components/ui/sidebar";

import { MoreHorizontal } from "lucide-react";
import { useDocumentTitles } from "@/hooks/useDocumentTitles";
import { useEditorStore } from "@/store/useEditorStore";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import dynamic from "next/dynamic";
import { deleteDocument } from "@/lib/db";
import { useNotificationContext } from "./NotificationProvider";
import { useState } from "react";

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

const DeleteDialog = ({
  documentId,
  open,
  onOpenChange,
}: {
  documentId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) => {
  const { showNotification } = useNotificationContext();
  const { clearDocumentId } = useEditorStore();

  const handleDelete = async () => {
    await deleteDocument(documentId);
    clearDocumentId();

    showNotification({ message: "Deleted successfully" });

    onOpenChange(false);
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            Remember, this action cannot be undone. We cannot recover your
            writing once it is deleted.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

const MenuAction = ({ documentId }: { documentId: string }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <DeleteDialog
        documentId={documentId}
        open={open}
        onOpenChange={setOpen}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <SidebarMenuAction>
            <MoreHorizontal />
          </SidebarMenuAction>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => setOpen(true)}>
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

const WritingList = () => {
  const documents = useDocumentTitles();
  const { documentId, setDocumentId } = useEditorStore();

  if (!documents) {
    return <NavProjectsSkeleton />;
  }

  return (
    <SidebarMenu className="animate-in fade-in slide-in-from-bottom-4 duration-1000">
      {documents.map((document) => (
        <SidebarMenuItem key={document.id}>
          <SidebarMenuButton
            isActive={document.id === documentId}
            onClick={() => {
              setDocumentId(document.id);
            }}
          >
            {document.title}
          </SidebarMenuButton>
          <MenuAction documentId={document.id} />
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
          <SidebarSeparator />
          <WritingList />
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
