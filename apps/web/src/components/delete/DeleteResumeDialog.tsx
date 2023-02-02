import type { ParsedResumeResponse } from '@types';
import { Button, Dialog } from 'ui';
import useDeleteResume from './useDeleteResume';

type Props = {
  item: ParsedResumeResponse;
  isOpen: boolean;
  onClose: () => void;
};

const DeleteResumeDialog: React.FC<Props> = ({ item, isOpen, onClose }) => {
  const deleteMutation = useDeleteResume();
  const onDelete = () => {
    deleteMutation.mutate(
      { id: item.id },
      {
        onSuccess: onClose,
      }
    );
  };
  return (
    <Dialog isOpen={isOpen} onClose={onClose} title="Are you sure?">
      <div className="flex flex-col gap-6">
        Are you sure you want to delete {item.label}? This cannot be undone.
        <div className="flex justify-end gap-2">
          <Button onClick={onClose} variant="secondary">
            Cancel
          </Button>
          <Button onClick={onDelete} variant="primary">
            Confirm
          </Button>
        </div>
      </div>
    </Dialog>
  );
};

export default DeleteResumeDialog;
