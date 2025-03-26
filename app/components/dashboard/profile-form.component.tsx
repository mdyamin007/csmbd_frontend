"use client";

import { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";

const ProfileSchema = Yup.object().shape({
  name: Yup.string()
    .required("Name is required")
    .min(2, "Name must be at least 2 characters"),
  bio: Yup.string().max(500, "Bio must be less than 500 characters"),
  website: Yup.string().url("Must be a valid URL"),
});

interface ProfileFormProps {
  userId: string;
}

const profile = {
  name: "John Doe",
  bio: "I'm a software developer",
  website: "https://example.com",
};

export default function ProfileForm() {
  const [loading, setLoading] = useState(false);

  if (loading) {
    return <div>Loading profile...</div>;
  }

  if (!profile) {
    return <div>Profile not found</div>;
  }

  return (
    <Formik
      initialValues={{
        name: profile.name || "",
        bio: profile.bio || "",
        website: profile.website || "",
      }}
      validationSchema={ProfileSchema}
      onSubmit={() => {}}
      enableReinitialize
    >
      {({ isSubmitting }) => (
        <Form className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Field as={Input} id="name" name="name" placeholder="Your name" />
            <ErrorMessage
              name="name"
              component="div"
              className="text-sm text-destructive"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <Field
              as={Textarea}
              id="bio"
              name="bio"
              placeholder="Tell us about yourself"
              rows={4}
            />
            <ErrorMessage
              name="bio"
              component="div"
              className="text-sm text-destructive"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="website">Website</Label>
            <Field
              as={Input}
              id="website"
              name="website"
              placeholder="https://example.com"
            />
            <ErrorMessage
              name="website"
              component="div"
              className="text-sm text-destructive"
            />
          </div>

          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : "Save Changes"}
          </Button>
        </Form>
      )}
    </Formik>
  );
}
