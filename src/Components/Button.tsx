import React, { ButtonHTMLAttributes } from "react";
import { Icon, IconProps } from "@iconify/react";
import { RootProps } from "./TextInput";

function ButtonSubmit(props: RootProps) {
  return (
    <button
      className={`flex rounded-md bg-green-600 py-1 px-4 my-2 hover:bg-green-300 align-middle items-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-500`}
      type="submit"
    >
      {props.children}
    </button>
  );
}

interface TextButtonProps {
  text: string;
  className?: string;
}

function ButtonText({ text, className }: TextButtonProps) {
  return (
    <>
      <span
        className={`text-sm font-semibold text-whiteDiniz shadow-sm px-3 ${className} `}
      >
        {" "}
        {text}{" "}
      </span>
    </>
  );
}

interface ButtonIconProps extends IconProps {}

function ButtonIcon(props: ButtonIconProps) {
  return <Icon {...props} />;
}

export const Buttons = {
  Icon: ButtonIcon,
  Text: ButtonText,

  Submit: ButtonSubmit,
};
