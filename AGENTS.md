# tasty-telescope — Astro blog

## Quick start

```sh
npm install          # Node >= 22.12 required
npm run dev          # dev server at http://localhost:4321
npm run build        # production build → dist/
npm run preview      # serve dist/ locally
npm run astro        # Astro CLI passthrough (add, check, etc.)
npm run sanity       # Sanity Studio at http://localhost:3333
npx sanity deploy    # Deploy Studio to https://<app>.sanity.studio
```

## Project structure

- `src/content/blog/` — Markdown/MDX posts loaded via `glob` loader (Astro v6 content collections)
- `src/content.config.ts` — Zod schema for post frontmatter
- `src/pages/blog/[...slug].astro` — per-post route, fetches from Sanity first, falls back to `getCollection`
- `src/utils/sanity.ts` — Sanity client queries (GROQ), image URL builder
- `migration/scripts/run.mjs` — Markdown-to-Sanity migration script (runs once to populate Sanity)
- `src/pages/blog/index.astro` — blog listing with pagination, search, and filter
- `src/pages/index.astro` — homepage with featured post, recent grid, tags cloud, newsletter
- `src/pages/rss.xml.js` — RSS feed at `/rss.xml`
- `src/pages/about.astro` — about page (self-contained, no layout)
- `src/components/BaseHead.astro` — Tailwind import, SEO/OG meta, font preload, dark mode `<script>`
- `src/components/CodeBlock.astro` — code block rendering for Sanity Portable Text (custom `type.code` component)
- `src/consts.ts` — `SITE_TITLE`, `SITE_DESCRIPTION`, `AUTHOR`, `SOCIAL`, `BLOG`

## Post frontmatter (Zod schema in `src/content.config.ts`)

```ts
title: string
description: string
pubDate: coerce to Date
updatedDate?: Date
heroImage?: Image
categories: string[] (default [])
tags: string[] (default [])
author: string (default "Phil")
featured: boolean (default false)
draft: boolean (default false)
canonical?: string (URL)
```

## Notable components

- `Card.astro` — post card (supports `featured` prop for hero layout)
- `FeaturedPost.astro` — pulls most recent `featured: true` post
- `TOC.astro` — table of contents from `render()` headings
- `ShareButtons.astro` — Twitter, LinkedIn, Email, copy link
- `AuthorBio.astro` — author info from `consts.ts`
- `RelatedPosts.astro` — by tag/category overlap
- `TagsCloud.astro` — categories + weighted tag cloud
- `Pagination.astro` — numbered pagination
- `NewsletterSignup.astro` — placeholder form
- `ThemeToggle.astro` — dark mode (class-based, persisted to localStorage)
- `CodeBlock.astro` — code block rendering for Sanity Portable Text (custom `type.code` component)

## Notable config

- **Styling**: Tailwind v4 via `@tailwindcss/vite` Vite plugin (no `tailwind.config` — uses `@theme` in `global.css`)
- **Dark mode**: class-based (`@custom-variant dark` + `<script>` in BaseHead that reads `localStorage` / `prefers-color-scheme`)
- **Rehype plugins**: `rehype-slug` + `rehype-autolink-headings` (configured via `markdown.processor` using `unified({rehypePlugins: [...]})`)
- **Syntax highlighting**: Shiki `github-dark` theme via `markdown.shikiConfig`
- **Fonts**: Atkinson (local WOFF, `--font-atkinson` via `astro:assets/Font`)
- **Integrations**: `@astrojs/mdx`, `@astrojs/sitemap`, `@astrojs/rss`
- **Sanity**: integrated via `@sanity/astro`. Pages fetch from Sanity first; local `getCollection` fallback. Studio config at `sanity.config.js` with `structureTool()` + `visionTool()` plugins, schema at `src/studio/schemaTypes/`. Run `npm run sanity` for local Studio at `http://localhost:3333`; deploy with `npx sanity deploy`.
- **Images**: use `Image` from `astro:assets` with explicit `width`/`height` for local assets; Sanity posts use `<img>` tags with CDN URLs
- **TS strict**: extends `astro/tsconfigs/strict`, `strictNullChecks: true`
- **VSCode**: recommended extensions `astro-build.astro-vscode` and `unifiedjs.vscode-mdx`
- **site** URL in `astro.config.mjs` is still `https://example.com` — update before deploying
- **Astro Docs MCP**: `https://mcp.docs.astro.build/mcp` (streamable HTTP) — official MCP server for up-to-date Astro docs, useful when working on this project

## Generated / gitignored

- `dist/` — build output
- `.astro/` — generated types and content module manifests (run `npm run astro sync` or `dev`/`build` to regenerate)
- `node_modules/`

## What's missing

No test, lint, typecheck, or CI config — none set up yet.
