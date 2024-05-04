import React from "react";
import "./style.scss";

interface PopupProps {
  title: string;
}

export const Popup = ({ title }: PopupProps) => {
  return <div>{title}</div>;
};
