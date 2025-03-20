import React, { CSSProperties } from "react";
import styles from "./ComponentPreview.module.scss";
import { ComponentType, ComponentOptionsTypeMap } from "@/app/types/index";

interface previewType<T extends ComponentType> {
  componentType: T;
  options: ComponentOptionsTypeMap[T];
}

function ComponentPreview<T extends ComponentType>({
  componentType,
  options,
}: previewType<T>) {
  const renderPreview = () => {
    switch (componentType) {
      case "button":
        const buttonOptions = options as ComponentOptionsTypeMap["button"];
        const buttonStyle: CSSProperties = {
          backgroundColor: buttonOptions.color,
          borderRadius: buttonOptions.borderRadius,
          padding:
            buttonOptions.size === "small"
              ? "6px 12px"
              : buttonOptions.size === "medium"
              ? "8px 16px"
              : "10px 20px",
          // 추가 스타일 요소
          border: "none",
          cursor: "pointer",
          color: "white",
          textAlign: "center",
          textDecoration: "none",
          fontSize:
            buttonOptions.size === "small"
              ? "14px"
              : buttonOptions.size === "medium"
              ? "16px"
              : "18px",
          transition: "all 0.2s ease",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        };
        return (
          <button style={buttonStyle}>{buttonOptions.text || "버튼"}</button>
        );
      case "card":
        const cardOptions = options as ComponentOptionsTypeMap["card"];
        const cardStyle: CSSProperties = {
          backgroundColor: cardOptions.backgroundColor,
          borderRadius: cardOptions.borderRadius,
          boxShadow:
            cardOptions.shadow === "small"
              ? "2px 2px 5px rgba(0, 0, 0, 0.3)"
              : cardOptions.shadow === "medium"
              ? "5px 5px 10px rgba(0, 0, 0, 0.3)"
              : "8px 8px 15px rgba(0, 0, 0, 0.3)",
          padding: cardOptions.padding,
          overflow: "hidden",
          cursor: "pointer",
          transform: "translateY(-3px)",
          transition: "box-shadow 0.3s ease, transform 0.3s ease",
        };
        return (
          <div style={cardStyle}>{cardOptions.children || "카드 내용"}</div>
        );

      case "navbar":
        const navbarOptions = options as ComponentOptionsTypeMap["navbar"];
        const navbarStyle: CSSProperties = {
          backgroundColor: navbarOptions.backgroundColor,
          color: navbarOptions.color,
          height: navbarOptions.height,
          alignItems: "center",
          display: "flex",
          justifyContent: "space-between",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          padding: "0 20px",
          width: "100%",
        };

        const logoStyle: CSSProperties = {
          fontWeight: "bold",
          fontSize: "1.2rem",
        };

        const menuStyle: CSSProperties = {
          display: "flex",
          listStyle: "none",
          gap: "20px",
          margin: 0,
          padding: 0,
        };

        const menuItemStyle: CSSProperties = {
          cursor: "pointer",
          color: navbarOptions.textColor,
        };
        return (
          <nav style={navbarStyle}>
            <div style={logoStyle}>
              {String(navbarOptions.logo) ? navbarOptions.logo : "로고"}
            </div>
            <ul style={menuStyle}>
              <li style={menuItemStyle}>메뉴1</li>
              <li style={menuItemStyle}>메뉴2</li>
              <li style={menuItemStyle}>메뉴3</li>
            </ul>
          </nav>
        );
    }
  };
  return renderPreview();
}

export default ComponentPreview;
