import React, { useEffect, useRef, useState } from "react";
import "./style.scss";
import { Select } from "../Select/ui";

export interface SelectProps {
  id?: string;
  type?: string;
  label?: string;
  required?: boolean;
  options: string[];
  className?: string;
  isError?: boolean;
  onDirty?: (v: boolean) => void;
  multiple?: boolean;
  value: string[] | string;
  setValue: (val: string[] | string) => void;
}

export const SelectWithFilter = ({
  label,
  multiple,
  options,
  className,
  value,
  onDirty,
  isError,
  setValue,
}: SelectProps) => {
  const [isShow, setIsShow] = useState<boolean>(false);
  const [filterText, setFilterText] = useState<string>("");
  const [isFiterInputInFocus, setIsFiterInputInFocus] =
    useState<boolean>(false);

  const [isShowTrueFirst, setIsShowTrueFirst] = useState<boolean>(false);

  const filterInputRef = useRef<HTMLInputElement>(null);
  const infoConteinerRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isShow) {
      filterInputRef.current?.focus();
    } else {
      filterInputRef.current?.blur();
    }

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

  const onChangeFilterText = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFilterText = e.target.value;
    let isFullCoincidence = false;
    options.forEach((option) => {
      if (newFilterText.toLocaleLowerCase() === option.toLocaleLowerCase()) {
        setFilterText("");
        if (!multiple) filterInputRef.current?.blur();
        isFullCoincidence = true;
        updateValue(option);
      }
    });
    if (!isFullCoincidence) setFilterText(newFilterText);
  };

  const filterOption = () => {
    return options.filter((option) => {
      if (filterText === "") return true;
      return option
        .toLocaleLowerCase()
        .includes(filterText.toLocaleLowerCase());
    });
  };

  const onClickReasetBtn = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (multiple) {
      setValue([]);
    } else {
      setValue("");
    }
  };

  const mainFieldSlot = (
    <div className="selectWithFilter__mainFieldSlotWrap">
      <div className="selectWithFilter__infoConteiner" ref={infoConteinerRef}>
        <div
          className={
            "selectWithFilter__label" +
            (isShow ||
            (!Array.isArray(value) && value !== "") ||
            (Array.isArray(value) && value.length > 0)
              ? " selectWithFilter__label_small"
              : "")
          }
        >
          {label}
        </div>
        <div
          className={
            "selectWithFilter__value" +
            (!isShow &&
            ((!Array.isArray(value) && value === "") ||
              (Array.isArray(value) && value.length === 0))
              ? " selectWithFilter__value_small"
              : "")
          }
        >
          {multiple &&
            Array.isArray(value) &&
            value.map((val) => {
              return (
                <span key={val} className="selectWithFilter__valueItem">
                  {val + ", "}
                </span>
              );
            })}
          {!multiple && (
            <span
              className={
                "selectWithFilter__valueItem" +
                (isFiterInputInFocus
                  ? " selectWithFilter__valueItem_hidden"
                  : "")
              }
            >
              {!isFiterInputInFocus && value}
            </span>
          )}
          <input
            type="text"
            placeholder={"Example, " + options[0]}
            className={
              "selectWithFilter__filterInput" +
              ((isShow && multiple) || (!multiple && isFiterInputInFocus)
                ? " selectWithFilter__filterInput_inShow"
                : "")
            }
            onChange={onChangeFilterText}
            ref={filterInputRef}
            value={filterText}
            onFocus={() => {
              setIsFiterInputInFocus(true);
              setIsShow(true);
            }}
            onBlur={() => {
              setIsFiterInputInFocus(false);
            }}
          />
        </div>
      </div>
      {((!Array.isArray(value) && value !== "") ||
        (Array.isArray(value) && value.length !== 0)) && (
        <button
          className="selectWithFilter__resetBtn"
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
    <ul className="selectWithFilter__optionsList">
      {filterOption().length > 0 ? (
        filterOption().map((option) => {
          return (
            <li key={option} role="option" className={"select__optionItem"}>
              <label
                className={
                  "selectWithFilter__optionsLabel" +
                  ((multiple && value.includes(option)) ||
                  (!multiple && value === option)
                    ? " selectWithFilter__optionsLabel_checked"
                    : "")
                }
              >
                <input
                  type={multiple ? "checkbox" : "radio"}
                  value={option}
                  className="selectWithFilter__optionsInput"
                  checked={
                    (multiple && value.includes(option)) ||
                    (!multiple && value === option)
                  }
                  onChange={() => {
                    updateValue(option);
                  }}
                />

                {option}
              </label>
            </li>
          );
        })
      ) : (
        <li className="selectWithFilter__optionsLabel">Ничего не найдено</li>
      )}
    </ul>
  );

  return (
    <Select
      show={isShow}
      setShow={setIsShow}
      onClickMainField={() => {
        filterInputRef.current?.focus();
      }}
      mainFieldSlot={mainFieldSlot}
      optionsSlot={optionsSlot}
      className={className}
      isError={isError}
    />
  );
};
