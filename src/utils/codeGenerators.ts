import React from "react";
import { ButtonOptions, CardOptions, NavbarOptions } from "@/types/index";

export function generateButtonCode(
  options: ButtonOptions,
  codeFormat: "react" | "html"
): string {
  if (codeFormat === "react") {
    return `
  const Button = () => {
    return (
      <button 
        style={{
          backgroundColor: "${options.backgroundColor}",
          borderRadius: "${options.borderRadius}",
          padding: ${
            options.size === "small"
              ? "'6px 12px'"
              : options.size === "medium"
              ? "'8px 16px'"
              : "'10px 20px'"
          },
          border: "none",
          cursor: "pointer",
          color: "${options.color}"
        }}
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
    .custom-button {
      background-color: ${options.backgroundColor};
      border-radius: ${options.borderRadius};
      padding: ${paddingValue};    
      border: none;
      cursor: pointer;
      color: ${options.color};
    }
  </style>`;
  }

  return "// 지원되지 않는 포맷입니다.";
}

export function generateCardCode(
  options: CardOptions,
  codeFormat: "react" | "html"
): string {
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
}

export function generateNavbarCode(
  options: NavbarOptions,
  codeFormat: "react" | "html"
): string {
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
  return "// 지원되지 않는 컴포넌트 또는 포맷입니다.";
}
