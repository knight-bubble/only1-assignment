import { ButtonHTMLAttributes, ReactNode, useRef } from "react";
import { AriaButtonOptions, useButton } from "react-aria";
import { twMerge } from "tailwind-merge";

type ButtonProps = { children: ReactNode } & AriaButtonOptions<"button"> & ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button(props: ButtonProps) {
  let ref = useRef(null);
  let { buttonProps } = useButton(props, ref);
  let { children, className, type } = props;

  return (
    <button type={type} className={twMerge("btn", className)} {...buttonProps} ref={ref}>
      {children}
    </button>
  );
}
