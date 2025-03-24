// 컴포넌트 타입 정의
export type ComponentType = "button" | "card" | "navbar";

// 컴포넌트 옵션 타입 정의

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

export type ComponentOptionsTypeMap = {
  button: ButtonOptions;
  card: CardOptions;
  navbar: NavbarOptions;
};

// // 모든 옵션을 하나의 타입으로 정의
// export interface ComponentOptions {
//   // 버튼 옵션
//   color?: string;
//   size?: "small" | "medium" | "large";
//   text?: string;

//   // 카드 옵션
//   backgroundColor?: string;
//   shadow?: "small" | "medium" | "large";

//   // 공통 옵션
//   borderRadius?: string;
//   padding?: string;

//   // 네비바 옵션
//   textColor?: string;
//   height?: string;
//   logo?: boolean;

//   // 기타 필요한 옵션
//   [key: string]: any;
// }
