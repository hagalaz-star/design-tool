import React from "react";
import styles from "./Navbar.module.scss";
import { CodeDisplay } from "@/utils/codeGenerators";
import { NavbarOptions } from "@/types";

interface NavbarType {
  options: NavbarOptions;
  codeFormat: "react-tailwind" | "react-scss";
  formatChange?: (format: "react-tailwind" | "react-scss") => void;
}

function NavbarCode({ options, codeFormat, formatChange }: NavbarType) {
  return (
    <CodeDisplay
      componentType="navbar"
      options={options}
      styles={styles}
      codeFormat={codeFormat}
      onFormatChange={formatChange}
    />
  );
}

export default NavbarCode;
