import { useEffect, useState } from "react";
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

interface ContentListProps {
  userId?: string;
  isOwner?: boolean;
}

const mockContentData = [
  {
    id: "1",
    title: "Sample Video 1",
    description: "This is a description for the first video.",
    youtube_id: "dQw4w9WgXcQ",
    created_at: "2024-03-20T10:00:00Z",
  },
  {
    id: "2",
    title: "Sample Video 2",
    description: "This is a description for the second video.",
    youtube_id: "oHg5SJYRHA0",
    created_at: "2024-03-21T12:00:00Z",
  },
  {
    id: "3",
    title: "Sample Video 3",
    description: "",
    youtube_id: "KJQIQtnQF6Y",
    created_at: "2024-03-22T14:00:00Z",
  },
];

export default function ContentList({ isOwner = false }: ContentListProps) {
  const [content, setContent] = useState<any[]>(mockContentData); // Set mock data here
  const [loading, setLoading] = useState(false);

  const handleDeleteContent = async (contentId: string) => {
    try {
      // Simulate a delete operation on mock data
      setContent(content.filter((item) => item.id !== contentId));

      toast("Content deleted");
    } catch (error: any) {
      toast("An error occurred");
    }
  };

  if (loading) {
    return <div>Loading content...</div>;
  }

  if (content.length === 0) {
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

  return (
    <div className="grid grid-cols-1 gap-6">
      {content.map((item) => (
        <Card key={item.id}>
          <CardHeader>
            <CardTitle>{item.title}</CardTitle>
            <CardDescription>
              Added on {new Date(item.created_at).toLocaleDateString()}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {item.description && (
              <p className="mb-4 text-muted-foreground">{item.description}</p>
            )}
            <div className="aspect-video w-full overflow-hidden rounded-md">
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${item.youtube_id}`}
                title={item.title}
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
                onClick={() => handleDeleteContent(item.id)}
              >
                <Trash className="h-4 w-4 mr-2" />
                Delete
              </Button>
            </CardFooter>
          )}
        </Card>
      ))}
    </div>
  );
}
