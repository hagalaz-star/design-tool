import React from "react";
import styles from "./Navbar.module.scss";
import { NavbarOptions } from "@/types";

interface NavbarOptionsProps {
  options: NavbarOptions;
  onOptionChange: (name: string, value: any) => void;
}

function NavbarOptionsPanel({ options, onOptionChange }: NavbarOptionsProps) {
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
          <label>텍스트 색깔</label>
          <input
            type="color"
            value={options.textColor}
            onChange={(e) => onOptionChange("textColor", e.target.value)}
          />
        </div>

        <div className={styles.optionItem}>
          <label>높이 (px)</label>
          <input
            type="number"
            value={parseInt(options.height) || 0}
            onChange={(e) => onOptionChange("height", `${e.target.value}px`)}
          />
        </div>

        <div className={styles.optionItem}>
          <label>로고</label>
          <input
            type="text"
            value={String(options.logo)}
            onChange={(e) => onOptionChange("logo", e.target.value)}
          />
        </div>

        <div className={styles.optionItem}>
          <label>로고 색깔</label>
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

export default NavbarOptionsPanel;
