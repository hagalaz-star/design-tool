import React from "react";
import styles from "./Card.module.scss";
import { CardOptions } from "@/types/index";
import { CodeDisplay } from "@/utils/codeGenerators";

interface CardeCodeType {
  options: CardOptions;
}

function CardCode({ options }: CardeCodeType) {
  return <CodeDisplay componentType="card" options={options} styles={styles} />;
}

export default CardCode;
