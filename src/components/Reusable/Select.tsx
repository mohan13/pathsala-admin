"use client";
import React, { ComponentPropsWithoutRef, Ref, useId } from "react";

interface InputGroupProps extends ComponentPropsWithoutRef<"select"> {
  label: string;
  options: any;
  multiple?: boolean;
  className?: string;
}

function Select(
  { options, label, className, multiple = false, ...props }: InputGroupProps,
  ref: Ref<HTMLSelectElement>,
) {
  const id = useId();
  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={id}
          className="text-gray-900 mb-2 block text-sm font-medium"
        >
          {label}
        </label>
      )}
      <select
        {...props}
        id={id}
        ref={ref}
        multiple={multiple}
        className={`bg-gray-50 border-gray-300 text-gray-900 block w-full rounded-lg border p-2.5 text-sm focus:border-blue-500 focus:ring-blue-500 ${className}`}
      >
        {options?.map((option: any) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export default React.forwardRef(Select);
