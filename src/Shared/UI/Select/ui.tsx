import React, { useEffect, useRef } from "react";
import "./style.scss";

interface SelectProps {
  className?: string;
  show: boolean;
  setShow: (val: boolean) => void;
  onClickMainField?: (
    e: React.MouseEvent<HTMLDivElement> | React.KeyboardEvent<HTMLDivElement>
  ) => void;
  mainFieldSlot: React.ReactNode;
  optionsSlot: React.ReactNode;
  isError?: boolean;
}

export const Select = ({
  className,
  show,
  setShow,
  onClickMainField,
  mainFieldSlot,
  optionsSlot,
  isError,
}: SelectProps) => {
  const selectRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (e.target instanceof Node && !selectRef.current?.contains(e.target)) {
        setShow(false);
      }
    };
    document.addEventListener("click", onClickOutside);
    return () => {
      document.removeEventListener("click", onClickOutside);
    };
  }, []);

  const onClickSelectBtn = (
    e: React.MouseEvent<HTMLDivElement> | React.KeyboardEvent<HTMLDivElement>,
    newShow: boolean
  ) => {
    if (onClickMainField) onClickMainField(e);
    setShow(newShow);
  };

  return (
    <div
      className={"select" + (className ? " " + className : "")}
      ref={selectRef}
    >
      <div
        className={
          "select__mainFieldSlot" +
          (show ? " select__mainFieldSlot_open" : "") +
          (isError ? " select__mainFieldSlot_error" : "")
        }
        role="combobox"
        aria-labelledby="select button"
        aria-haspopup="listbox"
        aria-expanded={show}
        onClick={(e) => {
          onClickSelectBtn(e, true);
        }}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.code === "Enter") onClickSelectBtn(e, !show);
        }}
      >
        {mainFieldSlot}
      </div>
      {show && (
        <div
          className={
            "select__optionsSlot" +
            (isError ? " select__optionsSlot_error" : "")
          }
          role="listbox"
        >
          {optionsSlot}
        </div>
      )}
    </div>
  );
};
