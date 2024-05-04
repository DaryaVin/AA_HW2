import { useEffect, useState } from "react";

interface ValidatorProps {
  value: string | string[] | FileList | null | undefined | boolean;
  options: {
    required?: boolean;
    maxlength?: number;
    minlength?: number;
    pattern?: string;
  };
}

interface validatorMessage {
  required?: string;
  maxlength?: string;
  minlength?: string;
  pattern?: string;
}

export interface ValidationReturn {
  isDirty: boolean;
  setIsDirty: React.Dispatch<React.SetStateAction<boolean>>;
  isValid: boolean;
  message: validatorMessage;
}

export const useValidationFieldForm = ({
  value,
  options,
}: ValidatorProps): ValidationReturn => {
  const { required, maxlength, minlength, pattern } = options;

  let firstValueIsDirty: boolean = false;

  if (value instanceof FileList || Array.isArray(value)) {
    if (value.length !== 0) firstValueIsDirty = true;
  } else {
    firstValueIsDirty = !!value;
  }

  const [isDirty, setIsDirty] = useState<boolean>(firstValueIsDirty);
  const [isRequired, setIsRequired] = useState<boolean>(true);
  const [isMinLength, setIsMinLength] = useState<boolean>(true);
  const [isMaxLength, setIsMaxLength] = useState<boolean>(true);
  const [isValidPattern, setIsValidPattern] = useState<boolean>(true);
  const [message, setMessage] = useState<validatorMessage>({});

  useEffect(
    () => {
      const mess: validatorMessage = message;
      let requiredStatus = true;
      let minLengthStatus = true;
      let maxLengthStatus = true;
      let validPatternStatus = true;

      const validityСheckItem = (item: unknown) => {
        if (required) {
          if (
            item === "" ||
            item === undefined ||
            item === null ||
            (Array.isArray(item) && item.length === 0) ||
            (value instanceof FileList && value.length === 0)
          ) {
            mess.required = "Это поле должно быть заполнено";
            requiredStatus = false;
          }
        }
        if (minlength && typeof item === "string") {
          if (item.length < minlength) {
            minLengthStatus = false;
            mess.minlength =
              "Минимальная допустимая длина этого поля " +
              minlength +
              " символов";
          }
        }
        if (maxlength && typeof item === "string") {
          if (item.length > maxlength) {
            maxLengthStatus = false;
            mess.maxlength =
              "Максимально допустимая длина этого поля " +
              maxlength +
              " символов";
          }
        }

        if (pattern && typeof item === "string") {
          const re = new RegExp(pattern);
          if (!re.test(item)) {
            validPatternStatus = false;
            mess.pattern = "Поле заполнено не по паттерну";
          }
        }
      };

      validityСheckItem(value);

      if (requiredStatus) mess.required = "";
      if (minLengthStatus) mess.minlength = "";
      if (maxLengthStatus) mess.maxlength = "";
      if (validPatternStatus) mess.pattern = "";

      setIsRequired(requiredStatus);
      setIsMinLength(minLengthStatus);
      setIsMaxLength(maxLengthStatus);
      setIsValidPattern(validPatternStatus);

      setMessage(mess);
    },
    Array.isArray(value) ? [value.length] : [value]
  );

  return {
    isDirty,
    setIsDirty,
    isValid: isRequired && isMinLength && isMaxLength && isValidPattern,
    message,
  };
};
