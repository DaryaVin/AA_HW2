import React, { useEffect, useState } from "react";
import "./style.scss";
import { useValidationFieldForm } from "../../Hooks/useValidation";
import { FileInput } from "../Files/ui";
import { ValidationMessage } from "../ValidationMessage/ui";

interface FilesWithValidationProps {
  id?: string;
  label: string;
  required?: boolean;
  setIsValid?: (val: boolean) => void;
  multiple?: boolean;
  formats?: string;
  maxSize?: number;
  maxCount?: number;
  updateVal?: (v: unknown) => void;
  generalDirty?: boolean;
}

export const FilesWithValidation = ({
  required,
  setIsValid,
  multiple,
  updateVal,
  generalDirty,
  ...props
}: FilesWithValidationProps) => {
  const [value, setValue] = useState<FileList | null>(null);
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
    <div className="colorWithValidation">
      <FileInput
        fileList={value}
        setFileList={setValue}
        className="ColorWithValidation__input"
        {...props}
        isError={(validation.isDirty || generalDirty) && !validation.isValid}
        onDirty={validation.setIsDirty}
        multiple={multiple}
      />
      <ValidationMessage {...validation} />
    </div>
  );
};
