/**
 * Markdown → Sanity migration script
 *
 * Reads Markdown/MDX files from src/content/blog/, parses frontmatter,
 * converts body to Portable Text, and writes NDJSON ready for
 * `npx sanity dataset import`
 *
 * Usage:
 *   node migration/scripts/run.mjs
 *
 * Then import:
 *   npx sanity dataset import migration/import.ndjson production --replace
 */

import { markdownToPortableText } from '@portabletext/markdown';
import { readFileSync, writeFileSync, readdirSync, existsSync } from 'node:fs';
import { basename, extname, join, resolve } from 'node:path';
import matter from 'gray-matter';

const CONTENT_DIR = resolve(import.meta.dirname, '../../src/content/blog');
const ASSETS_DIR = resolve(import.meta.dirname, '../../src/assets');
const OUTPUT = resolve(import.meta.dirname, '../import.ndjson');
const REPORT = resolve(import.meta.dirname, '../reports/validation.json');

const errors = [];

function slugify(text) {
	return text
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-|-$/g, '');
}

function fileStem(file) {
	return basename(file, extname(file));
}

function resolveImagePath(src, sourceFile) {
	if (!src) return null;
	if (src.startsWith('http')) return src;
	const abs = resolve(join(ASSETS_DIR, basename(src)));
	if (existsSync(abs)) {
		return `file://${abs}`;
	}
	errors.push({ file: sourceFile, issue: `Image not found: ${src}` });
	return null;
}

function parseDate(value) {
	if (!value) return null;
	const d = new Date(value);
	return isNaN(d.getTime()) ? null : d.toISOString();
}

const files = readdirSync(CONTENT_DIR).filter((f) => f.endsWith('.md') || f.endsWith('.mdx'));

const docs = [];

for (const file of files) {
	const stem = fileStem(file);
	const sourcePath = join(CONTENT_DIR, file);
	const raw = readFileSync(sourcePath, 'utf-8');
	const parsed = matter(raw);

	const fm = parsed.data;
	const body = parsed.content;

	// Convert Markdown body to Portable Text
	let portableText;
	try {
		portableText = markdownToPortableText(body);
	} catch (err) {
		errors.push({ file, issue: `Portable Text conversion failed: ${err.message}` });
		portableText = [];
	}

	const doc = {
		_id: `post-${stem}`,
		_type: 'post',
		title: fm.title || stem,
		slug: {
			_type: 'slug',
			current: fm.slug || stem,
		},
		description: fm.description || '',
		publishedAt: parseDate(fm.pubDate),
		updatedAt: parseDate(fm.updatedDate),
		author: fm.author || 'Phil',
		featured: Boolean(fm.featured),
		categories: Array.isArray(fm.categories) ? fm.categories : [],
		tags: Array.isArray(fm.tags) ? fm.tags : [],
		body: portableText,
		migrationMetadata: {
			sourceFile: file,
			sourceId: stem,
			legacyUrl: `/blog/${stem}/`,
			migratedAt: new Date().toISOString(),
		},
	};

	// Handle main image
	if (fm.heroImage) {
		const img = resolveImagePath(fm.heroImage, file);
		if (img) {
			doc.mainImage = {
				_type: 'image',
				_sanityAsset: `image@${img}`,
			};
		}
	}

	docs.push(doc);
}

// Write NDJSON
const lines = docs.map((d) => JSON.stringify(d));
writeFileSync(OUTPUT, lines.join('\n') + '\n', 'utf-8');

// Write validation report
writeFileSync(REPORT, JSON.stringify({ total: docs.length, errors }, null, 2), 'utf-8');

console.log(`✓ Extracted ${docs.length} documents`);
console.log(`✓ NDJSON written to ${OUTPUT}`);
console.log(`✓ Report written to ${REPORT}`);
if (errors.length > 0) {
	console.log(`\n⚠ ${errors.length} issue(s) found:`);
	for (const e of errors) {
		console.log(`  - ${e.file}: ${e.issue}`);
	}
}
