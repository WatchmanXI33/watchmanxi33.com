import { defineType, defineField } from 'sanity';
import { LaunchIcon } from '@sanity/icons';

export default defineType({
	name: 'cta',
	type: 'object',
	title: 'Call to Action',
	icon: LaunchIcon,
	fields: [
		defineField({
			name: 'heading',
			type: 'string',
			title: 'Heading',
		}),
		defineField({
			name: 'body',
			type: 'text',
			title: 'Body',
			rows: 3,
		}),
		defineField({
			name: 'buttonLabel',
			type: 'string',
			title: 'Button Label',
		}),
		defineField({
			name: 'buttonHref',
			type: 'url',
			title: 'Button Link',
		}),
		defineField({
			name: 'variant',
			type: 'string',
			title: 'Variant',
			options: {
				list: [
					{ title: 'Light', value: 'light' },
					{ title: 'Dark', value: 'dark' },
					{ title: 'Brand', value: 'brand' },
				],
				layout: 'radio',
			},
			initialValue: 'brand',
		}),
	],
	preview: {
		select: {
			title: 'heading',
			subtitle: 'buttonLabel',
		},
		prepare({ title, subtitle }) {
			return {
				title: title || 'Untitled',
				subtitle: `CTA — ${subtitle || 'no button'}`,
				media: LaunchIcon,
			};
		},
	},
});
