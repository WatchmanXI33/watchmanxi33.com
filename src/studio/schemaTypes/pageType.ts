import { defineType, defineField, defineArrayMember } from 'sanity';
import { DocumentsIcon } from '@sanity/icons';

export default defineType({
	name: 'page',
	type: 'document',
	title: 'Page',
	icon: DocumentsIcon,
	fields: [
		defineField({
			name: 'title',
			type: 'string',
			title: 'Title',
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: 'slug',
			type: 'slug',
			title: 'Slug',
			options: {
				source: 'title',
				maxLength: 96,
			},
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: 'description',
			type: 'text',
			title: 'Description',
			description: 'Used for SEO meta description',
			rows: 2,
		}),
		defineField({
			name: 'ogImage',
			type: 'image',
			title: 'Open Graph Image',
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
			name: 'pageBuilder',
			type: 'array',
			title: 'Page Builder',
			description: 'Compose your page by adding, removing, and reordering blocks',
			of: [
				defineArrayMember({ type: 'hero', name: 'hero' }),
				defineArrayMember({ type: 'splitImage', name: 'splitImage' }),
				defineArrayMember({ type: 'features', name: 'features' }),
				defineArrayMember({ type: 'cta', name: 'cta' }),
				defineArrayMember({ type: 'richText', name: 'richText' }),
			],
			options: {
				insertMenu: {
					views: [{ name: 'list' }, { name: 'grid' }],
				},
			},
		}),
	],
	preview: {
		select: {
			title: 'title',
			subtitle: 'description',
			media: 'ogImage',
		},
		prepare({ title, subtitle, media }) {
			return {
				title: title || 'Untitled',
				subtitle: subtitle || 'Page',
				media: media ?? DocumentsIcon,
			};
		},
	},
	orderings: [
		{
			title: 'Title',
			name: 'title',
			by: [{ field: 'title', direction: 'asc' }],
		},
	],
});
