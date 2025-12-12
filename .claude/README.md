# Payload + tRPC Template Development Guide for AI Agents

This directory contains comprehensive documentation for AI agents working on the Payload + tRPC template codebase.

## Quick Navigation

- **[Commands](commands.md)** - Build, test, and development commands
- **[Knowledge Base](knowledge-base.md)** - Knowledge base & best practices
- **[Architecture Overview](#architecture-overview)** - System structure and patterns

## Getting Started

Payload + tRPC Template is a single workspace using pnpm. The main application is in `src/` with Next.js App Router.

### Key Directories

- `src/app/` - Next.js routes (App Router)
- `src/payload/` - Payload CMS (collections, access, hooks, etc.)
- `src/trpc/` - tRPC setup and routers
- `src/components/` - React components

## Architecture Overview

### Database Layer

- **Payload CMS** with MongoDB
- Collections in `src/payload/collections/`
- Always use `depth: 0` and `limit` in queries

### API Layer

- **tRPC v11** for type-safe APIs
- Routers in `src/trpc/routers/`
- TanStack React Query for data fetching

### Frontend

- **Next.js 15** with App Router
- **React 19** with TypeScript
- **Tailwind CSS v4** for styling

## Common Patterns

### Error Handling

- Use early returns to reduce nesting
- Throw TRPCError with descriptive messages
- Use Zod for input validation

### Performance

- Set `depth: 0` in all Payload queries
- Set explicit `limit` on all queries
- Avoid O(n²) logic in backend code

### Security

- Never commit secrets or API keys
- Always validate input with Zod

## Testing Strategy

- **Unit tests** with Vitest
- **E2E tests** with Playwright
- Test files use `.test.ts` extension

## Pull Request Guidelines

For large PRs (>500 lines or >10 files):

- Split by feature boundaries
- Separate database changes, backend logic, frontend components
- Pattern: Schema → Backend → Frontend → Tests
