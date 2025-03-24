import React, { CSSProperties } from "react";
import { CardOptions } from "@/types";
import styles from "./Card.module.scss";

interface CardPreviewProps {
  options: CardOptions;
}

function CardPreview({ options }: CardPreviewProps) {
  const cardStyle: CSSProperties = {
    color: options.color,
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
}

export default CardPreview;
