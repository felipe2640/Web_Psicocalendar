import React, { HTMLAttributes, InputHTMLAttributes, ReactNode } from "react";
import { Icon, IconProps } from "@iconify/react";

export interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: string;
}

export interface RootProps {
  children: ReactNode;
  className?: string;
}

function TextInputRoot(props: RootProps) {
  return (
    <div className={`${props.className} flex items-center w-full py-3    `}>
      {props.children}
    </div>
  );
}

function TextInputInput(props: TextInputProps) {
  return (
    <input
      className="min-w-0 flex-auto rounded-md border-0 bg-white/5 px-3.5 py-2 text-black placeholder-black ring-1 ring-inset ring-sky/10 focus:ring-2 focus:ring-inset focus:ring-sky-300 sm:text-sm sm:leading-6  text-sm outline-none  "
      {...props}
    />
  );
}

export const TextInput = {
  Root: TextInputRoot,
  Input: TextInputInput,
};
