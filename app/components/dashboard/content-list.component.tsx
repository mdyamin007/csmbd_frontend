import { useState } from "react";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { Trash } from "lucide-react";
import { useDelete, useGet } from "~/api/hooks";
import type { Content } from "~/types/data.type";
import Endpoints from "~/api/endpoints";
import { QueryKeys } from "~/constants/query-keys";
import dayjs from "dayjs";
import DeleteConfirmationModal from "../delete-confirmation-modal.component";
import { queryClient } from "~/root";

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

  const { data: content, isLoading } = useGet<Content[]>({
    url: Endpoints.contentsByUserId(userId!),
    options: {
      queryKey: [QueryKeys.getContents, userId],
      enabled: !!userId,
    },
  });

  const { mutate: deleteContent, isPending: isDeleting } = useDelete({
    url: Endpoints.contentsById(deletingContentId!),
    options: {
      onSuccess: () => {
        toast.success("Content deleted successfully");
        queryClient.invalidateQueries({ queryKey: [QueryKeys.getContents] });
        setIsDeleteModalOpen(false);
      },
    },
  });

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

  const handleDeleteContent = async (id: string) => {
    setDeletingContentId(id);
    setIsDeleteModalOpen(true);
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
                    src={
                      "https://www.youtube.com/embed/" +
                      item?.youtubeLink?.split("=")[1]
                    }
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
    </>
  );
}
