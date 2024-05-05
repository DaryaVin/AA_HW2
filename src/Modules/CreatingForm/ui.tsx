import React, { useState } from "react";
import {
  Button,
  CheckboxWithValidation,
  ColorWithValidation,
  FieldItem,
  FilesWithValidation,
  Form,
  FormJSONType,
  InputWithValidation,
  SelectWithFilterWithValidation,
} from "../../Shared";

interface ViewFieldItemProps {
  updateValid: (v: boolean) => void;
  updateVal: (v: unknown) => void;
  fieldItem: FieldItem;
  formDirty: boolean;
}

const ViewFieldItem = ({
  fieldItem,
  updateVal,
  updateValid,
  formDirty,
}: ViewFieldItemProps) => {
  const { type, required, label } = fieldItem;

  if (type === "password" || type === "textarea" || type === "text") {
    return (
      <InputWithValidation
        {...fieldItem}
        label={required ? label + "*" : label}
        type={type}
        setIsValid={updateValid}
        updateVal={updateVal}
        id={undefined}
        generalDirty={formDirty}
      />
    );
  }

  if (type === "checkbox") {
    return (
      <CheckboxWithValidation
        {...fieldItem}
        label={required ? label + "*" : label}
        setIsValid={updateValid}
        updateVal={updateVal}
        id={undefined}
        generalDirty={formDirty}
      />
    );
  }

  if (type === "color") {
    return (
      <ColorWithValidation
        {...fieldItem}
        label={required ? label + "*" : label}
        setIsValid={updateValid}
        updateVal={updateVal}
        id={undefined}
        generalDirty={formDirty}
      />
    );
  }

  if (type === "file") {
    const { max_count, max_size, ...props } = fieldItem;
    return (
      <FilesWithValidation
        maxCount={max_count}
        maxSize={max_size}
        {...props}
        label={required ? label + "*" : label}
        setIsValid={updateValid}
        updateVal={updateVal}
        id={undefined}
        generalDirty={formDirty}
      />
    );
  }
  if (type === "select") {
    return (
      <SelectWithFilterWithValidation
        {...fieldItem}
        label={required ? label + "*" : label}
        setIsValid={updateValid}
        updateVal={updateVal}
        id={undefined}
        generalDirty={formDirty}
      />
    );
  }
  return <></>;
};

interface CreatingFormProps {
  formItem: FormJSONType;
  onClickDelFormBtn?: () => void;
}
export const CreatingForm = ({
  formItem,
  onClickDelFormBtn,
}: CreatingFormProps) => {
  const { form_buttons, form_description, form_fields, form_name } = formItem;

  const [formDirty, setFormDirty] = useState<boolean>(false);
  const [formFieldsVal, setFormFieldsVal] = useState<{ [id: string]: unknown }>(
    {}
  );
  const [formFieldsValid, setFormFieldsValid] = useState<{
    [id: string]: boolean;
  }>({});

  const [imiSimulateServerResponse, setImiSimulateServerResponse] = useState<{
    status: "unsent" | "sent" | "loading";
    message?: string;
  }>({ status: "unsent" });

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await setFormDirty(true);

    let isValid = true;

    Object.values(formFieldsValid).forEach((valid) => {
      isValid = valid && isValid;
    });

    if (isValid) {
      await setImiSimulateServerResponse({ status: "loading" });
      await new Promise((resolve) => setTimeout(resolve, 3000));
      console.log("formFieldsVal", { form_name, ...formFieldsVal });
      await setImiSimulateServerResponse({
        status: "sent",
        message: "Ваша форма отправлена",
      });
    }
  };

  const formBtnsBlock: React.ReactNode[] = [];
  form_buttons.forEach((buttonItem) => {
    const { name, type } = buttonItem;
    formBtnsBlock.push(
      <Button
        label={name}
        type={type}
        theme={type === "submit" ? "fillBcg" : "withBorder"}
        key={name}
      />
    );
  });

  const sentBtnBlock = [
    <Button
      label={"Заполнить форму еще раз"}
      key={1}
      onClick={() => {
        setImiSimulateServerResponse({ status: "unsent" });
        setFormDirty(false);
      }}
    />,
  ];

  return (
    <Form
      name={form_name}
      description={form_description}
      buttonBlock={
        imiSimulateServerResponse.status === "unsent"
          ? formBtnsBlock
          : imiSimulateServerResponse.status === "sent"
            ? sentBtnBlock
            : []
      }
      onSubmit={onSubmit}
      onClickDelFormBtn={onClickDelFormBtn}
    >
      {imiSimulateServerResponse.status === "unsent" &&
        form_fields.map((field) => {
          const updateValidField = (valid: boolean) => {
            setFormFieldsValid({
              ...formFieldsValid,
              [field.id]: valid,
            });
          };
          const updateValField = (val: unknown) => {
            setFormFieldsVal({
              ...formFieldsVal,
              [field.id]: val,
            });
          };
          return (
            <ViewFieldItem
              key={field.id}
              fieldItem={field}
              updateVal={updateValField}
              updateValid={updateValidField}
              formDirty={formDirty}
            />
          );
        })}
      {imiSimulateServerResponse.status === "sent" && (
        <p>{imiSimulateServerResponse.message}</p>
      )}
      {imiSimulateServerResponse.status === "loading" && (
        <p>Идет отправка вашей формы...</p>
      )}
    </Form>
  );
};
