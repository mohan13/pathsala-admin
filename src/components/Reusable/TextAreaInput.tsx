"use client";

import { forwardRef, Ref, ComponentPropsWithoutRef } from "react";
interface InputGroupProps extends ComponentPropsWithoutRef<"textarea"> {
  label: string;
  className?: string;
}

const TextareaInputRef = (
  { label, className = "sm:col-span-2", ...props }: InputGroupProps,
  ref: Ref<HTMLTextAreaElement>,
) => {
  return (
    <div className={className}>
      <label className="text-gray-900 mb-2 block text-sm font-medium leading-6 dark:text-slate-50 ">
        {label}
      </label>
      <div className="mt-2">
        <textarea
          ref={ref}
          {...props}
          rows={3}
          className="text-gray-900 placeholder:text-gray-400 block w-full rounded-md border-0 py-3 shadow-sm ring-1 ring-inset ring-slate-500 focus:ring-2 focus:ring-inset focus:ring-lime-700 dark:bg-transparent dark:text-slate-100 dark:focus:ring-slate-500 sm:text-sm sm:leading-6"
          placeholder={`Type the ${label.toLowerCase()}`}
        />
      </div>
    </div>
  );
};

export const TextareaInput = forwardRef(TextareaInputRef);
