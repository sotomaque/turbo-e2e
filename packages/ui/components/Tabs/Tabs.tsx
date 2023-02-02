import React, { useEffect } from 'react';
import { Tab } from '@headlessui/react';

type Props = {
  tabs: {
    label: string | React.ReactNode;
    content: React.ReactNode;
  }[];
};

export const Tabs: React.FC<Props> = ({ tabs }) => {
  const [currentTab, setCurrentTab] = React.useState(() => {
    return 0;
  });
  useEffect(() => {
    const hasValueInSessionStorage = sessionStorage.getItem('currentTab');
    if (!hasValueInSessionStorage) {
      return;
    }
    setCurrentTab(parseInt(hasValueInSessionStorage, 10));
  }, []);
  const onChange = (index: number) => {
    if (typeof window === 'undefined') return;
    window.sessionStorage.setItem('currentTab', `${index}`);
    setCurrentTab(index);
  };

  const selectedStyles =
    'ui-selected:border-ebgreen-600 ui-selected:text-ebgreen-600';
  const notSelectedStyles =
    'ui-not-selected:border-transparent ui-not-selected:text-gray-500 ui-not-selected:hover:text-gray-700 ui-not-selected:hover:border-gray-300';
  const defaultStyles =
    'h-full group inline-flex items-center py-4 px-1 border-b-2 font-medium text-sm';
  return (
    <div className="flex h-full flex-col">
      <Tab.Group selectedIndex={currentTab} onChange={onChange}>
        <Tab.List className="flex gap-4 border-b border-gray-200">
          {tabs.map((tab, index) => (
            <Tab
              data-test-id={`tab-${tab.label}-${index}`}
              key={index}
              className={`${selectedStyles} ${notSelectedStyles} ${defaultStyles}`}
            >
              {tab.label}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="mt-8 h-full">
          {tabs.map((tab, index) => (
            <Tab.Panel className="h-full" key={index}>
              {tab.content}
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};
