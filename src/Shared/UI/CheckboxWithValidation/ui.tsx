import React, { useEffect, useState } from "react";
import { useValidationFieldForm } from "../../Hooks/useValidation";
import { Checkbox } from "../Checkbox/ui";
import { ValidationMessage } from "../ValidationMessage/ui";

interface CheckboxWithValidationProps {
  id?: string;
  label: string;
  required?: boolean;
  setIsValid?: (val: boolean) => void;
  updateVal?: (v: unknown) => void;
  generalDirty?: boolean;
}

export const CheckboxWithValidation = ({
  required,
  setIsValid,
  updateVal,
  generalDirty,
  ...props
}: CheckboxWithValidationProps) => {
  const [value, setValue] = useState<boolean | undefined>();
  const validation = useValidationFieldForm({
    value,
    options: {
      required,
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
    <div className="selectWithFilterWithValidation">
      <Checkbox
        checked={value}
        onChange={setValue}
        className="selectWithFilterWithValidation__input"
        {...props}
        isError={(validation.isDirty || generalDirty) && !validation.isValid}
      />
      <ValidationMessage {...validation} />
    </div>
  );
};
