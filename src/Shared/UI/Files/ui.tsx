import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import "./style.scss";
import { Accept, FileError, FileRejection, useDropzone } from "react-dropzone";

const fullAcceps: Accept = {
  "image/png": [".png"],
  "image/jpeg": [".jpeg"],
  "image/jpg": [".jpg"],
  "application/json": [".json"],
};
const getAcceps = (formats: string) => {
  const accepsSplit = formats.split(",");
  const acceps: Accept = {};
  accepsSplit.forEach((accep) => {
    acceps[accep.trim()] = fullAcceps[accep.trim()];
  });

  return acceps;
};

const removeFileFromFileList = (files: FileList, index: number) => {
  const newFiles = new DataTransfer();
  for (let i = 0; i < files.length; i++) {
    if (index !== i) newFiles.items.add(files[i]);
  }
  return newFiles.files;
};

interface FilesProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  formats?: string;
  fileList: FileList | null;
  setFileList: (val: FileList | null) => void;
  label?: string;
  maxSize?: number;
  maxCount?: number;
  isError?: boolean;
  onDirty?: (val: boolean) => void;
}
const Files = forwardRef(
  (
    {
      className,
      label,
      formats,
      fileList,
      setFileList,
      multiple,
      maxSize,
      maxCount,
      onDirty,
      isError,
      ...props
    }: FilesProps,
    ref
  ) => {
    const [errorMessage, setErrorMessage] = useState<string[]>([]);
    const innerRef = useRef<HTMLInputElement>(null);
    useImperativeHandle(ref, () => innerRef.current);

    useEffect(() => {
      if (innerRef.current) innerRef.current.files = fileList;
    }, [fileList]);

    const onDrop = (acceptedFiles: File[]) => {
      setErrorMessage(() => []);
      if (onDirty) onDirty(true);

      const newAcceptedFiles = maxCount
        ? [...acceptedFiles.slice(0, maxCount)]
        : acceptedFiles;
      const newFiles = new DataTransfer();
      newAcceptedFiles.forEach((file) => {
        newFiles.items.add(file);
      });
      if (maxCount) {
        [...acceptedFiles.slice(maxCount)].forEach((file) => {
          setErrorMessage((prev) => [
            ...prev,
            `Файл ${file.name} не загружен: превышено максимальное количество файлов ${maxCount}`,
          ]);
        });
      }
      setFileList(newFiles.files);
    };

    const onDropRejected = (fileRejections: FileRejection[]) => {
      const newErrorMessage: string[] = [];
      fileRejections.forEach((fileRejection) => {
        const { file, errors } = fileRejection;
        let errorStr = "Файл " + file.name + " не загружен: ";
        errors.forEach((error, index) => {
          errorStr += error.message + (index !== errors.length - 1 ? ", " : "");
        });
        newErrorMessage.push(errorStr);
      });

      setErrorMessage(newErrorMessage);
    };

    const validator = (file: File): FileError | FileError[] | null => {
      if (maxSize && file.size > maxSize) {
        return {
          code: "size-too-large",
          message: `размер файла превышает максимально дозволенный ${(
            maxSize / 1024
          ).toFixed(0)}KB`,
        };
      }
      return null;
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
      onDrop,
      onDropRejected,
      accept: formats ? getAcceps(formats) : undefined,
      multiple,
      validator,
    });

    const onClickDellFileBtn = (
      e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
      index: number
    ) => {
      e.stopPropagation();
      e.preventDefault();
      if (fileList) setFileList(removeFileFromFileList(fileList, index));
      setErrorMessage([]);
    };

    return (
      <div className={"fileInput_label"}>
        {label}
        <div
          className={
            "fileInput" +
            (className ? " " + className : "") +
            (isDragActive ? " fileInput_dragAndDrop" : "") +
            (isError ? " fileInput_isError" : "")
          }
          {...getRootProps()}
        >
          <input
            {...getInputProps()}
            {...props}
            type="file"
            ref={innerRef}
            accept={formats}
          />
          {(!fileList || fileList?.length === 0) && (
            <p className="fileInput__welcomeInscription">
              <span className="fileInput__welcomeInscription_spec">
                Выберите файл
              </span>{" "}
              или перетащите в форму
            </p>
          )}
          {(!fileList || fileList?.length === 0) &&
            errorMessage.length === 0 && (
              <p className="fileInput__discription">
                {"Для загрузки доступны файлы " +
                  (formats ? formats + " формата" : "") +
                  (maxSize
                    ? " максимального размера в " +
                      (maxSize / 1024).toFixed(0) +
                      "KB"
                    : "") +
                  (maxCount && multiple
                    ? ", максимальное количество " + maxCount
                    : "")}
              </p>
            )}
          {fileList && fileList?.length !== 0 && (
            <ul className="fileInput__fileList">
              {Array.from(fileList).map((file, index) => {
                return (
                  <li key={file.name} className="fileInput__fileItem">
                    <p className="fileInput__fileItemText">
                      {file.name}
                      <span className="fileInput__fileItemSizeText">
                        {(file.size / 1024).toFixed(0) + "KB"}
                      </span>
                    </p>
                    <button
                      type="button"
                      className="fileInput__delFileBtn"
                      onClick={(e) => {
                        onClickDellFileBtn(e, index);
                      }}
                    >
                      Удалить файл
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
          {errorMessage.length !== 0 && (
            <ul className="fileInput__erorsList">
              {errorMessage.map((error, index) => {
                return (
                  <li key={index} className="fileInput__errorItem">
                    {error}
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    );
  }
);

Files.displayName = "FileInput";

export const FileInput = Files;
