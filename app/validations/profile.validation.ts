import * as Yup from "yup";

export const ProfileSchema = Yup.object().shape({
  username: Yup.string()
    .required("Name is required")
    .min(2, "Name must be at least 2 characters"),
  bio: Yup.string().max(500, "Bio must be less than 500 characters"),
  website: Yup.string().url("Must be a valid URL"),
});
