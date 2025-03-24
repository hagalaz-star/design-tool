import React, { CSSProperties } from "react";
import { ButtonOptions } from "@/types";
import styles from "./Button.module.scss";

interface ButtonPreviewProps {
  options: ButtonOptions;
}

function ButtonPreview({ options }: ButtonPreviewProps) {
  const buttonStyle: CSSProperties = {
    backgroundColor: options.backgroundColor,
    borderRadius: options.borderRadius,
    padding:
      options.size === "small"
        ? "6px 12px"
        : options.size === "medium"
        ? "8px 16px"
        : "10px 20px",
    // 추가 스타일 요소
    border: "none",
    cursor: "pointer",
    color: options.color,
    textAlign: "center",
    textDecoration: "none",
    fontSize:
      options.size === "small"
        ? "14px"
        : options.size === "medium"
        ? "16px"
        : "18px",
    transition: "all 0.2s ease",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  };
  return <button style={buttonStyle}>{options.text || "버튼"}</button>;
}

export default ButtonPreview;
