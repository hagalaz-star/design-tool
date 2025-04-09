import React from "react";
import styles from "./Card.module.scss";
import { CardOptions } from "@/types/index";
import { CodeDisplay } from "@/utils/codeGenerators";

interface CardeCodeType {
  options: CardOptions;
  codeFormat: "react-tailwind" | "react-scss";
  formatChange?: (format: "react-tailwind" | "react-scss") => void;
}

function CardCode({ options, codeFormat, formatChange }: CardeCodeType) {
  return (
    <CodeDisplay
      componentType="card"
      options={options}
      styles={styles}
      codeFormat={codeFormat}
      onFormatChange={formatChange}
    />
  );
}

export default CardCode;
