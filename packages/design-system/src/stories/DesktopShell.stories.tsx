import { ComponentStory, ComponentMeta } from '@storybook/react';

import { DesktopShell } from 'ui';

export default {
  title: 'Shells/DesktopShell',
  component: DesktopShell,
} as ComponentMeta<typeof DesktopShell>;

const Template: ComponentStory<typeof DesktopShell> = () => <DesktopShell />;

export const Default = Template.bind({});
