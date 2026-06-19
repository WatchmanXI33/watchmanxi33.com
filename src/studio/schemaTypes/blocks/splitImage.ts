import { defineType, defineField } from 'sanity';
import { ImagesIcon } from '@sanity/icons';

export default defineType({
	name: 'splitImage',
	type: 'object',
	title: 'Split Image',
	icon: ImagesIcon,
	fields: [
		defineField({
			name: 'heading',
			type: 'string',
			title: 'Heading',
		}),
		defineField({
			name: 'body',
			type: 'array',
			title: 'Body',
			of: [{ type: 'block' }],
		}),
		defineField({
			name: 'image',
			type: 'image',
			title: 'Image',
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
			name: 'imagePosition',
			type: 'string',
			title: 'Image Position',
			options: {
				list: [
					{ title: 'Left', value: 'left' },
					{ title: 'Right', value: 'right' },
				],
				layout: 'radio',
			},
			initialValue: 'right',
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
				subtitle: 'Split Image',
				media: media ?? ImagesIcon,
			};
		},
	},
});
