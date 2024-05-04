import React, { useEffect, useState } from "react";
import "./style.scss";
import { useValidationFieldForm } from "../../Hooks/useValidation";
import { FileInput } from "../Files/ui";
import { ValidationMessage } from "../ValidationMessage/ui";

interface FilesWithValidationProps {
  id: string;
  label: string;
  required?: boolean;
  setIsValid?: (val: boolean) => void;
  multiple?: boolean;
  formats?: string;
  maxSize?: number;
  maxCount?: number;
}

export const FilesWithValidation = ({
  required,
  setIsValid,
  multiple,
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
  }, [validation.isValid]);

  return (
    <div className="colorWithValidation">
      <FileInput
        fileList={value}
        setFileList={setValue}
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
