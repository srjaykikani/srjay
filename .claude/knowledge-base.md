# Knowledge Base - Best Practices

## tRPC Usage Pattern (Critical)

This template uses tRPC v11 with TanStack React Query v5.

```typescript
// ✅ CORRECT - useTRPC() inside component only
"use client";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";

export function MyComponent() {
  const trpc = useTRPC(); // MUST be inside component
  const query = useQuery(trpc.hello.queryOptions({ text: "world" }));
  const mutation = useMutation(trpc.user.create.mutationOptions());
}
```

```typescript
// ❌ WRONG - Never do these
const trpc = useTRPC(); // At module level - will break
import { trpc } from "@/trpc/client"; // Wrong import pattern
```

## Server Components with tRPC

```typescript
// Server component - prefetch with HydrateClient
import { getQueryClient, trpc, HydrateClient } from "@/trpc/server";

export default async function Page() {
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(trpc.hello.queryOptions({ text: "world" }));

  return (
    <HydrateClient>
      <ClientComponent />
    </HydrateClient>
  );
}
```

## Payload Query Patterns

```typescript
// ✅ Good - Always use depth: 0 and limit
const users = await payload.find({
  collection: "users",
  where: { role: { equals: "admin" } },
  depth: 0,
  limit: 20,
});

// ❌ Bad - No limits, auto-populates everything
const users = await payload.find({
  collection: "users",
});
```

## Error Handling

```typescript
// ✅ Good - Descriptive error with context
throw new TRPCError({
  code: "NOT_FOUND",
  message: `User with ID "${userId}" not found`,
});

// ❌ Bad - Generic error
throw new Error("Not found");
```

## Authorization in Pages

Don't put permission checks in `layout.tsx`! Always put them in `page.tsx`.

```typescript
// app/admin/page.tsx
export default async function AdminPage() {
  const payload = await getPayload({ config });
  const { user } = await payload.auth({ headers: await headers() });

  if (!user || user.role !== "admin") {
    redirect("/");
  }

  return <div>Admin Dashboard</div>;
}
```

## Access Control Helpers

Use built-in access helpers from `src/payload/access/`:

```typescript
import { anyone } from '@/payload/access/anyone'
import { authenticated } from '@/payload/access/authenticated'

export const Media: CollectionConfig = {
  access: {
    read: anyone,          // Public read access
    create: authenticated, // Requires logged-in user
    update: authenticated,
    delete: authenticated,
  },
}
```

- `anyone` - Always returns `true`, public access
- `authenticated` - Returns `true` if `req.user` exists

## Utility Functions

Available utilities in `src/utilities/` and `src/lib/`:

```typescript
// cn() - Merge Tailwind classes (clsx + tailwind-merge)
import { cn } from '@/lib/utils'
cn('px-4 py-2', isActive && 'bg-blue-500', className)

// deepMerge() - Deep object merging
import { deepMerge } from '@/utilities/deepMerge'
const merged = deepMerge(defaults, overrides)

// getURL() - Get server URL
import { getServerSideURL, getClientSideURL } from '@/utilities/getURL'

// getCachedGlobal() - Fetch globals with ISR caching
import { getCachedGlobal } from '@/utilities/getGlobals'
const header = await getCachedGlobal('header', 1)()

// mergeOpenGraph() - Merge OpenGraph metadata
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
```

## Collection Groups

Use collection groups to organize admin sidebar:

```typescript
import { CollectionGroups } from '@/payload/shared/collection-groups'

export const Posts: CollectionConfig = {
  slug: 'posts',
  admin: { group: CollectionGroups.Content },
}
```

Available groups: `Content`, `Media`, `System`

## Admin Branding

Custom Logo/Icon components in `src/payload/components/graphics/`:

```typescript
// payload.config.ts
admin: {
  components: {
    graphics: {
      Logo: '@/payload/components/graphics/Logo',
      Icon: '@/payload/components/graphics/Icon',
    },
  },
  meta: {
    favicon: '/favicon.svg',
    ogImage: '/og-image.png',
    titleSuffix: '- My App',
  },
}
```

## Globals (Header/Footer)

CMS-managed navigation via Payload globals:

```typescript
// Fetch cached global in server components
import { getCachedGlobal } from '@/utilities/getGlobals'

const header = await getCachedGlobal('header', 1)()
const footer = await getCachedGlobal('footer', 1)()
```

Globals auto-revalidate on changes via hooks in `payload/globals/*/hooks/`.

## Theme System

Theme provider with dark/light mode support:

```typescript
// Use theme in client components
'use client'
import { useTheme } from '@/providers/Theme'

export function Component() {
  const { theme, setTheme } = useTheme()
  return <button onClick={() => setTheme('dark')}>Dark</button>
}
```

- Themes: `'light'` | `'dark'` | `null` (system)
- Persisted in localStorage
- CSS variables in `styles.css`
- `data-theme` attribute on `<html>`

## Link Field

Reusable link field for collections/globals:

```typescript
import { link } from '@/payload/fields/link'

fields: [
  link({ appearances: false }), // internal/external links
]
```

## Common Gotchas

1. **Forgetting depth: 0** - Will auto-populate all relations, slow
2. **Module-level useTRPC** - Hooks can't be called at module level
3. **Using parse() instead of safeParse()** - Throws on invalid input

## Useful Links

- **Payload CMS**: https://payloadcms.com/docs
- **tRPC Server Components**: https://trpc.io/docs/client/tanstack-react-query/server-components
- **TanStack Query**: https://tanstack.com/query/latest
