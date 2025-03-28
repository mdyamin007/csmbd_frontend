import { useState } from "react";
import { toast } from "sonner";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Pencil, Trash } from "lucide-react";
import { useDelete, useGet, usePut } from "~/api/hooks";
import type { Content } from "~/types/data.type";
import Endpoints from "~/api/endpoints";
import { QueryKeys } from "~/constants/query-keys";
import dayjs from "dayjs";
import DeleteConfirmationModal from "../delete-confirmation-modal.component";
import { queryClient } from "~/root";
import { Button } from "../ui/button";
import EditContentModal from "./edit-content-modal.component";
import type { ContentReqType } from "~/types/request.type";
import { errorResponseHandler } from "~/lib/utils";

interface ContentListProps {
  userId?: string;
  isOwner?: boolean;
}

export default function ContentList({
  userId,
  isOwner = false,
}: ContentListProps) {
  const [deletingContentId, setDeletingContentId] = useState<string | null>(
    null
  );
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingContent, setEditingContent] = useState<Content | null>(null);

  const { data: content, isLoading } = useGet<Content[]>({
    url: Endpoints.contentsByUserId(userId!),
    options: {
      queryKey: [QueryKeys.getContents],
      enabled: !!userId,
    },
  });

  const { mutate: deleteContent, isPending: isDeleting } = useDelete({
    url: Endpoints.contentById(deletingContentId!),
    options: {
      onSuccess: () => {
        toast.success("Content deleted successfully");
        queryClient.invalidateQueries({ queryKey: [QueryKeys.getContents] });
        setIsDeleteModalOpen(false);
      },
    },
  });

  const { mutate: updateContent, isPending: isUpdating } =
    usePut<ContentReqType>({
      url: content ? Endpoints.contentById(editingContent?.id!) : "",
      options: {
        onSuccess: () => {
          toast.success("Content updated successfully");
          queryClient.invalidateQueries({
            queryKey: [QueryKeys.getContents],
          });
          setIsEditModalOpen(false);
        },
        onError: errorResponseHandler,
      },
    });

  const handleDeleteContent = (id: string) => {
    setDeletingContentId(id);
    setIsDeleteModalOpen(true);
  };

  const handleEditContent = (data: Content) => {
    setIsEditModalOpen(true);
    setEditingContent(data);
  };

  const onEditSubmit = (values: ContentReqType) => {
    if (content) {
      updateContent(values);
    }
  };

  if (isLoading) {
    return <div>Loading content...</div>;
  }

  if (content?.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-muted-foreground">No content found</p>
        {isOwner && (
          <p className="mt-2">
            Add your first content by clicking on the "Add Content" tab.
          </p>
        )}
      </div>
    );
  }

  const handleGenerateEmbedLink = (youtubeUrl: string) => {
    const videoIdMatch = youtubeUrl.match(
      /(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/
    );
    const videoId = videoIdMatch ? videoIdMatch[1] : null;
    return `https://www.youtube.com/embed/${videoId}`;
  };

  return (
    <>
      <div className="grid grid-cols-1 gap-6">
        {content &&
          content.map((item) => (
            <Card key={item.id}>
              <CardHeader>
                <CardTitle>{item?.title}</CardTitle>
                <CardDescription>
                  Added on {dayjs(item?.createdAt).format("DD/MM/YYYY")}
                </CardDescription>
                {isOwner && (
                  <CardAction>
                    <Button
                      variant="outline"
                      size="sm"
                      className="cursor-pointer"
                      onClick={() => handleEditContent(item)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                  </CardAction>
                )}
              </CardHeader>
              <CardContent>
                {item?.description && (
                  <p className="mb-4 text-muted-foreground">
                    {item?.description}
                  </p>
                )}
                <div className="aspect-video w-full overflow-hidden rounded-md">
                  <iframe
                    width="100%"
                    height="100%"
                    src={handleGenerateEmbedLink(item?.youtubeLink)}
                    title={item?.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              </CardContent>
              {isOwner && (
                <CardFooter className="flex justify-end">
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDeleteContent(item.id!)}
                    className="cursor-pointer"
                  >
                    <Trash className="h-4 w-4 mr-2" />
                    Delete
                  </Button>
                </CardFooter>
              )}
            </Card>
          ))}
      </div>
      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onDelete={() => deleteContent({})}
        title={"Content"}
        loading={isDeleting}
      />
      <EditContentModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        content={editingContent}
        onSubmit={onEditSubmit}
        loading={isUpdating}
      />
    </>
  );
}
