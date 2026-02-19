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
