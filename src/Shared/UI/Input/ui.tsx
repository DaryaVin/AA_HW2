import React, { forwardRef, useImperativeHandle, useRef } from "react";
import "./style.scss";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  type?: "password" | "text" | "textarea";
  label?: string;
  placeholder?: string;
  mask?: string;
  className?: string;
  value: string;
  isError?: boolean;
  setValue: (val: string) => void;
}

const InputField = forwardRef(
  (
    {
      className,
      label,
      type = "text",
      value,
      onChange,
      disabled = false,
      setValue,
      isError,
      ...props
    }: InputProps,
    ref
  ) => {
    const innerRef = useRef<HTMLInputElement>(null);
    useImperativeHandle(ref, () => innerRef.current);

    const onChangeInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (onChange) onChange(e);
      setValue(e.target.value);
    };
    return (
      <label
        className={
          "input" +
          (className ? " " + className : "") +
          (isError ? " input_isError" : "") +
          (disabled ? " input_disabled" : "")
        }
      >
        <div
          className={
            "input__label" + (value !== "" ? " input__label_small" : "")
          }
        >
          {label}
        </div>
        <input
          {...props}
          type={type}
          ref={innerRef}
          value={value}
          className={
            "input__field" + (value !== "" ? " input__field_filled" : "")
          }
          onChange={onChangeInputValue}
          disabled={disabled}
        />
      </label>
    );
  }
);

InputField.displayName = "FileInput";

export const Input = InputField;
