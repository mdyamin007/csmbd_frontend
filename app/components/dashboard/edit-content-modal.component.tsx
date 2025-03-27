import { Formik, Form, Field, ErrorMessage } from "formik";
import { toast } from "sonner";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { ContentSchema } from "~/validations/content.validation";
import { usePut } from "~/api/hooks";
import Endpoints from "~/api/endpoints";
import { errorResponseHandler } from "~/lib/utils";
import type { ContentReqType } from "~/types/request.type";
import { queryClient } from "~/root";
import { QueryKeys } from "~/constants/query-keys";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import type { Content } from "~/types/data.type";

interface PropsType {
  isOpen: boolean;
  onClose: () => void;
  content: Content | null;
  onSubmit: (values: ContentReqType) => void;
  loading: boolean;
}

const EditContentModal = ({
  isOpen,
  onClose,
  content,
  onSubmit,
  loading,
}: PropsType) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Edit Content</DialogTitle>
          <DialogDescription>
            Update the content details below and save changes.
          </DialogDescription>
        </DialogHeader>

        <Formik
          initialValues={{
            title: content?.title || "",
            description: content?.description || "",
            youtubeLink: content?.youtubeLink || "",
          }}
          validationSchema={ContentSchema}
          onSubmit={onSubmit}
        >
          {() => (
            <Form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Field as={Input} id="title" name="title" placeholder="Title" />
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
              </div>

              <DialogFooter>
                <Button type="submit" disabled={loading}>
                  {loading ? "Updating..." : "Save Changes"}
                </Button>
              </DialogFooter>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

export default EditContentModal;
