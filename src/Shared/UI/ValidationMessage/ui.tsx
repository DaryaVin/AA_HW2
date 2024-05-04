import React from "react";
import "./style.scss";
import { ValidationReturn } from "../../Hooks/useValidation";

interface ValidationMessageProps {
  className?: string;
}
export const ValidationMessage = ({
  isDirty,
  isValid,
  message,
  className,
}: ValidationReturn & ValidationMessageProps) => {
  return (
    <>
      {isDirty && !isValid && (
        <ul
          className={
            "validationMessage__list" + (className ? " " + className : "")
          }
        >
          {Object.entries(message).map(([key, val]) => {
            return (
              val !== "" && (
                <li key={key} className="validationMessage__item">
                  {val}
                </li>
              )
            );
          })}
        </ul>
      )}
    </>
  );
};
