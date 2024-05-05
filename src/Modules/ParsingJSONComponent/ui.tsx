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
  indexItemForDelete?: number[];
  setIndexItemForDelete?: (val: number[]) => void;
}
export const ParsingJSONComponent = ({
  setDataFormsJSON,
  indexItemForDelete,
  setIndexItemForDelete,
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

  useEffect(() => {
    if (indexItemForDelete && indexItemForDelete.length !== 0 && fileList) {
      const newFiles = new DataTransfer();
      for (let i = 0; i < fileList.length; i++) {
        if (!indexItemForDelete.includes(i)) newFiles.items.add(fileList[i]);
      }
      setFileList(newFiles.files);
      if (setIndexItemForDelete) setIndexItemForDelete([]);
    }
  }, [indexItemForDelete]);

  return (
    <FileInput
      fileList={fileList}
      setFileList={setFileList}
      formats="application/json"
      multiple
    />
  );
};
