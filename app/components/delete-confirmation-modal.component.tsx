import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";

type PropsType = {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
  title: string;
  loading: boolean;
};

const DeleteConfirmationModal = ({
  isOpen,
  onClose,
  onDelete,
  title,
  loading,
}: PropsType) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete {title}
            and remove data from our servers.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            type="submit"
            variant="destructive"
            onClick={onDelete}
            disabled={loading}
          >
            Yes
          </Button>
          <Button type="reset" onClick={onClose} variant="default">
            No
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteConfirmationModal;
