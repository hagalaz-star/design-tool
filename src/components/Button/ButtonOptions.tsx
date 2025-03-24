import React from "react";
import styles from "./Button.module.scss";
import { ButtonOptions } from "@/types/index";

interface ButtonOptionsProps {
  options: ButtonOptions;
  onOptionChange: (name: string, value: any) => void;
}

function ButtonOptionsPanel({ options, onOptionChange }: ButtonOptionsProps) {
  const renderOptions = () => {
    return (
      <div className={styles.OptionsPanel}>
        <div className={styles.optionItem}>
          <label>색상</label>
          <input
            type="color"
            value={options.backgroundColor}
            onChange={(e) => onOptionChange("backgroundColor", e.target.value)}
          />
        </div>

        <div className={styles.optionItem}>
          <label>크기</label>
          <select
            value={options.size}
            onChange={(e) => onOptionChange("size", e.target.value)}
          >
            <option value="small">작게</option>
            <option value="medium">중간</option>
            <option value="large">크게</option>
          </select>
        </div>

        <div className={styles.optionItem}>
          <label>테두리 반경</label>
          <input
            type="range"
            min="0"
            max="20"
            value={parseInt(options.borderRadius)}
            onChange={(e) =>
              onOptionChange("borderRadius", `${e.target.value}px`)
            }
          />
        </div>
        <div className={styles.optionItem}>
          <label>텍스트</label>
          <input
            type="text"
            value={options.text}
            onChange={(e) => onOptionChange("text", e.target.value)}
          />
        </div>

        <div className={styles.optionItem}>
          <label>텍스트 색상 </label>
          <input
            type="color"
            value={String(options.color)}
            onChange={(e) => onOptionChange("color", e.target.value)}
          />
        </div>
      </div>
    );
  };
  return (
    <div className={styles.OptionsPanel}>
      <h3>옵션 설정</h3>
      {renderOptions()}
    </div>
  );
}

export default ButtonOptionsPanel;
