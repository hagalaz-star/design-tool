import React from "react";
import styles from "./Navbar.module.scss";
import { CodeDisplay } from "@/utils/CodeDisplay";
import { NavbarOptions } from "@/types";

interface NavbarType {
  options: NavbarOptions;
  codeFormat: "react-tailwind" | "react-scss";
  onFormatChange: (format: "react-tailwind" | "react-scss") => void;
}

function NavbarCode({ options, codeFormat, onFormatChange }: NavbarType) {
  return (
    <CodeDisplay
      componentType="navbar"
      options={options}
      styles={styles}
      codeFormat={codeFormat}
      onFormatChange={onFormatChange}
    />
  );
}

export default NavbarCode;
