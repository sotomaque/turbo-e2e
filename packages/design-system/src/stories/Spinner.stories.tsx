import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Spinner } from 'ui';

export default {
  title: 'Spinner',
  component: Spinner,
} as ComponentMeta<typeof Spinner>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Spinner> = (args) => (
  <Spinner {...args} />
);

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {};
