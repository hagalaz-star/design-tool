"use client";

import React from "react";
import styles from "./OptionsPanel.module.scss";

// Props 타입 정의
interface OptionsPanelProps {
  componentType: string;
  options: Record<string, any>;
  onOptionChange: (name: string, value: any) => void;
}

function OptionsPanel({
  componentType,
  options,
  onOptionChange,
}: OptionsPanelProps) {
  const renderOptions = () => {
    switch (componentType) {
      case "button":
        return (
          <div className={styles.OptionsPanel}>
            <div className={styles.optionItem}>
              <label>색상</label>
              <input
                type="color"
                value={options.color}
                onChange={(e) => onOptionChange("color", e.target.value)}
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
          </div>
        );
      case "card":
        return (
          <div>
            <div className={styles.optionItem}>
              <label>배경색</label>
              <input
                type="color"
                value={options.backgroundColor}
                onChange={(e) =>
                  onOptionChange("backgroundColor", e.target.value)
                }
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
              <input
                type="color"
                value={options.shadow}
                onChange={(e) => onOptionChange("shadow", e.target.value)}
              />
            </div>

            <div className={styles.optionItem}>
              <label>넓이 조절</label>
              <input
                type="number"
                value={options.padding}
                onChange={(e) => onOptionChange("padding", e.target.value)}
              />
            </div>
          </div>
        );
      case "navbar":
        return (
          <div>
            <div className={styles.optionItem}>
              <label>배경색</label>
              <input
                type="color"
                value={options.backgroundColor}
                onChange={(e) =>
                  onOptionChange("backgroundColor", e.target.value)
                }
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
              <label>높이</label>
              <input
                type="number"
                value={options.height}
                onChange={(e) => onOptionChange("height", e.target.value)}
              />
            </div>

            <div className={styles.optionItem}>
              <label>로고</label>
              <input
                type="text"
                value={options.logo}
                onChange={(e) => onOptionChange("logo", e.target.value)}
              />
            </div>
          </div>
        );
      default:
        return <div>지원되지 않는 컴포넌트 타입입니다.</div>;
    }
  };
  return (
    <div className={styles.OptionsPanel}>
      <h3>옵션 설정</h3>
      {renderOptions()}
    </div>
  );
}

export default OptionsPanel;
