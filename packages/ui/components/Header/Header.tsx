import Image from 'next/image';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

import { AccountDropdown } from '../AccountDropdown';
import type { MenuItem } from '../AppLayout';
import { MobileMenu } from '../MobileMenu';

type Props = {
  isOpen: boolean;
  toggle: () => void;
  menuItems: MenuItem[];
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

export const Header: React.FC<Props> = ({
  isOpen,
  toggle,
  menuItems,
  userData,
  userIsLoading,
  ...rest
}) => {
  return (
    <>
      <div className="flex items-center justify-between" {...rest}>
        <Image
          width={140}
          height={20}
          className="h-5 w-auto"
          src="/earnbetter-logo-color.svg"
          alt="Earnbetter"
          data-test-id="logo"
        />
        <div className="hidden md:block">
          <AccountDropdown
            data-test-id="account-dropdown"
            side="right"
            userData={userData}
            userIsLoading={userIsLoading}
          />
        </div>
        <button type="button" className="block md:hidden" onClick={toggle}>
          {isOpen ? (
            <XMarkIcon className="h-8 w-8" />
          ) : (
            <Bars3Icon className="h-8 w-8" />
          )}
        </button>
      </div>
      {isOpen && (
        <div className="flex min-h-screen flex-col gap-8 pt-8 md:hidden">
          <MobileMenu menuItems={menuItems} />
          <span className="h-px w-full bg-gray-400 " />
          <AccountDropdown
            data-test-id="account-dropdown"
            side="left"
            userData={userData}
            userIsLoading={userIsLoading}
          />
        </div>
      )}
    </>
  );
};

export default Header;
