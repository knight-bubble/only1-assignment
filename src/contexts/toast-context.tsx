"use client";

import { ReactNode, ReactPortal, createContext, useContext, useRef } from "react";
import { createPortal } from "react-dom";

export type ToastContextProps = {
  addToast: (toast: ReactNode) => ReactPortal | undefined;
};

const ToastContext = createContext<ToastContextProps>(undefined as unknown as ToastContextProps);

export function ToastProvider({ children }: { children: ReactNode }) {
  const toastContainerRef = useRef(null);

  const addToast = (toast: ReactNode): ReactPortal | undefined => {
    if (toastContainerRef.current) {
      return createPortal(toast, toastContainerRef.current);
    }
  };

  const value = {
    addToast,
  } satisfies ToastContextProps;

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div ref={toastContainerRef} className='toast toast-start' style={{ zIndex: 9999 }} id='toast-container'></div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);

  if (context === undefined) {
    throw new Error("useToast must be used within a ToastProvider");
  }

  return context;
}
