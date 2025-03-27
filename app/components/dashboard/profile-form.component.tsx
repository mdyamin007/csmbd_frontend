import { Formik, Form, Field, ErrorMessage } from "formik";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import useUserInfo from "~/hooks/use-user-info.hook";
import { ProfileSchema } from "~/validations/profile.validation";

export default function ProfileForm() {
  const {
    user: profile,
    isLoadingUser,
    updateUser,
    isUpdating,
  } = useUserInfo();

  if (isLoadingUser) {
    return <div>Loading profile...</div>;
  }

  if (!profile) {
    return <div>Profile not found</div>;
  }

  const onSubmit = (values: any) => {
    updateUser(values);
  };

  return (
    <Formik
      initialValues={{
        username: profile.username || "",
        bio: profile.bio || "",
        website: profile.website || "",
      }}
      validationSchema={ProfileSchema}
      onSubmit={onSubmit}
      enableReinitialize
    >
      {() => (
        <Form className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="username">Name</Label>
            <Field
              as={Input}
              id="username"
              name="username"
              placeholder="Your name"
            />
            <ErrorMessage
              name="username"
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

          <Button type="submit" disabled={isUpdating}>
            {isUpdating ? "Saving..." : "Save Changes"}
          </Button>
        </Form>
      )}
    </Formik>
  );
}
