# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

VAKE-STANDALONE is a Next.js App Router application for community sharing features, built with TypeScript, Tailwind CSS, and internationalization support. The app uses React 19 and Next.js 16.

## Development Commands

### Setup

```bash
nvm use                    # Switch to Node.js 24.12.0
pnpm install               # Install dependencies
```

Create `.env.local` at project root based on `.env.example`:

- `NEXT_PUBLIC_SERVER_TYPE`: 'dev' or 'prod'
- `NEXT_PUBLIC_APP_URL`: API domain
- `KAKAO_JS_KEY_TEST`: Kakao test app JavaScript key
- `KAKAO_JS_KEY`: Kakao production app JavaScript key
- `PLUGIN_APP_ID`: Plugin static app ID for staging/production

### Running the App

```bash
pnpm dev                   # Start dev server at http://localhost:3000
pnpm build                 # Build for production
pnpm start                 # Start production server
```

### Code Quality

```bash
pnpm lint                  # Run ESLint
pnpm type-check            # Run TypeScript compiler check
```

## Architecture

### Routing Structure

Uses Next.js App Router with internationalized routes under `src/app/[locale]/`:

- Dynamic locale parameter (`ko`, `en`)
- Main page at `/[locale]`
- Shares feature at `/[locale]/shares`

### Internationalization (i18n)

- **Server-side**: Uses `createTranslation()` from `src/utils/localization/server.ts`
- **Client-side**: Uses `useTranslation()` hook from `src/utils/localization/client.ts`
- **Translation files**: Located at `src/utils/localization/locales/{locale}/{namespace}.json`
- **Supported locales**: `ko` (fallback), `en`
- **Namespaces**: `common`, `shares`
- Translations loaded dynamically via `i18next-resources-to-backend`

### API Layer

- **Base fetcher**: `src/api/model/fetchers.ts` provides `getJson`, `postJson`, `putJson`, `deleteJson`
- All API calls use `NEXT_PUBLIC_APP_URL` environment variable
- Custom error handling with `CustomApiError` interface
- API functions in `src/api/` (e.g., `shares.ts`)

### State Management

- **React Query**: Used for server state via `@tanstack/react-query`
- Query hooks in `src/queries/` directory
- Default configuration in `src/app/providers.tsx`:
  - Zero retries by default
  - React Query DevTools enabled in development

### Styling

- **Tailwind CSS v4** with utility-first approach
- Global styles and custom animations in `src/app/globals.css`
- Custom animations defined using `@theme` directive:
  - `overlayShow`, `contentShow`, `fullContentShow` for dialog animations
- Minimal custom reset in `@layer base` (Tailwind's Preflight handles most resets)
- Font configuration using Next.js font optimization (`Noto Sans KR`)

### Provider Setup

Root providers configured in `src/app/[locale]/layout.tsx`:

1. `QueryClientProvider` - React Query
2. `KakaoScript` - Kakao SDK initialization

Font applied via `noto_sans_kr.className` on the `<html>` element.

### Path Aliases

TypeScript configured with `@/*` alias mapping to `src/*`

### Environment-Specific Configuration

- Image optimization via Next.js `remotePatterns` (changes based on `NEXT_PUBLIC_SERVER_TYPE`)
- Kakao JavaScript key switches based on `NODE_ENV`
- TypeScript configured with `moduleResolution: "bundler"` for Next.js 16 + Turbopack compatibility

### Dependency Overrides

- `minimatch >=10.2.3`: `eslint-config-next`의 sub-plugin들(`eslint-plugin-import`, `eslint-plugin-jsx-a11y`, `eslint-plugin-react`)이 minimatch 3.x(ReDoS 취약)를 간접 의존. `eslint-config-next`가 ESLint 10을 지원하기 전까지 `pnpm.overrides`로 강제 업그레이드. 하한은 GHSA-7r86-cg39-jmmj(globstar 조합 백트래킹 ReDoS) 패치 버전.
- `nanoid ^3.3.18`: `postcss`가 nanoid를 간접 의존하는데 3.3.17에 무한루프 취약점(GHSA-2v37-7h3g-55p8, `customAlphabet`/`customRandom` size=0). postcss는 nanoid 3.x API에 묶여 있어 major 상향(6.x) 대신 3.3.x 패치 라인(3.3.18)으로 핀.
- `brace-expansion >=5.0.7`: `eslint` → `minimatch`가 간접 의존하는데 5.0.7 미만에 DoS 취약점(GHSA-3jxr-9vmj-r5cp, 연속 `{}` 그룹 지수 시간 전개). 부모 체인이 패치 버전을 내주기 전까지 override로 강제.
- `@babel/core ^7.29.6`: `next`(styled-jsx)와 `eslint-config-next`가 간접 의존하는데 7.29.0 이하에 sourceMappingURL 통한 임의 파일 읽기(GHSA-4x5r-pxfx-6jf8). 부모가 7.x에 묶여 있어 8.x 이탈을 막기 위해 7.29.x 패치 라인으로 핀.

sharp 취약점(GHSA-f88m-g3jw-g9cj)은 별도 override 없이 `next`를 16.3.x로 상향해 해결한다 — `next@16.3.0`부터 sharp를 `^0.35.3`(패치 버전)로 요구하기 때문.

sharp 0.35.4(GHSA-rgj7-g3m4-5g8c, 번들 libheif 취약점)도 override 없이 락파일 갱신만으로 해결된다 — `next`의 `^0.35.3` 범위 안이다. `eslint`는 `^9.39.5`로 하한을 올려 둔다: 9.39.4 이하가 `ajv ^6.12.4`를 요구해 취약한 ajv 6.12.6을 끌어오기 때문이다.

## Key Patterns

### Plugin API Headers

API requests to plugin endpoints require custom headers:

- `plugin-community-id`: Base community ID
- `plugin-ticket`: Authentication ticket
- `plugin-app-id`: Static app ID from environment

### Component Organization

- Common/shared components in `src/components/common/`
- Feature-specific components in `src/components/{feature}/` (e.g., `shares/`)

### Type Definitions

- Global type definitions in `src/@types/`
- Feature-specific types in `src/types/`
