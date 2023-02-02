import { useForm } from 'react-hook-form';

import type { ParsedResumeResponse } from '@types';
import useRenameResume from './useRenameResume';
import { Button, Dialog } from 'ui';

type Props = {
  item: ParsedResumeResponse;
  isOpen: boolean;
  onClose: () => void;
};

const RenameResumeDialog: React.FC<Props> = ({ item, isOpen, onClose }) => {
  const rename = useRenameResume();
  const { register, handleSubmit } = useForm<{ label: string }>({
    values: {
      label: item.label,
    },
  });

  const onSubmit = handleSubmit(({ label }) => {
    rename.mutate(
      { id: item.id, label },
      {
        onSuccess: onClose,
      }
    );
  });

  return (
    <Dialog isOpen={isOpen} onClose={() => onClose()} title="Rename Document">
      <form onSubmit={onSubmit}>
        <div className="flex flex-col gap-6">
          <input type="text" {...register('label')} />
          <div className="flex justify-end gap-2">
            <Button onClick={onClose} variant="secondary">
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              Confirm
            </Button>
          </div>
        </div>
      </form>
    </Dialog>
  );
};

export default RenameResumeDialog;
