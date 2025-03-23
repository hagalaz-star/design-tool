import React, { useState, useEffect } from "react";
import styles from "./Card.module.scss";
import hljs from "highlight.js";
import "highlight.js/styles/github.css";

interface CardeCodeType {
  options: Record<string, any>;
}

function CardCode({ options }: CardeCodeType) {
  const [codeFormat, setCodeFormat] = useState<"react" | "html">("react");

  const generateCode = () => {
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

export default CardCode;
