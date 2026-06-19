import { getCollection } from 'astro:content';
import rss from '@astrojs/rss';
import { SITE_DESCRIPTION, SITE_TITLE } from '../consts';
import { fetchPosts } from '../utils/sanity';

export async function GET(context) {
	const sanityPosts = await fetchPosts();
	const localPosts = await getCollection('blog');

	const seen = new Set();
	const items = [];

	if (sanityPosts) {
		for (const p of sanityPosts) {
			seen.add(p.slug);
			items.push({
				title: p.title,
				description: p.description,
				pubDate: p.publishedAt ? new Date(p.publishedAt) : new Date(0),
				link: `/blog/${p.slug}/`,
			});
		}
	}

	for (const p of localPosts) {
		if (!seen.has(p.id)) {
			items.push({
				...p.data,
				link: `/blog/${p.id}/`,
				pubDate: p.data.pubDate,
			});
		}
	}

	items.sort((a, b) => b.pubDate.getTime() - a.pubDate.getTime());

	return rss({
		title: SITE_TITLE,
		description: SITE_DESCRIPTION,
		site: context.site,
		items,
	});
}
