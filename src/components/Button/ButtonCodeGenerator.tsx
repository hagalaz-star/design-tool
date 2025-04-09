import React from "react";
import { ButtonOptions } from "@/types";
import styles from "./Button.module.scss";
import { CodeDisplay } from "@/utils/codeGenerators";

interface ButtonCodeType {
  options: ButtonOptions;
  codeFormat: "react-tailwind" | "react-scss";
  onFormatChange: (format: "react-tailwind" | "react-scss") => void;
}

function ButtonCode({ options, codeFormat, onFormatChange }: ButtonCodeType) {
  return (
    <CodeDisplay
      codeFormat={codeFormat}
      componentType="button"
      options={options}
      styles={styles}
      onFormatChange={onFormatChange}
    />
  );
}

export default ButtonCode;
