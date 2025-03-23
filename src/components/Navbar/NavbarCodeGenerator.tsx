import React, { useState, CSSProperties, useEffect } from "react";
import styles from "./Navbar.module.scss";
import hljs from "highlight.js";
import "highlight.js/styles/github.css";

interface NavbarType {
  options: Record<string, any>;
}

function NavbarCode({ options }: NavbarType) {
  const [codeFormat, setCodeFormat] = useState<"react" | "html">("react");
  const generateCode = () => {
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

export default NavbarCode;
