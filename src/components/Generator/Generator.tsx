"use client";

import styles from "./Generator.module.scss";
import React, { Component, useEffect, useMemo, useState } from "react";

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
import AiDesign from "../AIDesign/AiDesign";

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

import useComponentStore from "@/store/useComponentStore";
import { config } from "process";

type ComponentOptions = {
  // 공통 옵션
  width?: string;
  height?: string;
  backgroundColor?: string;
  color?: string;
  // 버튼 옵션
  text?: string;
  borderRadius?: string;
  // 카드 옵션
  title?: string;
  content?: string;
  // 네비게이션 바 옵션
  items?: string[];
};

const defaultOptions: ComponentOptions = {
  width: "auto",
  height: "auto",
  backgroundColor: "#ffffff",
  color: "#000000",
  text: "버튼",
  borderRadius: "4px",
  title: "카드 제목",
  content: "카드 내용",
  items: ["홈", "소개", "서비스", "연락처"],
};

const componentTypes: ComponentType[] = ["button", "card", "navbar"];

const componentConfig = {
  button: {
    Component: ButtonOptionsPanel,
    Preview: ButtonPreview,
    CodeGenerator: ButtonCode,
  },
  card: {
    Component: CardOptionsPanel,
    Preview: CardPreview,
    CodeGenerator: CardCode,
  },
  navbar: {
    Component: NavbarOptionsPanel,
    Preview: NavbarPreview,
    CodeGenerator: NavbarCode,
  },
};

function Generator() {
  const {
    selectedComponent,
    componentOptions,
    codeFormat,
    customCode,
    isPreviewZoomed,
    setSelectedComponent,
    setComponentOptions,
    setCodeFormat,
    setCustomCode,
    togglePreviewZoom,
  } = useComponentStore();

  const [selectedType, setSelectedType] = useState<ComponentType>("button");
  const [options, setOptions] = useState<ComponentOptions>(defaultOptions);

  // 사용자가 다른 컴포넌트 유형(버튼, 카드, 네비게이션 바 등)을 선택했을 때 처리
  const handleOptionChange = (name: string, value: any) => {
    console.log(`옵션 변경: ${name}=${value}`);

    const newOptions = { ...componentOptions, [name]: value };
    console.log("새 상태:", newOptions);

    setComponentOptions(name as any, value);

    return newOptions;
  };

  // 컴포넌트 타입 변경 핸들러
  const handleComponentTypeChange = (newType: ComponentType) => {
    setSelectedComponent(newType);
    setOptions(defaultOptions);
  };

  // AI 최적화 코드 적용 핸들러
  const handleOptimizedCode = (code: string) => {
    setCustomCode(code);
  };

  // AI 디자인 선택 핸들러
  const onSelectDesign = (code: string) => {
    setCustomCode(code);
  };

  // useEffect를 추가하면 selectedComponent가 변경될 때마다 customCode가 초기화됨
  useEffect(() => {
    setCustomCode(null);
  }, [selectedComponent]);

  // 현재 컴포넌트에 맞는 컴포넌트 가져오기
  const CurrentComponent = useMemo(() => {
    // 현재 선택된 컴포넌트에 대한 타입 지정
    type CurrentType = typeof selectedComponent;
    type SelectCurrnet = ComponentOptionsTypeMap[CurrentType];
    const config = componentConfig[selectedComponent];

    return {
      Options: config.Component as React.ComponentType<{
        options: SelectCurrnet;
        onOptionChange: (name: string, value: any) => void;
      }>,
      Preview: config.Preview as React.ComponentType<{
        options: SelectCurrnet;
      }>,
      Code: config.CodeGenerator as React.ComponentType<{
        options: SelectCurrnet;
        codeFormat: "react-tailwind" | "react-scss";
        onFormatChange: (format: "react-tailwind" | "react-scss") => void;
        customCode: string | null;
      }>,
    };
  }, [selectedComponent]);

  // 선택된 컴포넌트 타입, 옵션, 코드 포맷에 따라 적절한 코드를 생성하는 함수
  // 코드 생성 로직을 분리하여 Generator 컴포넌트의 복잡도를 줄이고 재사용성을 높임
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

  // 컴포넌트 타입 , 옵션 , 코드포맷으로 재생성하여 성능 최적화
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
        <h2>컴포넌트 생성기</h2>
        <div className={styles.typeButtons}>
          {componentTypes.map((type) => (
            <button
              key={type}
              className={`${styles.typeButton} ${
                selectedComponent === type ? styles.active : ""
              }`}
              onClick={() => setSelectedComponent(type)}
            >
              {type}
            </button>
          ))}
        </div>

        {/* 옵션 패널 */}
        <div className={styles.workArea}>
          <CurrentComponent.Options
            options={componentOptions}
            onOptionChange={handleOptionChange}
          />
        </div>

        {/* 미리보기 섹션 */}
        <div className={styles.previewSection}>
          <h3>미리보기</h3>
          <div
            className={`${styles.previewContainer} ${
              isPreviewZoomed ? styles.zoomed : ""
            }`}
            onClick={togglePreviewZoom}
          >
            <CurrentComponent.Preview options={componentOptions} />
          </div>
        </div>

        {/* 코드 디스플레이 섹션 */}
        <div className={styles.codeSection}>
          <h3>코드</h3>
          <CurrentComponent.Code
            options={componentOptions}
            codeFormat={codeFormat}
            onFormatChange={setCodeFormat}
            customCode={customCode}
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

        <div>
          <AiDesign
            componentType={selectedComponent}
            onSelectDesign={onSelectDesign}
          />
        </div>
      </div>
    </div>
  );
}

export default Generator;
