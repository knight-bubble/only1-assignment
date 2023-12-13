import { useToast } from "@/contexts/toast-context";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

export type ToastProps = {
  message: string;
  type: "error" | "success";
  isShown: boolean;
};

export default function Toast({ message, type, isShown }: ToastProps) {
  const [visible, setVisible] = useState(isShown);
  const { addToast } = useToast();

  useEffect(() => {
    setVisible(isShown);
    if (isShown) {
      const timer = setTimeout(() => {
        setVisible(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isShown]);

  return (
    visible &&
    addToast(
      <div className={twMerge(`alert`, type === "success" && `alert-success`, type === "error" && "alert-error")}>
        <p>{message}</p>
      </div>
    )
  );
}
