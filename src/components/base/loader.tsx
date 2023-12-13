import { ReactNode } from "react";

export default function Loader({ children, loading }: { children: ReactNode; loading: boolean }) {
  return (
    <div className='relative flex-grow'>
      {loading && (
        <>
          <div className='absolute top-0 left-0 w-full h-full backdrop-opacity-10 bg-neutral-content/50 '></div>
          <span className='loading loading-spinner loading-md text-accent absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-full'></span>
        </>
      )}

      {children}
    </div>
  );
}
