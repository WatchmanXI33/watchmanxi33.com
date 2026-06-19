// @ts-check

import { unified } from '@astrojs/markdown-remark';
import mdx from '@astrojs/mdx';
import node from '@astrojs/node';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import sanity from '@sanity/astro';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig, fontProviders } from 'astro/config';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeSlug from 'rehype-slug';

const sanityProjectId = process.env.PUBLIC_SANITY_PROJECT_ID || 'tx432zok';
const sanityDataset = process.env.PUBLIC_SANITY_DATASET || 'production';

export default defineConfig({
	site: 'https://www.watchmanxi33.com',
	devToolbar: { enabled: false },
	output: 'server',
	adapter: node({ mode: 'standalone' }),
	integrations: [
		mdx(),
		sitemap(),
		sanity({
			projectId: sanityProjectId,
			dataset: sanityDataset,
			useCdn: false,
			apiVersion: '2026-03-01',
			studioBasePath: '/admin',
			stega: {
				studioUrl: '/admin',
			},
		}),
		react(),
	],
	markdown: {
		processor: unified({
			rehypePlugins: [
				[rehypeSlug, {}],
				[rehypeAutolinkHeadings, { behavior: 'wrap' }],
			],
		}),
		shikiConfig: {
			theme: 'github-dark',
			wrap: true,
		},
	},
	vite: {
		plugins: [tailwindcss()],
		envPrefix: ['PUBLIC_', 'SANITY_STUDIO_', 'SANITY_'],
		optimizeDeps: {
			include: [
				'react/compiler-runtime',
				'lodash/isObject.js',
				'lodash/groupBy.js',
				'lodash/keyBy.js',
				'lodash/partition.js',
				'lodash/sortedIndex.js',
				'@sanity/vision',
				'sanity',
				'sanity/structure',
				'sanity/presentation',
				'@sanity/icons',
			],
		},
	},
	fonts: [
		{
			provider: fontProviders.local(),
			name: 'Atkinson',
			cssVariable: '--font-atkinson',
			fallbacks: ['sans-serif'],
			options: {
				variants: [
					{
						src: ['./src/assets/fonts/atkinson-regular.woff'],
						weight: 400,
						style: 'normal',
						display: 'swap',
					},
					{
						src: ['./src/assets/fonts/atkinson-bold.woff'],
						weight: 700,
						style: 'normal',
						display: 'swap',
					},
				],
			},
		},
	],
});
