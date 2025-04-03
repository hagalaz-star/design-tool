import React from "react";
import { ButtonOptions } from "@/types";
import styles from "./Button.module.scss";
import { CodeDisplay } from "@/utils/codeGenerators";

interface ButtonCodeType {
  options: ButtonOptions;
}

function ButtonCode({ options }: ButtonCodeType) {
  return (
    <CodeDisplay componentType="button" options={options} styles={styles} />
  );
}

export default ButtonCode;
