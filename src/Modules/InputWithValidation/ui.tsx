import React, { useState } from "react";
import "./style.scss";
import { Input, ValidationMessage, useValidationFieldForm } from "../../Shared";

interface InputWithValidationProps {
  id: string;
  type?: "password" | "text" | "textarea";
  label?: string;
  required?: boolean;
  placeholder?: string;
  maxlength?: number;
  minlength?: number;
  pattern?: string;
  mask?: string;
  className?: string;
}

export const InputWithValidation = ({
  required,
  maxlength,
  minlength,
  pattern,
  ...props
}: InputWithValidationProps) => {
  const [value, setValue] = useState<string>("");
  const validation = useValidationFieldForm({
    value,
    options: {
      required,
      maxlength,
      minlength,
      pattern,
    },
  });

  return (
    <div className="inputWithValidation">
      <Input
        value={value}
        setValue={setValue}
        className="nputWithValidation__input"
        onBlur={() => {
          validation.setIsDirty(true);
        }}
        {...props}
      />
      <ValidationMessage {...validation} />
    </div>
  );
};
