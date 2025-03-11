import styles from "./Generator.module.scss";
import React, { useState } from "react";
// import ComponentPreview from "./ComponentPreview";
// import OptionsPanel from "./OptionsPanel";
// import CodeDisplay from "./CodeDisplay";

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

  // 옵션 변경 핸들러
  const handleOptionChange = (name: string, value: any) => {
    setOptions((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 컴포넌트 타입이 변경될 때 호출되는 핸들러
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

  return <div></div>;
}

export default Generator;
