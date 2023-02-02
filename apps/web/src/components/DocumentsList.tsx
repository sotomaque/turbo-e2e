import { Tabs } from 'ui';
import { CreateNew } from './CreateNew';

export const DocumentList = () => {
  return (
    <div className="flex h-full flex-col gap-6 rounded-2xl bg-white p-6 shadow">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold text-gray-900">Documents</h1>
        <CreateNew />
      </div>
      <Tabs
        tabs={[
          {
            label: 'Resumes',
            content: <h1>Hi</h1>,
          },
          {
            label: 'Cover letters',
            content: <h1>2</h1>,
          },
        ]}
      />
    </div>
  );
};
