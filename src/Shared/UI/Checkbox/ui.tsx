import React from "react";
import "./style.scss";

export interface CheckboxProps {
  type?: "checkbox";
  id?: string;
  label: string;
  required?: boolean;
  className?: string;
  onChange: (val: boolean) => void;
  checked: boolean | undefined;
  disabled?: boolean;
  isError?: boolean;
}

export const Checkbox = ({
  className,
  checked,
  onChange,
  disabled,
  label,
  isError,
}: CheckboxProps) => {
  return (
    <div
      className={
        "checkbox" +
        (className ? " " + className : "") +
        (disabled ? " checkbox_disable" : "") +
        (isError ? " checkbox_isError" : "")
      }
      onKeyDown={(e) => {
        if (e.key === " ") {
          if (!disabled) onChange(!checked);
        }
      }}
      onClick={() => {
        if (!disabled) onChange(!checked);
      }}
    >
      <span
        role="checkbox"
        tabIndex={disabled ? -1 : 0}
        aria-checked={checked}
        aria-disabled={disabled}
        aria-label={label}
        className="checkbox__field"
      ></span>
      {label}
    </div>
  );
};
