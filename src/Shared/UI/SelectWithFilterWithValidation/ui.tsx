import React, { useEffect, useState } from "react";
import "./style.scss";
import { useValidationFieldForm } from "../../Hooks/useValidation";
import { SelectWithFilter } from "../SelectWithFilter/ui";
import { ValidationMessage } from "../ValidationMessage/ui";

interface SelectWithFilterWithValidationProps {
  id?: string;
  label: string;
  required?: boolean;
  options: string[];
  setIsValid?: (val: boolean) => void;
  multiple?: boolean;
  updateVal?: (v: unknown) => void;
  generalDirty?: boolean;
}

export const SelectWithFilterWithValidation = ({
  required,
  setIsValid,
  multiple,
  updateVal,
  generalDirty,
  ...props
}: SelectWithFilterWithValidationProps) => {
  const [value, setValue] = useState<string | string[]>(multiple ? [] : "");
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
      <SelectWithFilter
        value={value}
        setValue={setValue}
        className="selectWithFilterWithValidation__input"
        {...props}
        isError={(validation.isDirty || generalDirty) && !validation.isValid}
        onDirty={validation.setIsDirty}
        multiple={multiple}
      />
      <ValidationMessage {...validation} />
    </div>
  );
};
