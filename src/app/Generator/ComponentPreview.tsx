import React, { CSSProperties } from "react";
import styles from "./ComponentPreview.module.scss";

interface previewType {
  componentType: string;
  options: Record<string, any>;
}

function ComponentPreview({ componentType, options }: previewType) {
  const renderPreview = () => {
    switch (componentType) {
      case "button":
        const buttonStyle: CSSProperties = {
          backgroundColor: options.color,
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
          color: "white",
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
      case "card":
        const cardStyle: CSSProperties = {
          backgroundColor: options.backgroundColor,
          borderRadius: options.borderRadius,
          boxShadow:
            options.shadow === "small"
              ? "2px 2px 5px rgba(0, 0, 0, 0.3)"
              : options.shadow === "medium"
              ? "5px 5px 10px rgba(0, 0, 0, 0.3)"
              : "8px 8px 15px rgba(0, 0, 0, 0.3)",
          padding: options.padding,
          overflow: "hidden",
          cursor: "pointer",
          transform: "translateY(-3px)",
          transition: "box-shadow 0.3s ease, transform 0.3s ease",
        };
        return <div style={cardStyle}>{options.children || "카드 내용"}</div>;

      case "navbar":
        const navbarStyle: CSSProperties = {
          backgroundColor: options.backgroundColor,
          color: options.color,
          height: options.height,
          alignItems: "center",
          display: "flex",
          justifyContent: "space-between",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        };
    }
  };
  return renderPreview();
}
