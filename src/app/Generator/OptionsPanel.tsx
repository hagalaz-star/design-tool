"use client";

import React from "react";
import styles from "./OptionsPanel.module.scss";
import { ComponentType, ComponentOptionsTypeMap } from "@/app/types/index";

// Props 타입 정의
interface OptionsPanelProps<T extends ComponentType> {
  componentType: T;
  options: ComponentOptionsTypeMap[T];
  onOptionChange: (name: string, value: any) => void;
}

function OptionsPanel<T extends ComponentType>({
  componentType,
  options,
  onOptionChange,
}: OptionsPanelProps<T>) {
  const renderOptions = () => {
    switch (componentType) {
      case "button":
        const buttonOptions = options as ComponentOptionsTypeMap["button"];

        return (
          <div className={styles.OptionsPanel}>
            <div className={styles.optionItem}>
              <label>색상</label>
              <input
                type="color"
                value={buttonOptions.color}
                onChange={(e) => onOptionChange("color", e.target.value)}
              />
            </div>

            <div className={styles.optionItem}>
              <label>크기</label>
              <select
                value={buttonOptions.size}
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
                value={parseInt(buttonOptions.borderRadius)}
                onChange={(e) =>
                  onOptionChange("borderRadius", `${e.target.value}px`)
                }
              />
            </div>
            <div className={styles.optionItem}>
              <label>텍스트</label>
              <input
                type="text"
                value={buttonOptions.text}
                onChange={(e) => onOptionChange("text", e.target.value)}
              />
            </div>
          </div>
        );
      case "card":
        const cardOptions = options as ComponentOptionsTypeMap["card"];

        return (
          <div>
            <div className={styles.optionItem}>
              <label>배경색</label>
              <input
                type="color"
                value={cardOptions.backgroundColor}
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
                value={parseInt(cardOptions.borderRadius)}
                onChange={(e) =>
                  onOptionChange("borderRadius", `${e.target.value}px`)
                }
              />
            </div>

            <div className={styles.optionItem}>
              <label>명암</label>
              <select
                value={cardOptions.shadow}
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
                value={parseInt(cardOptions.padding)}
                onChange={(e) =>
                  onOptionChange("padding", `${e.target.value}px`)
                }
              />
            </div>
          </div>
        );
      case "navbar":
        const navbarOptions = options as ComponentOptionsTypeMap["navbar"];
        return (
          <div>
            <div className={styles.optionItem}>
              <label>배경색</label>
              <input
                type="color"
                value={navbarOptions.backgroundColor}
                onChange={(e) =>
                  onOptionChange("backgroundColor", e.target.value)
                }
              />
            </div>

            <div className={styles.optionItem}>
              <label>텍스트 색깔</label>
              <input
                type="color"
                value={navbarOptions.textColor}
                onChange={(e) => onOptionChange("textColor", e.target.value)}
              />
            </div>

            <div className={styles.optionItem}>
              <label>높이 (px)</label>
              <input
                type="number"
                value={parseInt(navbarOptions.height)}
                onChange={(e) =>
                  onOptionChange("height", `${e.target.value}px`)
                }
              />
            </div>

            <div className={styles.optionItem}>
              <label>로고</label>
              <input
                type="text"
                value={String(navbarOptions.logo)}
                onChange={(e) => onOptionChange("logo", e.target.value)}
              />
            </div>

            <div className={styles.optionItem}>
              <label>로고 색깔</label>
              <input
                type="color"
                value={String(navbarOptions.color)}
                onChange={(e) => onOptionChange("color", e.target.value)}
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
