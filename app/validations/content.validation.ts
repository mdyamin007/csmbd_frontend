import * as Yup from "yup";

export const ContentSchema = Yup.object().shape({
  title: Yup.string()
    .required("Title is required")
    .min(3, "Title must be at least 3 characters")
    .max(100, "Title must be less than 100 characters"),
  description: Yup.string().max(
    500,
    "Description must be less than 500 characters"
  ),
  youtubeLink: Yup.string()
    .required("YouTube URL is required")
    .matches(
      /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})$/,
      "Must be a valid YouTube URL"
    ),
});
