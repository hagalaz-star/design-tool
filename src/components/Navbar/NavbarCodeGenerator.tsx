import React from "react";
import styles from "./Navbar.module.scss";
import { CodeDisplay } from "@/utils/codeGenerators";
import { NavbarOptions } from "@/types";

interface NavbarType {
  options: NavbarOptions;
}

function NavbarCode({ options }: NavbarType) {
  return (
    <CodeDisplay componentType="navbar" options={options} styles={styles} />
  );
}

export default NavbarCode;
