"use client";

import React, { forwardRef, Ref } from "react";
import { cn } from "@/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

const Input: React.FC<InputProps> = forwardRef(
  (props: InputProps, ref: Ref<HTMLInputElement>) => {
    const { className, ...inputProps } = props;
    return (
      <input
        ref={ref}
        className={cn(
          "p-[12px] rounded-[8px]",
          "bg-agwhite",
          "text-agblack font-general-sans font-semibold text-[16px] leading-[23.2px]",
          "grid place-items-center grid-flow-col gap-[8px]",
          "placeholder:text-agblack placeholder:opacity-50",
          "disabled:opacity-[0.5] disabled:cursor-not-allowed disabled:select-none",
          className, // Merge the passed className with the default classes
        )}
        {...inputProps}
      />
    );
  },
);

export default Input;
