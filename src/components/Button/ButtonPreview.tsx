import React, { CSSProperties } from "react";
import { ButtonOptions } from "@/types";
import styles from "./Button.module.scss";

interface ButtonPreviewProps {
  options: ButtonOptions;
}

function ButtonPreview({ options }: ButtonPreviewProps) {
  const buttonStyle: CSSProperties = {
    backgroundColor: options.backgroundColor,
    color: options.color,
    borderRadius: options.borderRadius,
    padding:
      options.size === "small"
        ? "6px 12px"
        : options.size === "medium"
        ? "8px 16px"
        : "10px 20px",
    border: "none",
    cursor: options.disabled ? "not-allowed" : "pointer",
    textAlign: "center",
    textDecoration: "none",
    fontSize:
      options.size === "small"
        ? "14px"
        : options.size === "medium"
        ? "16px"
        : "18px",
    transition: "all 0.3s ease",
    opacity: options.disabled ? 0.6 : 1,
    position: "relative",
    overflow: "hidden",
  };

  // 호버 효과 적용
  const hoverStyle: CSSProperties = {
    ...buttonStyle,
    transform:
      options.hoverEffect === "scale"
        ? "scale(1.05)"
        : options.hoverEffect === "lift"
        ? "translateY(-2px)"
        : "none",
    boxShadow:
      options.hoverEffect === "glow" ? "0 0 10px rgba(0,0,0,0.2)" : "none",
  };

  // 클릭 효과 적용
  const clickStyle: CSSProperties = {
    ...buttonStyle,
    transform: options.clickEffect === "press" ? "scale(0.95)" : "none",
  };

  return (
    <button
      style={buttonStyle}
      className={styles.button}
      disabled={options.disabled}
      onMouseEnter={(e) => {
        if (!options.disabled) {
          Object.assign(e.currentTarget.style, hoverStyle);
        }
      }}
      onMouseLeave={(e) => {
        if (!options.disabled) {
          Object.assign(e.currentTarget.style, buttonStyle);
        }
      }}
      onMouseDown={(e) => {
        if (!options.disabled) {
          Object.assign(e.currentTarget.style, clickStyle);
        }
      }}
      onMouseUp={(e) => {
        if (!options.disabled) {
          Object.assign(e.currentTarget.style, buttonStyle);
        }
      }}
    >
      {options.text || "버튼"}
      {options.clickEffect === "ripple" && (
        <span className={styles.ripple}></span>
      )}
    </button>
  );
}

export default ButtonPreview;
