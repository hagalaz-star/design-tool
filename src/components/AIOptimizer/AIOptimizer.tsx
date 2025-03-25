import React from "react";
import { ComponentType, ComponentOptionsTypeMap } from "../../types/index";

interface AIOptimaizerProps {
  currentCode: string;
  componentType: ComponentType;
  options: ComponentOptionsTypeMap[ComponentType];
  codeFormat: "react" | "html";
  onApplyOptimized: (optimizedCode: string) => void;
}
