# Payload + tRPC Template

You are a senior engineer working on a Next.js + Payload CMS + tRPC template. Prioritize type safety, security, and small reviewable diffs.

## Do

- Use `import type { X }` for TypeScript type imports
- Use early returns: `if (!data) return null;`
- Use TRPCError with descriptive messages
- Use conventional commits: `feat:`, `fix:`, `refactor:`
- Set `depth: 0` and `limit` in all Payload queries
- Put permission checks in `page.tsx`, not `layout.tsx`
- Import directly from source: `@/components/ui/button` not `@/components/ui`

## Don't

- Never use `as any` - use proper type-safe solutions
- Never commit secrets or API keys
- Never use barrel imports from index.ts files
- Never create large PRs (>500 lines or >10 files)

## Commands

```bash
pnpm dev              # Start dev server (port 3000)
pnpm check-types      # Type check
pnpm lint             # Lint
pnpm test             # Unit tests (Vitest)
pnpm generate:types   # Regenerate types after schema changes
```

## Structure

```
src/
├── app/                 # Next.js App Router
│   ├── (frontend)/      # Public routes (/, /blog, /gallery)
│   ├── (payload)/       # Payload Admin
│   └── api/trpc/        # tRPC endpoint
├── components/          # React components
│   ├── Header/          # Site header (nav, theme)
│   ├── Footer/          # Site footer
│   ├── Link/            # CMSLink component
│   ├── Logo/            # Logo with theme support
│   ├── Blog/            # Blog components (BlogCard)
│   ├── Gallery/         # Gallery with PhotoSwipe lightbox
│   ├── ScrollSpy/       # Fixed navigation component
│   ├── TableOfContents/ # Blog post TOC
│   ├── TechTag/         # Skill icons with tags
│   ├── sections/        # Homepage sections
│   └── kibo-ui/         # GitHub contribution graph
├── payload/             # Payload CMS
│   ├── access/          # Access control (anyone, authenticated)
│   ├── collections/     # CMS collections (Blogs, Gallery, etc.)
│   ├── fields/          # Reusable fields (link)
│   ├── globals/         # Header, Footer, Profile globals
│   ├── plugins/         # Payload plugins (storage)
│   └── shared/          # Collection groups
├── providers/           # React providers
│   ├── Theme/           # Theme provider (dark/light)
│   └── HeaderTheme/     # Per-page header theme
├── trpc/                # tRPC setup
│   ├── init.ts          # Context, procedures
│   ├── client.tsx       # Client provider (useTRPC)
│   ├── server.tsx       # Server proxy (HydrateClient)
│   └── routers/_app.ts  # Root router
├── lib/                 # Shared libraries (cn utility)
├── hooks/               # Custom React hooks (usePhotoSwipe)
├── utilities/           # Shared utils (getURL, deepMerge, etc.)
├── payload.config.ts    # Payload configuration
└── payload-types.ts     # Generated types
```

## tRPC Pattern (Critical)

```typescript
// Client components - useTRPC() MUST be inside component
"use client";
import { useQuery } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";

export function Component() {
  const trpc = useTRPC();
  const { data } = useQuery(trpc.hello.queryOptions({ text: "world" }));
}

// Server components - prefetch with HydrateClient
import { getQueryClient, trpc, HydrateClient } from "@/trpc/server";

export default async function Page() {
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(trpc.hello.queryOptions({ text: "world" }));
  return <HydrateClient><ClientComponent /></HydrateClient>;
}
```

## Workflow

Before modifying code:
1. Is investigation needed first?
2. Does this need a plan?
3. What info is missing?
4. How will it be tested?

Run `pnpm check-types` before commits.

## References

- **Payload CMS**: https://payloadcms.com/llms.txt
- **tRPC Server Components**: https://trpc.io/docs/client/tanstack-react-query/server-components

## Extended Documentation

For detailed information, see the `.claude/` directory:

- **[.claude/README.md](.claude/README.md)** - Architecture overview and patterns
- **[.claude/commands.md](.claude/commands.md)** - Complete command reference
- **[.claude/knowledge-base.md](.claude/knowledge-base.md)** - Best practices and examples
- **[.claude/coding-standards.md](.claude/coding-standards.md)** - Coding standards
