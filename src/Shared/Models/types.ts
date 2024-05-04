interface InputItem {
  id: string;
  type: "text" | "password" | "textarea";
  label: string;
  required?: boolean;
  placeholder?: string;
  maxlength?: number;
  minlength?: number;
  pattern?: string;
  mask?: string;
}

interface FileInputItem {
  id: string;
  type: "file";
  label: string;
  required?: boolean;
  formats?: string;
  max_size?: number;
  max_count?: number;
}

interface CheckboxItem {
  id: string;
  type: "checkbox";
  label: string;
  required?: boolean;
}

interface SelectItem {
  id: string;
  type: "select";
  label: string;
  required?: boolean;
  multiple?: boolean;
  options: string[];
}

interface ColorItem {
  id: string;
  type: "color";
  label: string;
  required?: boolean;
  options: string[];
}

export type FieldItem =
  | InputItem
  | FileInputItem
  | CheckboxItem
  | SelectItem
  | ColorItem;

export type FormJSONType = {
  form_name: string;
  form_description?: string;
  form_fields: FieldItem[];
  form_buttons: {
    name: string;
    type: "submit" | "button";
  }[];
};
