import { useState } from 'react';

import { DesktopMenu } from '../DesktopMenu';
import { Header } from '../Header';

export type MenuItem = {
  label: string;
  icon: React.ReactNode;
  href: string;
  disabled?: boolean;
};

type Props = {
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

export const AppLayout: React.FC<Props & React.PropsWithChildren> = ({
  children,
  menuItems,
  userData,
  userIsLoading,
  ...rest
}) => {
  // State
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="flex min-h-screen flex-col gap-8 p-8" {...rest}>
      {/* Logo + User Profile */}
      <Header
        data-test-id="header"
        isOpen={isMenuOpen}
        toggle={() => setIsMenuOpen(!isMenuOpen)}
        menuItems={menuItems}
        userData={userData}
        userIsLoading={userIsLoading}
      />

      <div className="flex h-full flex-row gap-6">
        {/* Side Bar */}
        <DesktopMenu menuItems={menuItems} />

        {/* Content */}
        <main
          className={`flex-grow ${isMenuOpen ? 'hidden md:block' : ''}`}
          data-test-id="documents-content"
        >
          {children}
        </main>
      </div>
    </div>
  );
};
