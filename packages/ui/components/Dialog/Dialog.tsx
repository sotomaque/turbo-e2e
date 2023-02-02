import { XMarkIcon } from '@heroicons/react/24/outline';
import { Fragment } from 'react';
import { Dialog as HeadlessDialog, Transition } from '@headlessui/react';

type Props = {
  title: string;
  isOpen: boolean;
  onClose?: () => void;
};

export const Dialog: React.FC<React.PropsWithChildren<Props>> = ({
  title,
  isOpen,
  onClose,
  children,
}) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <HeadlessDialog
        as="div"
        className="relative z-10"
        onClose={() => onClose?.()}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <HeadlessDialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <HeadlessDialog.Title
                  as="h3"
                  className="mb-6 flex items-center justify-between text-lg font-medium leading-6 text-gray-900"
                >
                  {title}
                  <XMarkIcon
                    onClick={() => onClose?.()}
                    className="h-6 w-6 cursor-pointer"
                  />
                </HeadlessDialog.Title>
                {children}
              </HeadlessDialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </HeadlessDialog>
    </Transition>
  );
};
