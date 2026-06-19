import { defineType, defineField } from 'sanity';
import { StarIcon } from '@sanity/icons';

export default defineType({
	name: 'hero',
	type: 'object',
	title: 'Hero',
	icon: StarIcon,
	fields: [
		defineField({
			name: 'heading',
			type: 'string',
			title: 'Heading',
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: 'tagline',
			type: 'text',
			title: 'Tagline',
			rows: 3,
		}),
		defineField({
			name: 'image',
			type: 'image',
			title: 'Background Image',
			options: { hotspot: true },
			fields: [
				defineField({
					name: 'alt',
					type: 'string',
					title: 'Alt Text',
				}),
			],
		}),
		defineField({
			name: 'cta',
			type: 'object',
			title: 'Call to Action',
			fields: [
				defineField({ name: 'label', type: 'string', title: 'Label' }),
				defineField({ name: 'href', type: 'url', title: 'Link' }),
			],
		}),
	],
	preview: {
		select: {
			title: 'heading',
			media: 'image',
		},
		prepare({ title, media }) {
			return {
				title: title || 'Untitled',
				subtitle: 'Hero',
				media: media ?? StarIcon,
			};
		},
	},
});
