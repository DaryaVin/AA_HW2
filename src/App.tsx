import React, { useRef, useState } from "react";
import "./App.css";
import {
  Button,
  Checkbox,
  ColorSelect,
  FileInput,
  Form,
  Input,
  SelectWithFilter,
} from "./Shared";
import { InputWithValidation } from "./Modules";

function App() {
  const ref = useRef<HTMLInputElement>(null);

  const parseJsonFile = async (file: File): Promise<fileType> => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsText(file);
      fileReader.onload = (event) => {
        return (
          event.target?.result &&
          typeof event.target.result === "string" &&
          resolve(JSON.parse(event.target.result) as fileType)
        );
      };
      fileReader.onerror = (error) => reject(error);
    });
  };

  const removeFileFromFileList = (files: FileList, index: number) => {
    const newFiles = new DataTransfer();

    for (let i = 0; i < files.length; i++) {
      if (index !== i) newFiles.items.add(files[i]);
    }

    return newFiles.files;
  };

  type fileType = {
    form_buttons: {
      name: string;
      type: string;
    };
    form_fields: {
      type: string;
      [key: string]: string | number | boolean;
    }[];
    form_name: string;
  };

  const onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    const fileArr: fileType[] = [];
    // const typeObj: {
    //   [key: string]: Set<string>;
    // } = {};

    if (files) {
      for (let index = 0; index < files.length; index++) {
        if (files[index].type === "application/json") {
          fileArr.push(await parseJsonFile(files[index]));
        } else {
          alert(
            `Файл ${files[index].name} имеет не подходящий формат. Поэтому он не был загружен`
          );
          e.target.files = removeFileFromFileList(files, index);
        }
      }
    }

    // fileArr.forEach((file) => {
    //   const fields = file.form_fields;
    //   fields.forEach((field) => {
    //     for (const key in field) {
    //       if (!typeObj[field.type]) {
    //         typeObj[field.type] = new Set();
    //       }
    //       typeObj[field.type].add(key);
    //     }
    //   });
    // });
    // const typeObjArr: {
    //   [key: string]: Array<string>;
    // } = {};
    // for (const key in typeObj) {
    //   typeObjArr[key] = Array.from(typeObj[key]);
    // }
    // console.log(typeObjArr);
  };

  const [selectValue, setSelectValue] = useState<string>("");
  const [inputValue, setInputValue] = useState<string>("");
  const [colorSelectValue, setColorSelectValue] = useState<string>("");
  const [selectValueMult, setSelectValueMult] = useState<string[]>([]);
  const [colorSelectValueMult, setColorSelectValueMult] = useState<string[]>(
    []
  );
  const [fileList, setFileList] = useState<FileList | null>(null);

  const options = ["1item", "2item", "3item"];

  const [checked, setChecked] = useState<boolean | undefined>(undefined);

  const inputValidProps = {
    id: "password",
    label: "Пароль",
    required: true,
    placeholder: "Введите ваш пароль",
    maxlength: 50,
    minlength: 8,
    pattern: "^(?=.*[a-zA-Z])(?=.*[0-9!@#$%^&*()]).{8,50}$",
  };
  return (
    <div className="App">
      <input
        type="file"
        onChange={onChange}
        multiple
        ref={ref}
        accept="application/JSON"
      />

      <SelectWithFilter
        options={options}
        label="label"
        multiple
        value={selectValueMult}
        setValue={setSelectValueMult}
      />
      <SelectWithFilter
        options={options}
        label="label"
        value={selectValue}
        setValue={setSelectValue}
      />
      <ColorSelect
        options={["red", "blue", "white", "pink", "orange"]}
        label="label"
        value={colorSelectValue}
        setValue={setColorSelectValue}
      />
      <ColorSelect
        options={["red", "blue", "white"]}
        label="label"
        value={colorSelectValueMult}
        setValue={setColorSelectValueMult}
        multiple
      />
      <FileInput
        fileList={fileList}
        setFileList={setFileList}
        formats="application/json"
        label="label"
        maxCount={5}
        maxSize={1000}
      />
      <Button theme="fillBcg">label</Button>
      <Button theme="roundWithPlus">label</Button>
      <Button theme="withBorder">label</Button>
      <Button theme="fillBcg" disabled>
        label
      </Button>
      <Button theme="roundWithPlus" disabled>
        label
      </Button>
      <Button theme="withBorder" disabled>
        label
      </Button>
      <Checkbox checked={checked} onChange={setChecked} label="label" />
      <Checkbox
        checked={checked}
        onChange={setChecked}
        label="label"
        disabled
      />
      <Checkbox checked={checked} onChange={setChecked} label="label" isError />
      <Input
        value={inputValue}
        setValue={setInputValue}
        label="label"
        placeholder="placeholder"
      />
      <Input
        value={inputValue}
        setValue={setInputValue}
        label="label"
        placeholder="placeholder"
        disabled
      />

      <Form
        name="label"
        description="description"
        buttonBlock={[
          <Button key={1} label={"submit"} />,
          <Button key={1} label={"submit"} />,
        ]}
      >
        <Input
          value={inputValue}
          setValue={setInputValue}
          label="label"
          placeholder="placeholder"
          isError
        />
        <Input
          value={inputValue}
          setValue={setInputValue}
          label="label"
          placeholder="placeholder"
          isError
          disabled
        />
        <InputWithValidation type="password" {...inputValidProps} />
      </Form>
    </div>
  );
}

export default App;
