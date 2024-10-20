"use client";

import React, { ComponentPropsWithoutRef, Ref, forwardRef } from "react";

interface InputGroupProps extends ComponentPropsWithoutRef<"input"> {
  label: string;
  type?: string;
  className?: string;
}

const InputRef = (
  { label, type = "text", className = "", ...props }: InputGroupProps,
  ref: Ref<HTMLInputElement>,
) => {
  return (
    <div>
      {label && (
        <label className="mb-3 block text-sm font-medium text-black dark:text-white">
          {label}
        </label>
      )}
      <div className="mt-2">
        <input
          ref={ref}
          {...props}
          className={`w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary ${className}`}
          type={type}
        />
      </div>
    </div>
  );
};

export const Input = forwardRef(InputRef);
