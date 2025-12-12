# Coding Standards & Best Practices

## Import Guidelines

### Type Imports

```typescript
// ✅ Good - Use type imports for TypeScript types
import type { User } from "@/payload-types";
import type { TRPCError } from "@trpc/server";

// ❌ Bad - Regular import for types
import { User } from "@/payload-types";
```

## Code Structure

### Early Returns

- Prefer early returns to reduce nesting: `if (!user) return null;`

### Single Object Parameters

- Use object parameters for functions with multiple arguments

### Security Rules

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

## tRPC Pattern (Critical)

```typescript
// ✅ Good - useTRPC() MUST be inside component
"use client";
import { useQuery } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";

export function Component() {
  const trpc = useTRPC();
  const { data } = useQuery(trpc.hello.queryOptions({ text: "world" }));
}

// ❌ Bad - Module-level hook call
const trpc = useTRPC(); // Will break!
```
