import Link from 'next/link';
import { useRouter } from 'next/router';

import type { MenuItem } from '../AppLayout';

type Props = {
  menuItems: MenuItem[];
};

export const MobileMenu: React.FC<Props> = ({ menuItems }) => {
  const router = useRouter();

  return (
    <>
      {menuItems.map((item) => {
        const isActive = router.pathname.startsWith(item.href);
        return (
          <Link
            key={item.href}
            href={item.disabled ? '#' : item.href}
            className={`flex items-center gap-2 ${
              !isActive ? 'text-gray-400' : ''
            } ${item.disabled ? 'text-gray-400' : ''}`}
          >
            <span className="h-8 w-8">{item.icon}</span>
            {item.label}
          </Link>
        );
      })}
    </>
  );
};
