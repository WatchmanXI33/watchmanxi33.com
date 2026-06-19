import { defineLocations } from 'sanity/presentation';

export const resolve = {
	locations: {
		post: defineLocations({
			select: {
				title: 'title',
				slug: 'slug.current',
			},
			resolve: (doc) => ({
				locations: [
					{
						title: doc?.title || 'Untitled',
						href: `/blog/${doc?.slug}/`,
					},
					{
						title: 'Home',
						href: '/',
					},
				],
			}),
		}),
		page: defineLocations({
			select: {
				title: 'title',
				slug: 'slug.current',
			},
			resolve: (doc) => ({
				locations: [
					{
						title: doc?.title || 'Untitled',
						href: `/${doc?.slug}/`,
					},
					{
						title: 'Home',
						href: '/',
					},
				],
			}),
		}),
	},
};
