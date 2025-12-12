# Build, Test & Development Commands

## Development Commands

- `pnpm dev` - Start development server (port 3000, Turbopack)

## Build Commands

- `pnpm build` - Build all packages and apps
- `pnpm generate:types` - Regenerate types after schema changes

## Lint & Type Check

- `pnpm lint` - Run ESLint on codebase
- `pnpm lint:fix` - Run ESLint and fix issues
- `pnpm check-types` - Run TypeScript type checking

## Testing Commands

### Unit Tests

- `pnpm test` - Run unit tests (Vitest)
- `pnpm vitest run path/to/file.test.ts` - Run tests for specific file

### End-to-End Tests

- `pnpm test:e2e` - Run E2E tests (Playwright)

## Useful Development Patterns

### Running Single Tests

```bash
# Unit test specific file
pnpm vitest run src/lib/utils.test.ts

# E2E test specific file
pnpm test:e2e tests/auth.spec.ts
```

### Environment Setup

- Copy `.env.example` to `.env` and configure
- Run `pnpm dev` for development
