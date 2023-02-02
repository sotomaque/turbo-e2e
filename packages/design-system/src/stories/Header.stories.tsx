import { ComponentStory, ComponentMeta } from '@storybook/react';
import {
  DocumentIcon,
  UserCircleIcon,
  UsersIcon,
} from '@heroicons/react/24/outline';

import { Header } from 'ui';

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

export default {
  title: 'Header',
  component: Header,
} as ComponentMeta<typeof Header>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Header> = (args) => <Header {...args} />;

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  menuItems: menuItems,
  isOpen: false,
  toggle: () => {},
  userData: {
    id: 1,
    first_name: 'John',
    last_name: 'Doe',
    email: 'test@gmail.com',
  },
};
