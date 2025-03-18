"use client";

import styles from "./Generator.module.scss";
import React, { useState } from "react";
import OptionsPanel from "./OptionsPanel";
import ComponentPreview from "./ComponentPreview";
import CodeDisplay from "./CodeDisplay";

// 컴포넌트 타입 정의
type ComponentType = string;

// 컴포넌트 옵션 타입 정의
type ComponentOptions = Record<string, any>;

function Generator() {
  // 선택된 컴포넌트 타입
  const [selectedComponent, setSelectedComponent] =
    useState<ComponentType>("button");

  // 컴포넌트 옵션 (간단하게 시작)
  const [Options, setOptions] = useState<ComponentOptions>({
    color: " #3a86ff",
    size: "medium",
    borderRadius: "4px",
    text: "버튼",
  });

  // 사용자가 다른 컴포넌트 유형(버튼, 카드, 네비게이션 바 등)을 선택했을 때 처리
  const handleOptionChange = (name: string, value: any) => {
    console.log(`옵션 변경: ${name}=${value}`);
    setOptions((prev) => {
      const newOptions = { ...prev, [name]: value };
      console.log("새 상태:", newOptions);
      return newOptions;
    });
  };

  // 사용자가 컴포넌트의 개별 속성(색상, 크기, 둥근 모서리 등)을 변경할 때 처리
  const handleComponentTypeChange = (newType: ComponentType) => {
    setSelectedComponent(newType);

    // 컴포넌트 타입에 따라 기본 옵션 초기화
    if (newType === "button") {
      setOptions({
        color: "#3a86ff",
        size: "medium",
        borderRadius: "4px",
        text: "버튼",
      });
    } else if (newType === "card") {
      setOptions({
        backgroundColor: "#ffffff",
        borderRadius: "8px",
        shadow: "medium",
        padding: "16px",
      });
    } else if (newType === "navbar") {
      setOptions({
        backgroundColor: "#333333",
        textColor: "#ffffff",
        height: "60px",
        logo: true,
      });
    }
  };
  // 코드 생성 함수
  const generateCode = () => {
    return `// ${selectedComponent} 컴포넌트의 생성된 코드`;
  };

  return (
    <div className={styles.generatorContainer}>
      <div className={styles.componentSelector}>
        <h2>컴포넌트 선택</h2>
        <div className={styles.typeButtons}>
          <button
            className={`${styles.typeButtons} ${
              selectedComponent === "button" ? styles.active : ""
            }`}
            onClick={() => handleComponentTypeChange("button")}
          >
            버튼
          </button>
          <button
            className={`${styles.typeButtons} ${
              selectedComponent === "card" ? styles.active : ""
            }`}
            onClick={() => handleComponentTypeChange("card")}
          >
            카드
          </button>
          <button
            className={`${styles.typeButtons} ${
              selectedComponent === "navbar" ? styles.active : ""
            }`}
            onClick={() => handleComponentTypeChange("navbar")}
          >
            네비게이션 바
          </button>
        </div>
        <div className={styles.workArea}>
          <OptionsPanel
            componentType={selectedComponent}
            options={Options}
            onOptionChange={handleOptionChange}
          />
          <ComponentPreview
            componentType={selectedComponent}
            options={Options}
          />
          <CodeDisplay componentType={selectedComponent} options={Options} />
        </div>
      </div>
    </div>
  );
}

export default Generator;
