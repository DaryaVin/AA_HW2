import React from "react";
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

const ViewFieldItem = ({ fieldItem }: { fieldItem: FieldItem }) => {
  const { type } = fieldItem;

  if (type === "password" || type === "textarea" || type === "text") {
    return <InputWithValidation {...fieldItem} />;
  }

  if (type === "checkbox") {
    return <CheckboxWithValidation {...fieldItem} />;
  }

  if (type === "color") {
    return <ColorWithValidation {...fieldItem} />;
  }

  if (type === "file") {
    const { max_count, max_size, ...props } = fieldItem;
    return (
      <FilesWithValidation maxCount={max_count} maxSize={max_size} {...props} />
    );
  }
  if (type === "select") {
    return <SelectWithFilterWithValidation {...fieldItem} />;
  }
  return <></>;
};

interface CreatingFormProps {
  formItem: FormJSONType;
}
export const CreatingForm = ({ formItem }: CreatingFormProps) => {
  const { form_buttons, form_description, form_fields, form_name } = formItem;
  const btnsBlock: React.ReactNode[] = [];
  form_buttons.forEach((buttonItem) => {
    const { name, type } = buttonItem;
    btnsBlock.push(
      <Button
        label={name}
        type={type}
        theme={type === "submit" ? "fillBcg" : "withBorder"}
      />
    );
  });
  return (
    <Form
      name={form_name}
      description={form_description}
      buttonBlock={btnsBlock}
    >
      {form_fields.map((field) => {
        return <ViewFieldItem key={field.id} fieldItem={field} />;
      })}
    </Form>
  );
};
