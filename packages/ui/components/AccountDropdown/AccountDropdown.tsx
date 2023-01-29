import { useRouter } from 'next/router';
import {
  ArrowLeftOnRectangleIcon,
  ChevronDownIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';

import { DropdownMenu } from '../DropdownMenu';
import { DropdownMenuItem } from '../DropdownMenuItem';
import { Spinner } from '../Spinner';

type Props = {
  side: 'left' | 'right';
  userData?:
    | {
        id: number;
        first_name: string;
        last_name: string;
        email: string;
      }
    | undefined;
  userIsLoading: boolean;
};

export const AccountDropdown: React.FC<Props> = ({
  side,
  userData,
  userIsLoading,
  ...rest
}) => {
  const router = useRouter();

  if (userIsLoading) {
    return <Spinner />;
  }

  const logout = () => {
    // localStorage.removeItem('access_token');
    router.reload();
  };

  const menuItems = [
    <DropdownMenuItem
      key="logout"
      iconLeft={<ArrowLeftOnRectangleIcon />}
      onClick={logout}
      label="Logout"
    />,
  ];

  const menuButton = (
    <div
      className="inline-flex items-center gap-1"
      data-test-id="user-menu-btn"
    >
      <div className="relative inline-flex h-8 w-8 items-center justify-center overflow-hidden rounded-full bg-ebsuccess-50">
        <span className="font-medium text-ebgreen-500">
          {userData ? (
            <>
              {userData.first_name.substring(0, 1)}
              {userData.last_name.substring(0, 1)}
            </>
          ) : (
            <UserCircleIcon className="h-8 w-8" />
          )}
        </span>
      </div>
      <ChevronDownIcon className="h-4 w-4" />
    </div>
  );

  return (
    <DropdownMenu
      side={side}
      menuButton={menuButton}
      menuItems={menuItems}
      {...rest}
    />
  );
};
