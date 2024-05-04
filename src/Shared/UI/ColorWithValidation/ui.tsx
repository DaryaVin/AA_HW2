import React, { useEffect, useState } from "react";
import { useValidationFieldForm } from "../../Hooks/useValidation";
import { ColorSelect } from "../ColorSelect/ui";
import { ValidationMessage } from "../ValidationMessage/ui";

interface ColorWithValidationProps {
  id: string;
  label: string;
  required?: boolean;
  options: string[];
  setIsValid?: (val: boolean) => void;
  multiple?: boolean;
}

export const ColorWithValidation = ({
  required,
  setIsValid,
  multiple,
  ...props
}: ColorWithValidationProps) => {
  const [value, setValue] = useState<string | string[]>(multiple ? [] : "");
  const validation = useValidationFieldForm({
    value,
    options: {
      required,
    },
  });

  useEffect(() => {
    if (setIsValid) setIsValid(validation.isValid);
  }, [validation.isValid]);

  return (
    <div className="colorWithValidation">
      <ColorSelect
        value={value}
        setValue={setValue}
        className="ColorWithValidation__input"
        {...props}
        isError={validation.isDirty && !validation.isValid}
        onDirty={validation.setIsDirty}
        multiple={multiple}
      />
      <ValidationMessage {...validation} />
    </div>
  );
};
