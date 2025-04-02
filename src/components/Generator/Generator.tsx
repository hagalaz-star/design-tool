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
} from "../../utils/codeGenerators";

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

function useComponentOptions(initialType: ComponentType = "button") {
  const [selectedComponent, setSelectedComponent] =
    useState<ComponentType>(initialType);

  const [options, setOptions] = useState<
    ComponentOptionsTypeMap[ComponentType]
  >(componentConfig[initialType].defaultOptions);

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
    setOptions(componentConfig[newType].defaultOptions);
  };

  return {
    selectedComponent,
    options,
    handleOptionChange,
    handleComponentTypeChange,
  };
}

// OptionsPanel 컴포넌트 - 컴포넌트 타입에 따라 적절한 옵션 패널을 렌더링
function OptionsPanel({
  componentType,
  options,
  onOptionChange,
}: {
  componentType: ComponentType;
  options: ComponentOptionsTypeMap[ComponentType];
  onOptionChange: (name: string, value: any) => void;
}) {
  switch (componentType) {
    case "button":
      return (
        <ButtonOptionsPanel
          options={options as ButtonOptions}
          onOptionChange={onOptionChange}
        />
      );
    case "card":
      return (
        <CardOptionsPanel
          options={options as CardOptions}
          onOptionChange={onOptionChange}
        />
      );
    case "navbar":
      return (
        <NavbarOptionsPanel
          options={options as NavbarOptions}
          onOptionChange={onOptionChange}
        />
      );
    default:
      return null;
  }
}

// ComponentPreview 컴포넌트 - 컴포넌트 타입에 따라 적절한 미리보기를 렌더링
function ComponentPreview({
  componentType,
  options,
}: {
  componentType: ComponentType;
  options: ComponentOptionsTypeMap[ComponentType];
}) {
  switch (componentType) {
    case "button":
      return <ButtonPreview options={options as ButtonOptions} />;
    case "card":
      return <CardPreview options={options as CardOptions} />;
    case "navbar":
      return <NavbarPreview options={options as NavbarOptions} />;
    default:
      return null;
  }
}

// CodeDisplay 컴포넌트 - 컴포넌트 타입에 따라 적절한 코드 생성기를 렌더링
function CodeDisplay({
  componentType,
  options,
}: {
  componentType: ComponentType;
  options: ComponentOptionsTypeMap[ComponentType];
}) {
  switch (componentType) {
    case "button":
      return <ButtonCode options={options as ButtonOptions} />;
    case "card":
      return <CardCode options={options as CardOptions} />;
    case "navbar":
      return <NavbarCode options={options as NavbarOptions} />;
    default:
      return null;
  }
}

function Generator() {
  const {
    selectedComponent,
    options,
    handleOptionChange,
    handleComponentTypeChange,
  } = useComponentOptions();

  const [codeFormat, setCodeFormat] = useState<"react" | "html">("react");

  const OptionsComponent = componentConfig[selectedComponent].Component;
  const PreviewComponent = componentConfig[selectedComponent].Preview;
  const CodeComponent = componentConfig[selectedComponent].CodeGenerator;

  const [optimizerCode, setOptimizerCode] = useState("");

  const handleOptimizedCode = (code: string) => {
    setOptimizerCode(code);
  };

  function generatedCurrentCode(
    componentType: ComponentType,
    options: ComponentOptionsTypeMap[ComponentType],
    codeFormat: "react" | "html"
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
    return generatedCurrentCode(selectedComponent, options, codeFormat);
  }, [selectedComponent, options, codeFormat]);

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
          <OptionsPanel
            componentType={selectedComponent}
            options={options}
            onOptionChange={handleOptionChange}
          />
        </div>

        {/* 미리보기 섹션 */}
        <div className={styles.previewSection}>
          <h3>미리보기</h3>
          <div className={styles.previewContainer}>
            <ComponentPreview
              componentType={selectedComponent}
              options={options}
            />
          </div>
        </div>

        {/* 코드 디스플레이 섹션 */}
        <div className={styles.codeSection}>
          <h3>코드</h3>
          <CodeDisplay componentType={selectedComponent} options={options} />
        </div>

        <div>
          <AIOptimizer
            currentCode={currentCodeString}
            componentType={selectedComponent}
            options={options}
            codeFormat="react"
            onApplyOptimized={handleOptimizedCode}
          />
        </div>
      </div>
    </div>
  );
}

export default Generator;
