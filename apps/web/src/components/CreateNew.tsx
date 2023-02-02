import { ChevronDownIcon } from '@heroicons/react/24/outline';
import useBreakpoint from '@hooks/useBreakpoints';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { Button, DropdownMenu, DropdownMenuItem } from 'ui';

export const CreateNew = () => {
  const router = useRouter();
  const breakpoint = useBreakpoint();
  const menuButton = (
    <Button data-test-id="create-new-button" iconRight={<ChevronDownIcon />}>
      {breakpoint === 'xs' || breakpoint === 'sm'
        ? ''
        : breakpoint === 'md'
        ? 'Create'
        : 'Create New'}
    </Button>
  );
  const menuItems = [
    <DropdownMenuItem
      data-test-id="create-new-resume-button"
      key="resume"
      onClick={() => router.push('/resume/upload')}
      label="Resume"
    />,
    <DropdownMenuItem
      data-test-id="create-new-cover-letter-button"
      key="cover-letter"
      onClick={() => router.push('/cover-letter/create')}
      label="Cover letter"
    />,
  ];

  return (
    <DropdownMenu menuButton={menuButton} menuItems={menuItems} side="right" />
  );
};

export default dynamic(() => Promise.resolve(CreateNew), {
  ssr: false,
});
