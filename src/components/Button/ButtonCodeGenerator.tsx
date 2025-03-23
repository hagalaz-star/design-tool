import React, { useState, useEffect } from "react";
import { ButtonOptions } from "@/types";
import hljs from "highlight.js";
import "highlight.js/styles/github.css";
import styles from "./Button.module.scss";

interface ButtonCodeType {
  options: Record<string, any>;
}

function ButtonCode({ options }: ButtonCodeType) {
  const [codeFormat, setCodeFormat] = useState<"react" | "html">("react");

  const generateCode = () => {
    if (codeFormat === "react") {
      return `
  const Button = () => {
    return (
    <button 
        style={{
        backgroundColor: "${options.color}",
        borderRadius: "${options.borderRadius}",
        padding: ${
          options.size === "small"
            ? "'6px 12px'"
            : options.size === "medium"
            ? "'8px 16px'"
            : "'10px 20px'"
        },
        border: "none",
        cursor: "pointer",}}
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
      .custom-button{
        background-color: ${options.color};
        border-radius: ${options.borderRadius};
        padding: ${paddingValue};    
        border: none ;
        cursor: pointer;
        color: white;
      }
    </style>
    `;
    }
    return "// 지원되지 않는 컴포넌트 또는 포맷입니다.";
  };

  useEffect(() => {
    document.querySelectorAll("pre code").forEach((block) => {
      hljs.highlightElement(block as HTMLElement);
    });
  }, [options, codeFormat]);

  return (
    <div className={styles.CodeDisplay}>
      <div className={styles.formatSelector}>
        <button
          className={codeFormat === "react" ? styles.active : ""}
          onClick={() => setCodeFormat("react")}
        >
          React
        </button>
        <button
          className={codeFormat === "html" ? styles.active : ""}
          onClick={() => setCodeFormat("html")}
        >
          HTML/CSS
        </button>
      </div>

      <pre className={styles.codeBlock}>
        <code>{generateCode()}</code>
      </pre>
    </div>
  );
}

export default ButtonCode;
