import { Dialog } from "@headlessui/react";
import { ReactNode } from "react";
import { MdClose } from "react-icons/md";
import { twMerge } from "tailwind-merge";

export default function Modal({
  children,
  title,
  isOpen,
  onCancel,
}: {
  children: ReactNode;
  title: string;
  isOpen: boolean;
  onCancel: () => void;
}) {
  return (
    <Dialog className={twMerge("modal ", isOpen && "modal-open")} open={isOpen} onClose={onCancel}>
      <Dialog.Panel className='modal-box w-full min-h-[100vh] md:w-[34rem] md:min-h-[auto] flex flex-col'>
        <Dialog.Title className='flex flex-row justify-between items-center'>
          <span className='order-2 font-bold text-lg'>{title}</span>
          <button className='btn btn-ghost md:hidden order-1 md:order-2' onClick={onCancel}>
            <MdClose />
          </button>
        </Dialog.Title>
        {children}
      </Dialog.Panel>
    </Dialog>
  );
}
