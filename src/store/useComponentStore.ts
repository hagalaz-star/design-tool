import { create } from "zustand";
import {
  ComponentType,
  ComponentOptionsTypeMap,
  ButtonOptions,
  CardOptions,
  NavbarOptions,
} from "../types/index";

const ButtonDefaults: ButtonOptions = {
  backgroundColor: "#3a86ff",
  size: "medium",
  borderRadius: "4px",
  text: "버튼",
  color: "#B096A5",
};

const CardDefaults: CardOptions = {
  backgroundColor: "#ffffff",
  borderRadius: "8px",
  shadow: "medium",
  padding: "16px",
  color: "#D9643F",
};

const NavbarDefaults: NavbarOptions = {
  color: "#B3C3FF",
  backgroundColor: "#333333",
  textColor: "#ffffff",
  height: "60px",
  logo: "",
};

// 컴포넌트 타입에 따른 기본값 매핑
const defaultOptions = {
  button: ButtonDefaults,
  card: CardDefaults,
  navbar: NavbarDefaults,
};

interface ComponentStore {
  // 상태(State) 부분
  selectedComponent: ComponentType;
  componentOptions: ComponentOptionsTypeMap[ComponentType];
  codeFormat: "react-tailwind" | "react-scss";
  customCode: string | null;

  // 액션(Action)부분
  setSelectedComponent: (newType: ComponentType) => void;
  setComponentOptions: <T extends ComponentType>(
    name: keyof ComponentOptionsTypeMap[T],
    value: any
  ) => void;
  setCodeFormat: (format: "react-tailwind" | "react-scss") => void;
  setCustomCode: (code: string | null) => void;
  resetOptions: () => void;
}

const useComponentStore = create<ComponentStore>((set) => ({
  // 초기 상태 값
  selectedComponent: "button",
  componentOptions: ButtonDefaults as ComponentOptionsTypeMap[ComponentType],
  codeFormat: "react-tailwind",
  customCode: null,

  // 컴포넌트 타입 변경 시 해당 타입의 기본 옵션으로 상태 초기화
  setSelectedComponent: (newType) =>
    set({
      selectedComponent: newType,
      componentOptions: defaultOptions[
        newType
      ] as ComponentOptionsTypeMap[ComponentType],
      customCode: null,
    }),

  // 특정 옵션 업데이트
  setComponentOptions: (name, value) => {
    set((state) => ({
      componentOptions: {
        ...state.componentOptions,
        [name]: value,
      } as ComponentOptionsTypeMap[ComponentType],
    }));
  },

  setCodeFormat: (format) => set({ codeFormat: format }),

  setCustomCode: (code) => set({ customCode: code }),

  // 현재 선택된 컴포넌트 타입의 옵션을 기본값으로 리셋
  resetOptions: () =>
    set((state) => ({
      componentOptions: defaultOptions[state.selectedComponent],
      customCode: null,
    })),
}));

export default useComponentStore;
