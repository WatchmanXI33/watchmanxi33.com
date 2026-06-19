---
title: 'Building a Dark Mode Toggle'
description: 'A step-by-step guide to implementing dark mode with Tailwind CSS and persistent preferences.'
pubDate: 'Jul 22 2025'
heroImage: '../../assets/blog-placeholder-5.jpg'
categories: ['CSS', 'Tutorial']
tags: ['dark-mode', 'tailwind', 'css', 'javascript']
featured: true
author: 'Phil'
---

Venenatis urna cursus eget nunc scelerisque viverra mauris in. Arcu ac tortor dignissim convallis aenean et tortor at. Curabitur gravida arcu ac tortor dignissim convallis aenean et tortor.

## Setting Up Tailwind

Egestas tellus rutrum tellus pellentesque eu. Fusce ut placerat orci nulla pellentesque dignissim enim sit amet.

```bash
npm install -D @tailwindcss/vite tailwindcss
```

## Configuring Dark Mode

Ut enim blandit volutpat maecenas volutpat blandit aliquam etiam. Id donec ultrices tincidunt arcu.

```css
@import "tailwindcss";

@custom-variant dark (&:where(.dark, .dark *));
```

## The Toggle Component

Id cursus metus aliquam eleifend mi. Tempus quam pellentesque nec nam aliquam sem.

```typescript
const button = document.getElementById('theme-toggle');
button?.addEventListener('click', () => {
  const isDark = document.documentElement.classList.toggle('dark');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
});
```

## Persisting Preferences

Risus at ultrices mi tempus imperdiet. Id porta nibh venenatis cras sed felis eget velit.

```javascript
const theme = localStorage.getItem('theme');
if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
  document.documentElement.classList.add('dark');
}
```

Ipsum a arcu cursus vitae. Facilisis magna etiam tempor orci eu lobortis elementum. Tincidunt dui ut ornare lectus sit.
