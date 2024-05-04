import React, { useEffect, useState } from "react";
import { FileInput, FormJSONType } from "../../Shared";

const parseJsonFile = async (file: File): Promise<FormJSONType> => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsText(file);
    fileReader.onload = (event) => {
      return (
        event.target?.result &&
        typeof event.target.result === "string" &&
        resolve(JSON.parse(event.target.result) as FormJSONType)
      );
    };
    fileReader.onerror = (error) => reject(error);
  });
};

interface ParsingJSONComponentProps {
  setDataFormsJSON: (val: FormJSONType[]) => void;
}
export const ParsingJSONComponent = ({
  setDataFormsJSON,
}: ParsingJSONComponentProps) => {
  const [fileList, setFileList] = useState<FileList | null>(null);

  const parseFileList = async (fileList: FileList) => {
    const fileArr: FormJSONType[] = [];

    if (fileList) {
      for (let index = 0; index < fileList.length; index++) {
        if (fileList[index].type === "application/json") {
          fileArr.push(await parseJsonFile(fileList[index]));
        }
      }
    }
    setDataFormsJSON(fileArr);
  };
  useEffect(() => {
    if (fileList) parseFileList(fileList);
  }, [fileList]);
  return (
    <FileInput
      fileList={fileList}
      setFileList={setFileList}
      formats="application/json"
      multiple
    />
  );
};
