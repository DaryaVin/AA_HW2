import React from "react";
import "./style.scss";
import { Button } from "../Button/ui";

interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  className?: string;
  children: React.ReactNode | React.ReactNode[];
  onClickDelFormBtn?: (
    e?: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
  name: string;
  description?: string;
  buttonBlock?: React.ReactNode | React.ReactNode[];
}

export const Form = ({
  children,
  name,
  description,
  className,
  onClickDelFormBtn,
  buttonBlock,
  ...props
}: FormProps) => {
  return (
    <form {...props} className={"form" + (className ? " " + className : "")}>
      <Button
        type="button"
        className="form__delFormBtn"
        onClick={onClickDelFormBtn}
        theme="roundWithPlus"
      >
        Удалить форму
      </Button>
      <header className="form__headerBlock">
        <h4 className="form__name">{name}</h4>
        {description && <p className="form__description">{description}</p>}
      </header>
      <fieldset className="form__fieldsList">{children}</fieldset>

      <footer className="form__btnsBlock">{buttonBlock}</footer>
    </form>
  );
};
