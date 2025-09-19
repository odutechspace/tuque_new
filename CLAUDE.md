# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js website template built with Payload CMS v3. It's a full-stack application that includes:
- **Frontend**: Next.js 15 with App Router, TypeScript, TailwindCSS, and shadcn/ui components
- **Backend**: Payload CMS with MongoDB database
- **Content Management**: Collections for Pages, Posts, Media, Categories, and Users
- **Layout Builder**: Dynamic page building with reusable blocks (Hero, Content, Media, CTA, Archive)

## Development Commands

```bash
# Development
pnpm dev                    # Start development server (localhost:3000)
pnpm dev:prod              # Build and start in production mode

# Building and Production
pnpm build                  # Build for production
pnpm start                  # Start production server
pnpm postbuild             # Generates sitemap after build

# Code Quality
pnpm lint                   # Run ESLint
pnpm lint:fix              # Run ESLint with auto-fix

# Testing
pnpm test                   # Run all tests (integration + e2e)
pnpm test:int              # Run integration tests (Vitest)
pnpm test:e2e              # Run end-to-end tests (Playwright)

# Payload CMS
pnpm payload               # Access Payload CLI
pnpm generate:types        # Generate TypeScript types for Payload
pnpm generate:importmap    # Generate import map for admin panel

# Package Management
pnpm ii                    # Install dependencies (ignore workspace)
pnpm reinstall             # Clean reinstall
```

## Architecture

### Core Structure
- **`src/app/(frontend)/`** - Next.js frontend pages using App Router
- **`src/app/(payload)/`** - Payload CMS admin panel and API routes
- **`src/collections/`** - Payload collections (Pages, Posts, Media, Categories, Users)
- **`src/blocks/`** - Reusable layout building blocks
- **`src/components/`** - Shared React components including shadcn/ui components
- **`src/providers/`** - React context providers (Theme, etc.)
- **`src/utilities/`** - Helper functions and utilities

### Key Files
- **`src/payload.config.ts`** - Payload CMS configuration
- **`src/payload-types.ts`** - Auto-generated TypeScript types
- **`next.config.js`** - Next.js configuration with Payload integration
- **`components.json`** - shadcn/ui configuration

### Database and Collections
- Uses MongoDB with Mongoose adapter
- **Pages**: Layout builder enabled, draft preview, SEO
- **Posts**: Blog posts with categories, layout builder, draft preview
- **Media**: File uploads with automatic resizing and focal point
- **Categories**: Nested taxonomy for organizing posts
- **Users**: Authentication-enabled for admin access

### Layout Builder System
Pages and Posts use a flexible layout builder with these blocks:
- **Hero** (HighImpact, MediumImpact, LowImpact, PostHero)
- **Content** (Rich text with Lexical editor)
- **MediaBlock** (Images/videos)
- **CallToAction** (CTA sections)
- **ArchiveBlock** (Content listings)
- **Form** (Contact forms with various field types)

### Frontend Features
- **Draft Preview**: Preview unpublished content
- **Live Preview**: Real-time editing preview
- **SEO Plugin**: Complete meta tag management
- **Search Plugin**: Site-wide search functionality
- **Redirects Plugin**: URL redirect management
- **Theme System**: Dark/light mode with persistence

### Testing
- **Integration tests**: Vitest (`tests/int/`)
- **E2E tests**: Playwright (`tests/e2e/`)
- Test configuration in `vitest.config.mts` and `playwright.config.ts`

## Important Notes

- Uses `pnpm` as package manager (required by engines)
- Environment variables needed in `.env` (copy from `.env.example`)
- Admin panel accessible at `/admin` after seeding database
- Database seeding available via admin panel or `/api/next/seed` endpoint
- Scheduled publishing uses job queue (configured for Vercel cron limitations)
- Static generation with on-demand revalidation for content changes