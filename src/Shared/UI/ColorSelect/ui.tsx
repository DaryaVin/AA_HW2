import React, { useEffect, useState } from "react";
import "./style.scss";
import { SelectProps } from "../SelectWithFilter/ui";
import { Select } from "../Select/ui";

export const ColorSelect = ({
  options,
  label,
  multiple,
  className,
  value,
  setValue,
  isError,
  onDirty,
}: SelectProps) => {
  const [isShow, setIsShow] = useState<boolean>(false);
  const [isShowTrueFirst, setIsShowTrueFirst] = useState<boolean>(false);

  useEffect(() => {
    if (isShow && !isShowTrueFirst) {
      setIsShowTrueFirst(true);
    }
    if (!isShow && isShowTrueFirst && onDirty) {
      onDirty(true);
    }
  }, [isShow]);

  const updateValue = (option: string) => {
    if (multiple && Array.isArray(value)) {
      if (value.includes(option)) {
        setValue([
          ...value.filter((item) => {
            return item !== option;
          }),
        ]);
      } else {
        setValue([...value, option]);
      }
    } else {
      if (value === option) {
        setValue("");
      } else {
        setValue(option);
      }
    }
  };

  const onClickReasetBtn = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();
    if (multiple) {
      setValue([]);
    } else {
      setValue("");
    }
  };

  const mainFieldSlot = (
    <div className="selectColor__mainField">
      <div className={"selectColor__value"}>
        {multiple &&
          Array.isArray(value) &&
          value.map((val) => {
            return (
              <span
                key={val}
                className="selectColor__colorItem"
                style={{
                  backgroundColor: val,
                }}
              >
                {val}
              </span>
            );
          })}
        {!multiple && value !== "" && !Array.isArray(value) && (
          <span
            className={"selectColor__colorItem"}
            style={{
              backgroundColor: value,
            }}
          >
            {value}
          </span>
        )}
      </div>
      {((!Array.isArray(value) && value === "") ||
        (Array.isArray(value) && value.length === 0)) && (
        <span className="selectColor__colorItem selectColor__colorItem_default">
          Цвет не выбран
        </span>
      )}
      {((!Array.isArray(value) && value !== "") ||
        (Array.isArray(value) && value.length !== 0)) && (
        <button
          className="selectColor__resetBtn"
          type="button"
          onClick={(e) => {
            onClickReasetBtn(e);
          }}
        >
          Очистить
        </button>
      )}
    </div>
  );
  const optionsSlot = (
    <ul className="selectColor__optionList">
      {options.map((option) => {
        return (
          <li key={option} role="option" className={"selectColor__optionItem"}>
            <label
              className={
                "selectColor__optionsLabel selectColor__colorItem" +
                ((multiple && value.includes(option)) ||
                (!multiple && value === option)
                  ? " selectColor__optionsLabel_checked"
                  : "")
              }
              style={{
                backgroundColor: option,
              }}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === " ") updateValue(option);
              }}
            >
              <input
                type={multiple ? "checkbox" : "radio"}
                value={option}
                className="selectColor__optionsInput"
                checked={
                  (multiple && value.includes(option)) ||
                  (!multiple && value === option)
                }
                tabIndex={-1}
                onChange={() => {
                  updateValue(option);
                }}
              />

              {option}
            </label>
          </li>
        );
      })}
    </ul>
  );

  return (
    <div className="selectColor" aria-label={label}>
      {label}
      <Select
        show={isShow}
        setShow={setIsShow}
        mainFieldSlot={mainFieldSlot}
        optionsSlot={optionsSlot}
        className={"selectColor_select" + (className ? " " + className : "")}
        isError={isError}
      />
    </div>
  );
};
