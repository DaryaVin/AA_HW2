import React, { useEffect, useState } from "react";
import "./style.scss";
import { useValidationFieldForm } from "../../Hooks/useValidation";
import { Input } from "../Input/ui";
import { ValidationMessage } from "../ValidationMessage/ui";

interface InputWithValidationProps {
  id?: string;
  type?: "password" | "text" | "textarea";
  label: string;
  required?: boolean;
  placeholder?: string;
  maxlength?: number;
  minlength?: number;
  pattern?: string;
  mask?: string;
  className?: string;
  setIsValid?: (val: boolean) => void;
  updateVal?: (v: unknown) => void;
  generalDirty?: boolean;
}

export const InputWithValidation = ({
  required,
  maxlength,
  minlength,
  pattern,
  setIsValid,
  updateVal,
  generalDirty,
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

  useEffect(() => {
    if (setIsValid) setIsValid(validation.isValid);
  }, [validation.isValid, generalDirty]);

  useEffect(() => {
    if (generalDirty) validation.setIsDirty(true);
  }, [generalDirty]);

  useEffect(() => {
    if (updateVal) updateVal(value);
  }, [value]);

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
        isError={(validation.isDirty || generalDirty) && !validation.isValid}
      />
      <ValidationMessage {...validation} />
    </div>
  );
};
