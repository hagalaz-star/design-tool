import React, { useState, CSSProperties, useEffect } from "react";
import hljs from "highlight.js";
import "highlight.js/styles/github.css";
import styles from "./CodeDisplay.module.scss";

interface displayType {
  componentType: string;
  options: Record<string, any>;
}

function CodeDisplay({ componentType, options }: displayType) {
  const [codeFormat, setCodeFormat] = useState<"react" | "html">("react");
  const [copyStatus, setCopyStatus] = useState("복사하기");

  const generateCode = () => {
    if (componentType === "button") {
      if (codeFormat === "react") {
        return `
      const Button = () => {
        return (
          <button 
            style={{
              backgroundColor: "${options.color}",
              borderRadius: "${options.borderRadius}",
              padding:
              "${options.size}" === "small"
                ? "6px 12px"
                : "${options.size}" === "medium"
                ? "8px 16px"
                : "10px 20px",
        
              border: "none",
              cursor: "pointer",}}
            >
              ${options.text || "버튼"}
            </button>
      );
    };`;
      } else if (codeFormat === "html") {
        return `
        <button class="custom-button">${options.text || "버튼"}</button>
        
        <style>
          .custom-button{
            background-color: ${options.color}
            border-radius: ${options.borderRadius}
            padding:
              ${options.size} === "small"
                ? "6px 12px"
                : ${options.size} === "medium"
                ? "8px 16px"
                : "10px 20px",     
            border: none,
            cursor: pointer
          }
        </style>
        `;
      }
    }
    if (componentType === "card") {
      if (codeFormat === "react") {
        return `
        const Card = () => {
          return (
            <div 
                style={{ backgroundColor: "${options.backgroundColor}",
                borderRadius: "${options.borderRadius}",
                boxShadow:
                  "${options.shadow}" === "small"
                    ? "2px 2px 5px rgba(0, 0, 0, 0.3)"
                    : "${options.shadow}" === "medium"
                    ? "5px 5px 10px rgba(0, 0, 0, 0.3)"
                    : "8px 8px 15px rgba(0, 0, 0, 0.3)",
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
    }
    if (componentType === "navbar") {
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
    }
    return "// 지원되지 않는 컴포넌트 또는 포맷입니다.";
  };
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(generateCode());
      setCopyStatus("복사완료!");
      setTimeout(() => setCopyStatus("복사하기"), 2000);
    } catch (err) {
      setCopyStatus("복사 실패");
      setTimeout(() => setCopyStatus("복사하기"), 2000);
    }
  };

  useEffect(() => {
    document.querySelectorAll("pre code").forEach((block) => {
      hljs.highlightElement(block as HTMLElement);
    });
  }, [componentType, options, codeFormat]);

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

      <button className={styles.copyButton} onClick={handleCopy}>
        {copyStatus}
      </button>
    </div>
  );
}

export default CodeDisplay;
