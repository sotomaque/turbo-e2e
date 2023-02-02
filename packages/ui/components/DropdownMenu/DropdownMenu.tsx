import { Fragment } from 'react';
import { cva } from 'class-variance-authority';
import { Menu, Transition } from '@headlessui/react';

type Props = {
  menuButton: JSX.Element;
  menuItems: React.ReactNode[];
  side?: 'left' | 'right';
};
const dropDownStyles = cva(
  [
    'absolute',
    'mt-2',
    'w-64',
    'origin-top-right',
    'divide-y',
    'divide-gray-100',
    'rounded-md',
    'bg-white',
    'shadow-lg',
    'ring-1',
    'ring-black',
    'ring-opacity-5',
    'focus:outline-none',
  ],
  {
    variants: {
      side: {
        left: ['left-0'],
        right: ['right-0'],
      },
    },
    defaultVariants: {
      side: 'right',
    },
  }
);

export const DropdownMenu: React.FC<Props> = ({
  menuButton,
  menuItems,
  side,
  ...rest
}) => {
  return (
    <Menu as="div" className="relative inline-block text-left" {...rest}>
      <Menu.Button as="span" className="cursor-pointer">
        {menuButton}
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className={dropDownStyles({ side })}>
          {menuItems.map((item, index) => {
            return (
              <Menu.Item key={index}>
                {({ active }) => (
                  <div className={`${active ? 'bg-ebbeige-50' : ''} w-full`}>
                    {item}
                  </div>
                )}
              </Menu.Item>
            );
          })}
        </Menu.Items>
      </Transition>
    </Menu>
  );
};
