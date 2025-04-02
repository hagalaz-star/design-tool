import React from "react";
import { CardOptions } from "@/types";
import styles from "./Card.module.scss";

interface CardOptionsProps {
  options: CardOptions;
  onOptionChange: (name: string, value: any) => void;
}

function CardOptionsPanel({ options, onOptionChange }: CardOptionsProps) {
  const renderOptions = () => {
    return (
      <div>
        <div className={styles.optionItem}>
          <label>배경색</label>
          <input
            type="color"
            value={options.backgroundColor}
            onChange={(e) => onOptionChange("backgroundColor", e.target.value)}
          />
        </div>

        <div className={styles.optionItem}>
          <label>테두리 반경</label>
          <input
            type="range"
            min="0"
            max="10"
            value={parseInt(options.borderRadius)}
            onChange={(e) =>
              onOptionChange("borderRadius", `${e.target.value}px`)
            }
          />
        </div>

        <div className={styles.optionItem}>
          <label>명암</label>
          <select
            value={options.shadow}
            onChange={(e) => onOptionChange("shadow", e.target.value)}
          >
            <option value="small">작게</option>
            <option value="medium">중간</option>
            <option value="large">크게</option>
          </select>
        </div>

        <div className={styles.optionItem}>
          <label>넓이 조절</label>
          <input
            type="number"
            value={parseInt(options.padding) || 0}
            onChange={(e) => onOptionChange("padding", `${e.target.value}px`)}
          />
        </div>

        <div className={styles.optionItem}>
          <label>타이틀 색상 </label>
          <input
            type="color"
            value={options.color}
            onChange={(e) => onOptionChange("color", e.target.value)}
          />
        </div>
      </div>
    );
  };
  return (
    <div className={styles.OptionsPanel}>
      <h3>옵션 설정</h3>
      <br></br>
      {renderOptions()}
    </div>
  );
}

export default CardOptionsPanel;
