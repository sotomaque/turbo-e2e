import {
  ArrowDownOnSquareIcon,
  BackspaceIcon,
  EllipsisHorizontalIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';
import { useState } from 'react';
import Link from 'next/link';
import { ParsedResumeResponse } from '@types';
import { DocumentThumbnail, DropdownMenu, DropdownMenuItem } from 'ui';
import DeleteResumeDialog from './delete/DeleteResumeDialog';
import RenameResumeDialog from './rename/RenameResumeDialog';

const downloadResume = (resumeId: number) => {
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/resume/render/${resumeId}`;
  const win = window.open(url, '_blank');
  if (win !== null) {
    win.focus();
  }
};

export const ResumeItem: React.FC<{
  item: ParsedResumeResponse;
  idx: number;
}> = ({ item, idx }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isRenaming, setIsRenaming] = useState(false);
  const menuItems = [
    <DropdownMenuItem
      key="rename"
      iconLeft={<BackspaceIcon />}
      onClick={() => setIsRenaming(true)}
      label="Rename"
    />,
    <DropdownMenuItem
      key="download"
      iconLeft={<ArrowDownOnSquareIcon />}
      onClick={() => downloadResume(item.id)}
      label="Download"
    />,
    <DropdownMenuItem
      key="delete"
      iconLeft={<TrashIcon />}
      onClick={() => setIsDeleting(true)}
      label="Delete"
    />,
  ];
  return (
    <div className="min-w-64 flex flex-col justify-between rounded border border-gray-100">
      <Link href={`/resume/${item.id}`}>
        <DocumentThumbnail src={item.thumbnail} />
      </Link>
      <div className="flex items-center justify-between p-2">
        <p className="text-sm text-gray-400 line-clamp-1">
          {(item.label || item.resume_data?.profile_info?.full_name) ??
            `Resume ${idx + 1}`}
        </p>
        <DropdownMenu
          menuButton={<EllipsisHorizontalIcon className="h-6 w-6 flex-none" />}
          menuItems={menuItems}
        />
      </div>
      <DeleteResumeDialog
        item={item}
        isOpen={isDeleting}
        onClose={() => setIsDeleting(false)}
      />
      <RenameResumeDialog
        item={item}
        isOpen={isRenaming}
        onClose={() => setIsRenaming(false)}
      />
    </div>
  );
};
