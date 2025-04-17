// 컴포넌트 타입 정의
export type ComponentType = "button" | "card" | "navbar";

// 컴포넌트 옵션 타입 정의
export type ComponentOptionsTypeMap = {
  button: ButtonOptions;
  card: CardOptions;
  navbar: NavbarOptions;
};

export interface ButtonOptions {
  backgroundColor: string;
  size: "small" | "medium" | "large";
  borderRadius: string;
  text: string;
  color: string;
}

export interface CardOptions {
  backgroundColor: string;
  borderRadius: string;
  shadow: "small" | "medium" | "large";
  padding: string;
  children?: string;
  color: string;
}

export interface NavbarOptions {
  color: string;
  backgroundColor: string;
  textColor: string;
  height: string;
  logo: string;
}
