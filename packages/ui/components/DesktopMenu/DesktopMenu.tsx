import Link from 'next/link';
import { useRouter } from 'next/router';
import type { MenuItem } from '../AppLayout';

type Props = {
  menuItems: MenuItem[];
};

export const DesktopMenu: React.FC<Props> = ({ menuItems }) => {
  const router = useRouter();

  return (
    <div className="hidden flex-col gap-8 pt-8 md:flex" data-test-id="sidebar">
      <div className="flex flex-col gap-12">
        {menuItems.map((item, idx) => {
          const isActive = router.pathname.startsWith(item.href);
          return (
            <Link
              data-test-id={`sidebar-item-${item.label}-${idx}`}
              key={item.href}
              href={item.disabled ? '#' : item.href}
              className={`flex flex-col items-center gap-2 text-xs ${
                !isActive ? 'text-gray-400' : ''
              } ${
                item.disabled
                  ? 'cursor-not-allowed text-gray-400'
                  : 'cursor-pointer'
              }`}
            >
              <span className="h-8 w-8">{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
};
