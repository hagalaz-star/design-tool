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
  hoverEffect: "scale",
  clickEffect: "press",
  disabled: false,
};

const CardDefaults: CardOptions = {
  backgroundColor: "#ffffff",
  borderRadius: "8px",
  shadow: "medium",
  padding: "16px",
  color: "#D9643F",

  layout: "vertical",
  imagePosition: "top",
  contentAlignment: "left",

  title: "카드 제목",
  description: "카드 설명을 입력하세요.",
  imageUrl: "",
};

const NavbarDefaults: NavbarOptions = {
  // 기본 스타일
  backgroundColor: "#ffffff",
  textColor: "#333333",
  height: "60px",

  // 로고
  logo: "",
  logoColor: "#333333",
  logoSize: "medium",

  // 메뉴
  menuItems: ["홈", "소개", "서비스", "연락처"],
  menuPosition: "right",
  menuSpacing: "20px",
  menuFontSize: "16px",
  menuFontWeight: "normal",

  // 반응형
  breakpoint: "md",
  mobileMenuIcon: "hamburger",
  mobileMenuColor: "#333333",

  // 효과
  fixed: false,
  shadow: "none",
  transparent: false,
  blur: false,

  // 테두리
  borderBottom: false,
  borderColor: "#e0e0e0",
  borderWidth: "1px",
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
  isPreviewZoomed: boolean;

  // 액션(Action)부분
  setSelectedComponent: (newType: ComponentType) => void;
  setComponentOptions: <T extends ComponentType>(
    name: keyof ComponentOptionsTypeMap[T],
    value: any
  ) => void;
  setCodeFormat: (format: "react-tailwind" | "react-scss") => void;
  setCustomCode: (code: string | null) => void;
  resetOptions: () => void;
  togglePreviewZoom: () => void;
}

const useComponentStore = create<ComponentStore>((set) => ({
  // 초기 상태 값
  selectedComponent: "button",
  componentOptions: ButtonDefaults as ComponentOptionsTypeMap[ComponentType],
  codeFormat: "react-tailwind",
  customCode: null,
  isPreviewZoomed: false,

  // 컴포넌트 타입 변경 시 해당 타입의 기본 옵션으로 상태 초기화
  setSelectedComponent: (newType) =>
    set({
      selectedComponent: newType,
      componentOptions: defaultOptions[
        newType
      ] as ComponentOptionsTypeMap[ComponentType],
      customCode: null,
      isPreviewZoomed: false,
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
      isPreviewZoomed: false,
    })),

  // 프리뷰 확대/축소 토글
  togglePreviewZoom: () =>
    set((state) => ({
      isPreviewZoomed: !state.isPreviewZoomed,
    })),
}));

export default useComponentStore;
