import React, { useEffect, useRef } from "react";
import "./style.scss";

interface SelectProps {
  className?: string;
  show: boolean;
  setShow: (val: boolean) => void;
  onClickMainField?: (e: React.MouseEvent<HTMLDivElement>) => void;
  mainFieldSlot: React.ReactNode;
  optionsSlot: React.ReactNode;
}

export const Select = ({
  className,
  show,
  setShow,
  onClickMainField,
  mainFieldSlot,
  optionsSlot,
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

  const onClickSelectBtn = (e: React.MouseEvent<HTMLDivElement>) => {
    if (onClickMainField) onClickMainField(e);
    setShow(true);
  };

  return (
    <div
      className={"select" + (className ? " " + className : "")}
      ref={selectRef}
    >
      <div
        className={
          "select__mainFieldSlot" + (show ? " select__mainFieldSlot_open" : "")
        }
        role="combobox"
        aria-labelledby="select button"
        aria-haspopup="listbox"
        aria-expanded={show}
        onClick={onClickSelectBtn}
      >
        {mainFieldSlot}
      </div>
      {show && (
        <div className="select__optionsSlot" role="listbox">
          {optionsSlot}
        </div>
      )}
    </div>
  );
};
