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
src/
├── app/
│   ├── page.tsx
│   ├── layout.tsx
│   └── globals.scss
├── components/
│   ├── Generator/
│   │   └── index.tsx  # 메인 Generator 컴포넌트 (기존과 동일)
│   ├── Button/
│   │   ├── ButtonOptions.tsx
│   │   ├── ButtonPreview.tsx
│   │   └── ButtonCodeGenerator.ts
│   ├── Card/
│   │   ├── CardOptions.tsx
│   │   ├── CardPreview.tsx
│   │   └── CardCodeGenerator.ts
│   └── Navbar/
│       ├── NavbarOptions.tsx
│       ├── NavbarPreview.tsx
│       └── NavbarCodeGenerator.ts
└── types/
    └── index.ts  # 기존 타입 정의 (개선된 버전)
```
