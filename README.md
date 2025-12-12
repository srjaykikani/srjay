# Payload + tRPC Template

A fully featured template for building type-safe full-stack applications with [Payload CMS](https://payloadcms.com/) and [tRPC](https://trpc.io/).

This template provides end-to-end type safety using tRPC v11 with TanStack React Query, Payload CMS for content management, and Next.js 15 with App Router.

> [!NOTE]
> This template is under active development. Features may change, and some functionality may not be fully stable or documented. Feedback and suggestions are welcome.

## Getting Started

### Local Development Setup

Follow these steps to set up the project for local development:

1. Create a new repo from this template:

   Click **"Use this template"** button above, or:

   ```bash
   gh repo create my-app --template srjaykikani/payload-trpc-template --clone
   cd my-app
   ```

2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Create a `.env` file:

   ```bash
   cp .env.example .env
   ```

4. Generate and set a secure secret key:

   - Visit https://payloadsecret.io/ to generate a random 32-byte secret
   - Set this as your `PAYLOAD_SECRET` in the `.env` file

5. Set up MongoDB Atlas:

   - Create a free cluster at [MongoDB Atlas](https://www.mongodb.com/atlas/database)
   - Get your connection string and add it to `MONGODB_URI` in `.env`

6. Start the development server:

   ```bash
   pnpm dev
   ```

7. Open http://localhost:3000 to view the app

### Docker (Optional)

For local MongoDB development:

1. Set `MONGODB_URI=mongodb://127.0.0.1/payload-trpc` in `.env`
2. Run `docker-compose up -d` to start MongoDB

## Tech Stack

| Component       | Technology                    |
| --------------- | ----------------------------- |
| Framework       | Next.js 15 (App Router)       |
| Language        | TypeScript (strict)           |
| Database        | MongoDB                       |
| CMS             | Payload CMS 3                 |
| API             | tRPC v11                      |
| Data Fetching   | TanStack React Query          |
| Storage         | Cloudflare R2 (S3-compatible) |
| Styling         | Tailwind CSS v4               |
| Validation      | Zod                           |
| Testing         | Vitest, Playwright            |

## Project Structure

```
src/
├── app/                 # Next.js App Router
│   ├── (frontend)/      # Public routes
│   ├── (payload)/       # Payload Admin
│   └── api/trpc/        # tRPC endpoint
├── payload/             # Payload CMS
│   ├── access/          # Access control (anyone, authenticated)
│   ├── collections/     # CMS collections (Users, Media)
│   ├── components/      # Admin UI components (Logo, Icon)
│   ├── plugins/         # Payload plugins (R2 storage)
│   └── shared/          # Collection groups
├── trpc/                # tRPC setup
│   ├── init.ts          # Context and procedures
│   ├── client.tsx       # Client provider
│   ├── server.tsx       # Server proxy
│   └── routers/         # tRPC routers
├── utilities/           # Shared utilities
│   ├── ui.ts            # cn() for class names
│   ├── deepMerge.ts     # Object merging
│   ├── is-valid-url.ts  # URL validation
│   ├── can-use-dom.ts   # SSR-safe DOM check
│   ├── get-url.ts       # Server/client URL helpers
│   ├── to-kebab-case.ts # String transformation
│   └── use-debounce.ts  # React debounce hook
├── payload.config.ts    # Payload configuration
└── payload-types.ts     # Generated types
public/
├── favicon.svg          # Site favicon
└── og-image.png         # Social media preview
```

## Key Features

### Type-Safe API with tRPC

End-to-end type safety from your database to your React components:

```typescript
// Server: Define procedures
export const appRouter = createTRPCRouter({
  hello: baseProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return { greeting: `hello ${input.text}` };
    }),
});

// Client: Use with full type inference
const { data } = useQuery(trpc.hello.queryOptions({ text: "world" }));
```

### Payload CMS Integration

Headless CMS with admin panel at `/admin`:

- User authentication
- Media uploads with responsive image sizes (xs, sm, md, lg, xl, og)
- Cloudflare R2 storage (optional, falls back to local)
- Collection groups for admin organization
- Access control helpers (`anyone`, `authenticated`)
- Custom branding (Logo, Icon, favicon, OG image)
- `defaultPopulate` for optimized queries

### Server Components Support

Prefetch data in Server Components and hydrate on the client:

```typescript
// Server Component
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

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the project on [Vercel](https://vercel.com)
3. Add environment variables
4. Deploy

### Database Hosting

- [MongoDB Atlas](https://www.mongodb.com/atlas/database) - Recommended for production
- Free tier available for getting started

### Cloudflare R2 Storage (Optional)

To use Cloudflare R2 for media storage:

1. Create an R2 bucket in [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Enable public access and note the public URL
3. Generate an API token with R2 read/write permissions
4. Add to your `.env`:

```bash
R2_ACCESS_KEY_ID=your_access_key
R2_SECRET_ACCESS_KEY=your_secret_key
R2_BUCKET=your-bucket-name
R2_ENDPOINT=https://your-account-id.r2.cloudflarestorage.com
R2_PUBLIC_URL=https://pub-xxxx.r2.dev
```

Without R2 credentials, media uploads default to local storage.

## Contributing

Contributions are welcome! Feel free to:

1. Fork the repository
2. Create a feature branch
3. Submit a pull request

## Support

If you find this template helpful, consider supporting its development:

<p>
  <a href="https://www.buymeacoffee.com/srjay" target="_blank">
    <img src="https://cdn.buymeacoffee.com/buttons/v2/default-blue.png" alt="Buy Me A Coffee" height="40px">
  </a>
</p>

## Questions

If you have any issues or questions:

- Open a [GitHub issue](https://github.com/srjaykikani/payload-trpc-template/issues)
- Start a [GitHub discussion](https://github.com/srjaykikani/payload-trpc-template/discussions)
