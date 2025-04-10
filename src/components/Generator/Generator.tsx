"use client";

import styles from "./Generator.module.scss";
import React, { Component, useMemo, useState } from "react";

import ButtonCode from "../Button/ButtonCodeGenerator";
import ButtonOptionsPanel from "../Button/ButtonOptions";
import ButtonPreview from "../Button/ButtonPreview";

import CardCode from "../Card/CardCodeGenerator";
import CardOptionsPanel from "../Card/CardOptions";
import CardPreview from "../Card/CardPreview";

import NavbarCode from "../Navbar/NavbarCodeGenerator";
import NavbarOptionsPanel from "../Navbar/NavbarOptions";
import NavbarPreview from "../Navbar/NavbarPreview";

import AIOptimizer from "../AIOptimizer/AIOptimizer";

import {
  generateButtonCode,
  generateCardCode,
  generateNavbarCode,
} from "../../utils/CodeDisplay";

import {
  ComponentType,
  ComponentOptionsTypeMap,
  ButtonOptions,
  CardOptions,
  NavbarOptions,
} from "@/types/index";

const ButtonDefaults: ButtonOptions = {
  backgroundColor: "#3a86ff",
  size: "medium",
  borderRadius: "4px",
  text: "버튼",
  color: "#B096A5",
};

const CardDefaults: CardOptions = {
  backgroundColor: "#ffffff",
  borderRadius: "8px",
  shadow: "medium",
  padding: "16px",
  color: "#D9643F",
};

const NavbarDefaults: NavbarOptions = {
  color: "#B3C3FF",
  backgroundColor: "#333333",
  textColor: "#ffffff",
  height: "60px",
  logo: "",
};

const componentConfig = {
  button: {
    Component: ButtonOptionsPanel,
    Preview: ButtonPreview,
    CodeGenerator: ButtonCode,
    defaultOptions: ButtonDefaults,
  },
  card: {
    Component: CardOptionsPanel,
    Preview: CardPreview,
    CodeGenerator: CardCode,
    defaultOptions: CardDefaults,
  },
  navbar: {
    Component: NavbarOptionsPanel,
    Preview: NavbarPreview,
    CodeGenerator: NavbarCode,
    defaultOptions: NavbarDefaults,
  },
};

// 컴포넌트 선택과 옵션 설정을 캡슐화 하였다
// 컴포넌트와 그에 따른 옵션 관리에 집중하고 싶었다.
// 왜?? Generator  함수를 더 단순하고 알아보기 쉽게 코드를 만들고 싶어서
function useComponentOptions(initialType: ComponentType = "button") {
  const [selectedComponent, setSelectedComponent] =
    useState<ComponentType>(initialType);

  const [componentOptions, setComponentOptions] = useState<
    ComponentOptionsTypeMap[ComponentType]
  >(componentConfig[initialType].defaultOptions);

  // 사용자가 다른 컴포넌트 유형(버튼, 카드, 네비게이션 바 등)을 선택했을 때 처리
  const handleOptionChange = (name: string, value: any) => {
    console.log(`옵션 변경: ${name}=${value}`);
    setComponentOptions((prev) => {
      const newOptions = { ...prev, [name]: value };
      console.log("새 상태:", newOptions);
      return newOptions;
    });
  };

  // 사용자가 컴포넌트의 개별 속성(색상, 크기, 둥근 모서리 등)을 변경할 때 처리
  const handleComponentTypeChange = (newType: ComponentType) => {
    setSelectedComponent(newType);
    setComponentOptions(componentConfig[newType].defaultOptions);
  };

  return {
    selectedComponent,
    componentOptions,
    handleOptionChange,
    handleComponentTypeChange,
  };
}

function Generator() {
  const {
    selectedComponent,
    componentOptions,
    handleOptionChange,
    handleComponentTypeChange,
  } = useComponentOptions();

  const [codeFormat, setCodeFormat] = useState<"react-tailwind" | "react-scss">(
    "react-tailwind"
  );

  const OptionsComponent = componentConfig[selectedComponent]
    .Component as React.ComponentType<{
    options: any;
    onOptionChange: (name: string, value: any) => void;
  }>;

  const PreviewComponent = componentConfig[selectedComponent]
    .Preview as React.ComponentType<{
    options: any;
  }>;

  const CodeComponent = componentConfig[selectedComponent]
    .CodeGenerator as React.ComponentType<{
    options: any;
    codeFormat: "react-tailwind" | "react-scss";
    onFormatChange?: (format: "react-tailwind" | "react-scss") => void;
  }>;

  const [optimizerCode, setOptimizerCode] = useState("");

  const handleOptimizedCode = (code: string) => {
    setOptimizerCode(code);
  };

  // 포맷 연결 시키기
  const handleFotmatChange = (format: "react-tailwind" | "react-scss") => {
    setCodeFormat(format);
  };

  function generatedCurrentCode(
    componentType: ComponentType,
    options: ComponentOptionsTypeMap[ComponentType],
    codeFormat: "react-tailwind" | "react-scss"
  ): string {
    switch (componentType) {
      case "button":
        return generateButtonCode(options as ButtonOptions, codeFormat);

      case "card":
        return generateCardCode(options as CardOptions, codeFormat);

      case "navbar":
        return generateNavbarCode(options as NavbarOptions, codeFormat);

      default:
        return "// 지원 되지않는 컴포넌트입니다";
    }
  }

  const currentCodeString = useMemo(() => {
    return generatedCurrentCode(
      selectedComponent,
      componentOptions,
      codeFormat
    );
  }, [selectedComponent, componentOptions, codeFormat]);

  return (
    <div className={styles.generatorContainer}>
      <div className={styles.componentSelector}>
        <h2>컴포넌트 선택</h2>
        <div className={styles.typeButtons}>
          <button
            className={`${styles.typeButton} ${
              selectedComponent === "button" ? styles.active : ""
            }`}
            onClick={() => handleComponentTypeChange("button")}
          >
            버튼
          </button>
          <button
            className={`${styles.typeButton} ${
              selectedComponent === "card" ? styles.active : ""
            }`}
            onClick={() => handleComponentTypeChange("card")}
          >
            카드
          </button>
          <button
            className={`${styles.typeButton} ${
              selectedComponent === "navbar" ? styles.active : ""
            }`}
            onClick={() => handleComponentTypeChange("navbar")}
          >
            네비게이션 바
          </button>
        </div>

        {/* 옵션 패널 */}
        <div className={styles.workArea}>
          <OptionsComponent
            options={componentOptions}
            onOptionChange={handleOptionChange}
          />
        </div>

        {/* 미리보기 섹션 */}
        <div className={styles.previewSection}>
          <h3>미리보기</h3>
          <div className={styles.previewContainer}>
            <PreviewComponent options={componentOptions} />
          </div>
        </div>

        {/* 코드 디스플레이 섹션 */}
        <div className={styles.codeSection}>
          <h3>코드</h3>
          <CodeComponent
            options={componentOptions}
            codeFormat={codeFormat}
            onFormatChange={handleFotmatChange}
          />
        </div>

        <div>
          <AIOptimizer
            currentCode={currentCodeString}
            componentType={selectedComponent}
            options={componentOptions}
            codeFormat={codeFormat}
            onApplyOptimized={handleOptimizedCode}
          />
        </div>
      </div>
    </div>
  );
}

export default Generator;
