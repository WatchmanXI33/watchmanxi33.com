import { defineType, defineField } from 'sanity';
import { ThListIcon } from '@sanity/icons';

export default defineType({
	name: 'features',
	type: 'object',
	title: 'Features',
	icon: ThListIcon,
	fields: [
		defineField({
			name: 'heading',
			type: 'string',
			title: 'Heading',
		}),
		defineField({
			name: 'items',
			type: 'array',
			title: 'Feature Items',
			of: [
				defineField({
					name: 'featureItem',
					type: 'object',
					title: 'Feature Item',
					fields: [
						defineField({ name: 'title', type: 'string', title: 'Title' }),
						defineField({
							name: 'description',
							type: 'text',
							title: 'Description',
							rows: 3,
						}),
						defineField({
							name: 'icon',
							type: 'string',
							title: 'Icon Name',
							description: 'Lucide icon name (e.g., "star", "zap", "globe")',
						}),
					],
				}),
			],
		}),
	],
	preview: {
		select: {
			title: 'heading',
		},
		prepare({ title }) {
			return {
				title: title || 'Untitled',
				subtitle: 'Features',
				media: ThListIcon,
			};
		},
	},
});
