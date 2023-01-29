import { AppLayout } from 'ui';
import {
  DocumentIcon,
  UserCircleIcon,
  UsersIcon,
} from '@heroicons/react/24/outline';
import { useQuery } from '@tanstack/react-query';
import { meQuery } from '@api';

export const menuItems = [
  {
    label: 'Documents',
    icon: <DocumentIcon />,
    href: '/documents',
    disabled: false,
  },
  {
    label: 'Candidates',
    icon: <UsersIcon />,
    href: '/candidates',
    disabled: true,
  },
  {
    label: 'Profile',
    icon: <UserCircleIcon />,
    href: '/profile',
    disabled: true,
  },
];

const HomePage = () => {
  const { data: userData, isLoading: userIsLoading } = useQuery({
    queryFn: async () => meQuery(),
    queryKey: ['me'],
  });

  return (
    <AppLayout
      menuItems={menuItems}
      userData={userData}
      userIsLoading={userIsLoading}
    >
      <div className="flex h-max w-max border-2 border-red-500">
        <h1>Content!🎉</h1>
      </div>
    </AppLayout>
  );
};

export default HomePage;
