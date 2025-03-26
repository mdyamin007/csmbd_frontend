"use client";

import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "sonner";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";

const ContentSchema = Yup.object().shape({
  title: Yup.string()
    .required("Title is required")
    .min(3, "Title must be at least 3 characters")
    .max(100, "Title must be less than 100 characters"),
  description: Yup.string().max(
    500,
    "Description must be less than 500 characters"
  ),
  youtube_url: Yup.string()
    .required("YouTube URL is required")
    .matches(
      /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})$/,
      "Must be a valid YouTube URL"
    ),
});

interface AddContentFormProps {
  userId: string;
}

export default function AddContentForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAddContent = async (values: any, { resetForm }: any) => {
    setIsSubmitting(true);
    try {
      // Extract YouTube video ID from URL
      const youtubeUrl = values.youtube_url;
      const videoIdMatch = youtubeUrl.match(
        /(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/
      );
      const videoId = videoIdMatch ? videoIdMatch[1] : null;

      if (!videoId) {
        throw new Error("Invalid YouTube URL");
      }

      toast("Content added successfully");

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
        youtube_url: "",
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
            <Label htmlFor="youtube_url">YouTube URL</Label>
            <Field
              as={Input}
              id="youtube_url"
              name="youtube_url"
              placeholder="https://youtube.com/watch?v=..."
            />
            <ErrorMessage
              name="youtube_url"
              component="div"
              className="text-sm text-destructive"
            />
            <p className="text-xs text-muted-foreground">
              Enter a valid YouTube video URL (e.g.,
              https://youtube.com/watch?v=abcdefghijk or
              https://youtu.be/abcdefghijk)
            </p>
          </div>

          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Adding..." : "Add Content"}
          </Button>
        </Form>
      )}
    </Formik>
  );
}
