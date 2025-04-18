import React, { CSSProperties } from "react";
import styles from "./Navbar.module.scss";
import { NavbarOptions } from "@/types";

interface NavbarOptionsProps {
  options: NavbarOptions;
}

function NavbarPreview({ options }: NavbarOptionsProps) {
  const navbarStyle: CSSProperties = {
    backgroundColor: options.backgroundColor,
    color: options.logoColor,
    height: options.height,
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
    color: options.textColor,
  };
  return (
    <nav style={navbarStyle}>
      <div style={logoStyle}>
        {String(options.logo) ? options.logo : "로고"}
      </div>
      <ul style={menuStyle}>
        <li style={menuItemStyle}>메뉴1</li>
        <li style={menuItemStyle}>메뉴2</li>
        <li style={menuItemStyle}>메뉴3</li>
      </ul>
    </nav>
  );
}

export default NavbarPreview;
