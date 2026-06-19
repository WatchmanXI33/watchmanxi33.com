---
title: 'Getting Started with Astro'
description: 'Learn how to build blazing-fast websites with Astro, the all-in-one web framework.'
pubDate: 'Jul 08 2025'
heroImage: '../../assets/blog-placeholder-3.jpg'
categories: ['Tutorial']
tags: ['astro', 'web-development', 'javascript']
featured: true
author: 'Phil'
---

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vitae ultricies leo integer malesuada nunc vel risus commodo viverra. Adipiscing enim eu turpis egestas pretium. Euismod elementum nisi quis eleifend quam adipiscing. In hac habitasse platea dictumst vestibulum. Sagittis purus sit amet volutpat. Netus et malesuada fames ac turpis egestas. Eget magna fermentum iaculis eu non diam phasellus vestibulum lorem. Varius sit amet mattis vulputate enim. Habitasse platea dictumst quisque sagittis. Integer quis auctor elit sed vulputate mi. Dictumst quisque sagittis purus sit amet.

## Installation

Morbi tristique senectus et netus. Id semper risus in hendrerit gravida rutrum quisque non tellus. Habitasse platea dictumst quisque sagittis purus sit amet.

### Prerequisites

Tellus molestie nunc non blandit massa. Cursus vitae congue mauris rhoncus. Accumsan tortor posuere ac ut.

```bash
node --version  # should be >= 22.12
npm --version
```

### Creating a new project

Fringilla urna porttitor rhoncus dolor. Elit ullamcorper dignissim cras tincidunt lobortis.

```bash
npm create astro@latest -- --template blog
cd my-astro-blog
npm run dev
```

## Project Structure

In cursus turpis massa tincidunt dui ut ornare lectus. Integer feugiat scelerisque varius morbi enim nunc. Bibendum neque egestas congue quisque egestas diam.

```
src/
├── components/
├── content/
│   └── blog/
├── layouts/
├── pages/
└── styles/
```

## Content Collections

Cras ornare arcu dui vivamus arcu felis bibendum. Dignissim suspendisse in est ante in nibh mauris. Sed tempus urna et pharetra pharetra massa massa ultricies mi.

### Defining a schema

Mollis nunc sed id semper risus in. Convallis a cras semper auctor neque. Diam sit amet nisl suscipit.

```typescript
const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
  }),
});
```

## Conclusion

Lacus viverra vitae congue eu consequat ac felis donec. Egestas integer eget aliquet nibh praesent tristique magna sit amet. Eget magna fermentum iaculis eu non diam. In vitae turpis massa sed elementum.
