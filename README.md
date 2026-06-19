# WatchmanXi33 — Personal Blog

An Astro blog powered by Sanity CMS. Features a page builder, dark mode, RSS feed, and Visual Editing with draft mode.

## Tech stack

- **Framework**: [Astro](https://astro.build) v6 (server-rendered)
- **CMS**: [Sanity](https://sanity.io) — headless CMS with structured content
- **Styling**: Tailwind CSS v4
- **Content**: Markdown/MDX (legacy) + Sanity Portable Text (primary)
- **Hosting**: Node.js server adapter

## Getting started

```sh
npm install          # Node >= 22.12 required
npm run dev          # dev server at http://localhost:4321
npm run build        # production build → dist/
npm run preview      # serve dist/ locally
```

## Sanity Studio

The Studio is embedded at `/admin` during dev and production:

```sh
npm run dev          # Studio available at http://localhost:4321/admin
npx sanity deploy    # Deploy standalone Studio to sanity.studio
```

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start Astro dev server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run sanity` | Start standalone Studio at `localhost:3333` |
| `npm run astro` | Astro CLI passthrough |

## Environment variables

Copy `.env.example` to `.env` and fill in:

| Variable | Required | Description |
|---|---|---|
| `PUBLIC_SANITY_PROJECT_ID` | Yes | Sanity project ID |
| `PUBLIC_SANITY_DATASET` | Yes | Dataset name (`development` or `production`) |
| `SANITY_API_READ_TOKEN` | For draft mode | API read token with `viewer` role |
| `SANITY_STUDIO_UMAMI_URL` | No | Umami analytics tracking URL |

## Project structure

```
src/
├── components/      # Astro components (Card, TOC, CodeBlock, etc.)
├── content/         # Legacy MDX blog posts
├── layouts/         # Page layout
├── pages/           # Routes (home, blog, about, RSS, etc.)
├── studio/          # Sanity schema types
├── sanity/          # Sanity client config and draft mode
├── types/           # TypeScript interfaces
└── utils/           # GROQ queries, image URL builder
```

## License

MIT
