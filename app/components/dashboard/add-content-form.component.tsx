import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { toast } from "sonner";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { ContentSchema } from "~/validations/content.validation";
import { usePost } from "~/api/hooks";
import Endpoints from "~/api/endpoints";
import { errorResponseHandler } from "~/lib/utils";
import type { ContentReqType } from "~/types/request.type";
import { queryClient } from "~/root";
import { QueryKeys } from "~/constants/query-keys";

export default function AddContentForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { mutate: addContent, isPending } = usePost<ContentReqType>({
    url: Endpoints.contents(),
    options: {
      onSuccess: () => {
        toast.success("Content added successfully");
        queryClient.invalidateQueries({ queryKey: [QueryKeys.getContents] });
      },
      onError: errorResponseHandler,
    },
  });

  const handleAddContent = async (values: any, { resetForm }: any) => {
    setIsSubmitting(true);
    try {
      addContent(values);

      // Reset form after successful submission
      resetForm();
    } catch (error: any) {
      toast("Error adding content");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={{
        title: "",
        description: "",
        youtubeLink: "",
      }}
      validationSchema={ContentSchema}
      onSubmit={handleAddContent}
    >
      {() => (
        <Form className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Field
              as={Input}
              id="title"
              name="title"
              placeholder="Content title"
            />
            <ErrorMessage
              name="title"
              component="div"
              className="text-sm text-destructive"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Field
              as={Textarea}
              id="description"
              name="description"
              placeholder="Describe your content"
              rows={4}
            />
            <ErrorMessage
              name="description"
              component="div"
              className="text-sm text-destructive"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="youtubeLink">YouTube URL</Label>
            <Field
              as={Input}
              id="youtubeLink"
              name="youtubeLink"
              placeholder="https://youtube.com/watch?v=..."
            />
            <ErrorMessage
              name="youtubeLink"
              component="div"
              className="text-sm text-destructive"
            />
            <p className="text-xs text-muted-foreground">
              Enter a valid YouTube video URL (e.g.,
              https://youtube.com/watch?v=abcdefghijk or
              https://youtu.be/abcdefghijk)
            </p>
          </div>

          <Button type="submit" disabled={isSubmitting || isPending}>
            {isSubmitting || isPending ? "Adding..." : "Add Content"}
          </Button>
        </Form>
      )}
    </Formik>
  );
}
