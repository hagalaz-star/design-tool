"use client";

import React from "react";
import styles from "./OptionsPanel.module.scss";

// Props 타입 정의
interface OptionsPanelProps {
  componentType: string;
  options: Record<string, any>;
  onOptionChange: (name: string, value: any) => void;
}

function OptionsPanel({
  componentType,
  options,
  onOptionChange,
}: OptionsPanelProps) {
  const renderOptions = () => {};
}
