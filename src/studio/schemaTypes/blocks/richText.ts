import { defineType, defineField } from 'sanity';
import { BlockContentIcon } from '@sanity/icons';

export default defineType({
	name: 'richText',
	type: 'object',
	title: 'Rich Text',
	icon: BlockContentIcon,
	fields: [
		defineField({
			name: 'content',
			type: 'array',
			title: 'Content',
			of: [
				{
					type: 'block',
					styles: [
						{ title: 'Normal', value: 'normal' },
						{ title: 'H2', value: 'h2' },
						{ title: 'H3', value: 'h3' },
						{ title: 'H4', value: 'h4' },
						{ title: 'Quote', value: 'blockquote' },
					],
					marks: {
						annotations: [
							{
								name: 'link',
								type: 'object',
								title: 'Link',
								fields: [
									{
										name: 'href',
										type: 'url',
										title: 'URL',
									},
								],
							},
						],
					},
				},
			],
		}),
	],
	preview: {
		prepare() {
			return {
				title: 'Rich Text',
				subtitle: 'A block of rich text content',
				media: BlockContentIcon,
			};
		},
	},
});
