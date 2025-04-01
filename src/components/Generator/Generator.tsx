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
  ComponentType,
  ComponentOptionsTypeMap,
  ButtonOptions,
  CardOptions,
  NavbarOptions,
} from "@/types/index";

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
  // 선택된 컴포넌트 타입
  const [selectedComponent, setSelectedComponent] =
    useState<ComponentType>("button");

  const [codeFormat, setCodeFormat] = useState<"react" | "html">("react");

  // 컴포넌트 옵션 (간단하게 시작)
  const [Options, setOptions] = useState<
    ComponentOptionsTypeMap[ComponentType]
  >({
    backgroundColor: "#B096AF",
    color: " #3a86ff",
    size: "medium",
    borderRadius: "4px",
    text: "버튼",
  });

  const [optimizerCode, setOptimizerCode] = useState("");

  const handleOptimizedCode = (code: string) => {
    setOptimizerCode(code);
  };

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
        backgroundColor: "#3a86ff",
        size: "medium",
        borderRadius: "4px",
        text: "버튼",
        color: "#B096A5",
      });
    } else if (newType === "card") {
      setOptions({
        backgroundColor: "#ffffff",
        borderRadius: "8px",
        shadow: "medium",
        padding: "16px",
        color: "#D9643F",
      });
    } else if (newType === "navbar") {
      setOptions({
        color: "#B3C3FF",
        backgroundColor: "#333333",
        textColor: "#ffffff",
        height: "60px",
        logo: "",
      });
    }
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

  function generateButtonCode(
    options: ButtonOptions,
    codeFormat: "react" | "html"
  ): string {
    if (codeFormat === "react") {
      return `
  const Button = () => {
    return (
      <button 
        style={{
          backgroundColor: "${options.backgroundColor}",
          borderRadius: "${options.borderRadius}",
          padding: ${
            options.size === "small"
              ? "'6px 12px'"
              : options.size === "medium"
              ? "'8px 16px'"
              : "'10px 20px'"
          },
          border: "none",
          cursor: "pointer",
          color: "${options.color}"
        }}
      >
        ${options.text || "버튼"}
      </button>
    );
  };`;
    } else if (codeFormat === "html") {
      const paddingValue =
        options.size === "small"
          ? "6px 12px"
          : options.size === "medium"
          ? "8px 16px"
          : "10px 20px";

      return `
  <button class="custom-button">${options.text || "버튼"}</button>
  
  <style>
    .custom-button {
      background-color: ${options.backgroundColor};
      border-radius: ${options.borderRadius};
      padding: ${paddingValue};    
      border: none;
      cursor: pointer;
      color: ${options.color};
    }
  </style>`;
    }

    return "// 지원되지 않는 포맷입니다.";
  }

  function generateCardCode(
    options: CardOptions,
    codeFormat: "react" | "html"
  ): string {
    if (codeFormat === "react") {
      return `
        const Card = () => {
          return (
            <div 
                style={{ backgroundColor: "${options.backgroundColor}",
                borderRadius: "${options.borderRadius}",
                boxShadow:
                  ${
                    options.shadow === "small"
                      ? "'2px 2px 5px rgba(0, 0, 0, 0.3)'"
                      : options.shadow === "medium"
                      ? "'5px 5px 10px rgba(0, 0, 0, 0.3)'"
                      : "'8px 8px 15px rgba(0, 0, 0, 0.3)'"
                  },
                padding: "${options.padding}",
                overflow: "hidden",
                cursor: "pointer"
                }
              }
          > ${options.children || "카드 내용"}
          </div>
        )
        }
        `;
    } else if (codeFormat === "html") {
      return `
        <div class="custom-card">${options.children || "카드 내용"}</div>
        
        <style>
        .custom-card {
            backgroundColor: ${options.backgroundColor},
            borderRadius: ${options.borderRadius},
            boxShadow:
              ${options.shadow} === "small"
                ? "2px 2px 5px rgba(0, 0, 0, 0.3)"
                : ${options.shadow} === "medium"
                ? "5px 5px 10px rgba(0, 0, 0, 0.3)"
                : "8px 8px 15px rgba(0, 0, 0, 0.3)",
            padding: ${options.padding},
            overflow: "hidden",
            cursor: "pointer"
          }
        </style>
        `;
    }
    return "// 지원되지 않는 컴포넌트 또는 포맷입니다.";
  }

  function generateNavbarCode(
    options: NavbarOptions,
    codeFormat: "react" | "html"
  ): string {
    if (codeFormat === "react") {
      return `
          const navbarStyle = ()=> ({
                backgroundColor: "${options.backgroundColor}",
                color: "${options.color}",
                height: "${options.height}",
                alignItems: "center",
                display: "flex",
                justifyContent: "space-between",
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                padding: "0 20px",
                width: "100%",
            }) 
          const logoStyle = ()=>{
            return ({        
                fontWeight: "bold",
                fontSize: "1.2rem",
              })
          }
          const menuStyle = () => {
            return({
                  display: "flex",
                  listStyle: "none",
                  gap: "20px",
                  margin: 0,
                  padding: 0,
              })
          }
          const menuItemStyle =()=> {
            return ({ 
                cursor: "pointer",
                color: "${options.textColor}"
              })
            };

            return (
              <nav style={navbarStyle}>
                  <div style={logoStyle}>{${options.logo} ? "로고" : "브랜드명"}</div>
                  <ul style={menuStyle}>
                    <li style={menuItemStyle}>메뉴1</li>
                    <li style={menuItemStyle}>메뉴2</li>
                    <li style={menuItemStyle}>메뉴3</li>
                  </ul>
              </nav>
              );
            `;
    } else if (codeFormat === "html") {
      return `
            <nav style={navbarStyle}>
            <div style={logoStyle}>{${options.logo} ? "로고" : "브랜드명"}</div>
            <ul style={menuStyle}>
              <li style={menuItemStyle}>메뉴1</li>
              <li style={menuItemStyle}>메뉴2</li>
              <li style={menuItemStyle}>메뉴3</li>
            </ul>
          </nav>

          <style>.navbarStyle
              {
                backgroundColor: ${options.backgroundColor},
                color: ${options.color},
                height: ${options.height},
                alignItems: "center",
                display: "flex",
                justifyContent: "space-between",
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                padding: "0 20px",
                width: "100%",
          }
          </style>

          <style>.logoStyle
          {
            fontWeight: "bold",
            fontSize: "1.2rem",
          }
          </style>
          
          <style>.menuStyle{
            display: "flex",
            listStyle: "none",
            gap: "20px",
            margin: 0,
            padding: 0,
          }
          </style>

          <style>.menuItemStyle{
              cursor: "pointer",
              color: ${options.textColor},
          }
          </style>
        
        `;
    }
    return "// 지원되지 않는 컴포넌트 또는 포맷입니다.";
  }

  const currentCodeString = useMemo(() => {
    return generatedCurrentCode(selectedComponent, Options, codeFormat);
  }, [selectedComponent, Options, codeFormat]);

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
            options={Options}
            onOptionChange={handleOptionChange}
          />
        </div>

        {/* 미리보기 섹션 */}
        <div className={styles.previewSection}>
          <h3>미리보기</h3>
          <div className={styles.previewContainer}>
            <ComponentPreview
              componentType={selectedComponent}
              options={Options}
            />
          </div>
        </div>

        {/* 코드 디스플레이 섹션 */}
        <div className={styles.codeSection}>
          <h3>코드</h3>
          <CodeDisplay componentType={selectedComponent} options={Options} />
        </div>

        <div>
          <AIOptimizer
            currentCode={currentCodeString}
            componentType={selectedComponent}
            options={Options}
            codeFormat="react"
            onApplyOptimized={handleOptimizedCode}
          />
        </div>
      </div>
    </div>
  );
}

export default Generator;
