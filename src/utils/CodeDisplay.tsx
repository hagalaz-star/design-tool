import React, { useEffect, useState } from "react";
import hljs from "highlight.js";
import "highlight.js/styles/github.css";
import {
  ButtonOptions,
  CardOptions,
  NavbarOptions,
  ComponentType,
  ComponentOptionsTypeMap,
} from "@/types/index";

export function generateButtonCode(
  options: ButtonOptions,
  codeFormat: "react-tailwind" | "react-scss"
): string {
  if (codeFormat === "react-tailwind") {
    // 사이즈별 패딩클래스 결정
    let sizeClasses = "";

    if (options.size === "small") {
      sizeClasses = "px-3 py-1 text-sm";
    } else if (options.size === "medium") {
      sizeClasses = "px-4 py-2 text-base";
    } else {
      sizeClasses = "px-6 py-3 text-lg";
    }

    // 테두리 반경 변환
    const borderRadius = parseInt(options.borderRadius);

    let roundedClass = "";

    if (borderRadius <= 2) {
      roundedClass = "rounded-sm";
    } else if (borderRadius <= 4) {
      roundedClass = "rounded";
    } else if (borderRadius <= 8) {
      roundedClass = "rounded-md";
    } else if (borderRadius <= 12) {
      roundedClass = "rounded-lg";
    } else {
      roundedClass = "rounded-xl";
    }

    return `
      <button className="bg-[${options.backgroundColor}] text-[${
      options.color
    }] ${sizeClasses} ${roundedClass} border-none cursor-pointer transition-all hover:brightness-95 active:scale-95">
        ${options.text || "버튼"}
      </button>`;
  } else if (codeFormat === "react-scss") {
    let sizeClass = "";

    if (options.size === "small") {
      sizeClass = "buttonSm";
    } else if (options.size === "medium") {
      sizeClass = "buttonMd";
    } else {
      sizeClass = "buttonLg";
    }

    return `
      <button className={button ${sizeClass}}>
        ${options.text || "버튼"}
      </button>
      
      
      .button {
        background-color: ${options.backgroundColor};
        color: ${options.color};
        border-radius: ${options.borderRadius};
        border: none;
        cursor: pointer;
        transition: all 0.2s ease;
        
        &:hover {
          filter: brightness(1.05);
          transform: translateY(-1px);
        }
        
        &:active {
          filter: brightness(0.95);
          transform: translateY(1px);
        }
      }
      
      .buttonSm {
        padding: 6px 12px;
        font-size: 0.85rem;
      }
      
      .buttonMd {
        padding: 8px 16px;
        font-size: 1rem;
      }
      
      .buttonLg {
        padding: 10px 20px;
        font-size: 1.1rem;
      }
      `;
  }

  return "// 지원되지 않는 포맷입니다.";
}

export function generateCardCode(
  options: CardOptions,
  codeFormat: "react-tailwind" | "react-scss"
): string {
  if (codeFormat === "react-tailwind") {
    // 테두리 반경 변환
    const borderRadius = parseInt(options.borderRadius);
    let roundedClass = "";

    if (borderRadius <= 2) {
      roundedClass = "rounded-sm";
    } else if (borderRadius <= 4) {
      roundedClass = "rounded";
    } else if (borderRadius <= 8) {
      roundedClass = "rounded-md";
    } else if (borderRadius <= 12) {
      roundedClass = "rounded-lg";
    } else {
      roundedClass = "rounded-xl";
    }

    // 그림자 효과 변환
    let shadowClass = "";

    if (options.shadow === "small") {
      shadowClass = "shadow-sm";
    } else if (options.shadow === "medium") {
      shadowClass = "shadow";
    } else {
      shadowClass = "shadow-lg";
    }

    // 패딩 변환
    const paddingValue = parseInt(options.padding);
    let paddingClass = "";

    if (paddingValue <= 4) {
      paddingClass = "p-1";
    } else if (paddingValue <= 8) {
      paddingClass = "p-2";
    } else if (paddingValue <= 12) {
      paddingClass = "p-3";
    } else if (paddingValue <= 16) {
      paddingClass = "p-4";
    } else if (paddingValue <= 20) {
      paddingClass = "p-5";
    } else {
      paddingClass = "p-6";
    }

    return `
    <div className="bg-[${options.backgroundColor}] text-[${
      options.color
    }] ${roundedClass} ${shadowClass} ${paddingClass} overflow-hidden cursor-pointer transition-all hover:shadow-xl">
      ${options.children || "카드 내용"}
    </div>
    `.trim();
  } else if (codeFormat === "react-scss") {
    return `
  <div className = "styles.card">
      ${options.children || "카드 내용"}
</div>

.custom-card {
    backgroundColor: ${options.backgroundColor},
    color: ${options.color},
    borderRadius: ${options.borderRadius},
    boxShadow: ${
      options.shadow === "small"
        ? "2px 2px 5px rgba(0, 0, 0, 0.3)"
        : options.shadow === "medium"
        ? "5px 5px 10px rgba(0, 0, 0, 0.3)"
        : "8px 8px 15px rgba(0, 0, 0, 0.3)"
    };
    padding: ${options.padding},
    overflow: "hidden",
    cursor: "pointer",
  }
  
  `.trim();
  }
  return "// 지원되지 않는 컴포넌트 또는 포맷입니다.";
}

export function generateNavbarCode(
  options: NavbarOptions,
  codeFormat: "react-tailwind" | "react-scss"
): string {
  if (codeFormat === "react-tailwind") {
    const heightValue = parseInt(options.height);
    let heightClass = "";

    if (heightValue <= 40) {
      heightClass = "h-10";
    } else if (heightValue <= 50) {
      heightClass = "h-12";
    } else if (heightValue <= 60) {
      heightClass = "h-14";
    } else if (heightValue <= 70) {
      heightClass = "h-16";
    } else {
      heightClass = "h-20";
    }

    return `
  <nav className = "flex items-center justify-between bg-[${
    options.backgroundColor
  }] ${heightClass} w-full px-5 shadow-sm">
    <div className = "font-bold text-[${options.color}] text-xl">
        ${options.logo || "브랜드명"}
    </div>
    <ul className="flex gap-5 list-none m-0 p-0">
       <li className="cursor-pointer text-[${
         options.textColor
       }] hover:underline">메뉴1</li>
       <li className="cursor-pointer text-[${
         options.textColor
       }] hover:underline">메뉴2</li>
       <li className="cursor-pointer text-[${
         options.textColor
       }] hover:underline">메뉴3</li>
    </ul>
  </nav>
  `.trim();
  } else if (codeFormat === "react-scss") {
    return `
  <nav className = {styles.navbar}>
        <div className ={styles.logo}>
          {${options.logo} ? "로고" : "브랜드명"}
        </div>
        <ul className = {styles.menu}>
          <li className = {styles.menuItem}>메뉴1</li>
          <li className = {styles.menuItem}>메뉴2</li>
          <li className = {styles.menuItem}>메뉴3</li>
        </ul>
</nav>

      .navbar {
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            backgroundColor: ${options.backgroundColor},
            height: ${options.height},
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            padding: "0 20px",
            width: "100%",
            color: ${options.color},
      }

      .logo {
        fontWeight: "bold",
        fontSize: "1.2rem",
        color: ${options.color},
      }
            
      .menu {
        display: "flex",
        listStyle: "none",
        gap: "20px",
        margin: 0,
        padding: 0,
      }
      
      .menuItem {
          cursor: "pointer",
          color: ${options.textColor},

          &:hover {
          text-decoration: underline;
      }
    }     
    `.trim();
  }
  return "// 지원되지 않는 컴포넌트 또는 포맷입니다.";
}

export function CodeDisplay({
  codeFormat,
  componentType,
  options,
  styles,
  onFormatChange,
}: {
  codeFormat: "react-tailwind" | "react-scss";
  componentType: ComponentType;
  options: ComponentOptionsTypeMap[ComponentType];
  styles: Record<string, string>;
  onFormatChange?: (format: "react-tailwind" | "react-scss") => void;
}) {
  // 버튼 클릭 핸들러 수정
  const handleFormatChange = (format: "react-tailwind" | "react-scss") => {
    onFormatChange?.(format);
    console.log(onFormatChange?.(format));
  };

  const generateCode = () => {
    switch (componentType) {
      case "button":
        return generateButtonCode(options as ButtonOptions, codeFormat);
      case "card":
        return generateCardCode(options as CardOptions, codeFormat);
      case "navbar":
        return generateNavbarCode(options as NavbarOptions, codeFormat);
      default:
        return "// 지원되지 않는 컴포넌트 타입입니다.";
    }
  };

  useEffect(() => {
    document.querySelectorAll("pre code").forEach((block) => {
      hljs.highlightElement(block as HTMLElement);
    });
  }, [options, codeFormat, componentType]);

  return (
    <div className={styles.CodeDisplay}>
      <div className={styles.formatSelector}>
        <button
          className={`${styles.formatButton} ${
            codeFormat === "react-tailwind" ? styles.active : ""
          }`}
          onClick={() => handleFormatChange("react-tailwind")}
        >
          Tailwind
        </button>
        <button
          className={`${styles.formatButton} ${
            codeFormat === "react-scss" ? styles.active : ""
          }`}
          onClick={() => handleFormatChange("react-scss")}
        >
          Scss
        </button>
      </div>

      <pre
        className={styles.codeBlock}
        key={`${componentType}-${codeFormat}-${JSON.stringify(options)}`}
      >
        <code>{generateCode()}</code>
      </pre>
    </div>
  );
}
