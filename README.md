This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

```
app/
├── layout.tsx (메인 레이아웃)
├── page.tsx (홈페이지)
├── globals.scss (전역 스타일)
└── components/
├── Generator/
│ ├── Generator.tsx (컴포넌트 제너레이터 메인)
│ ├── Generator.module.scss (스타일)
│ ├── ComponentPreview.tsx (미리보기 영역)
│ ├── ComponentPreview.module.scss
│ ├── OptionsPanel.tsx (옵션 선택 패널)
│ ├── OptionsPanel.module.scss
│ └── CodeDisplay.tsx (생성된 코드 표시)
│ └── CodeDisplay.module.scss
└── UI/ (미리 정의된 UI 컴포넌트들)
```
