import { defineType, defineField } from 'sanity';

export default defineType({
	name: 'post',
	type: 'document',
	title: 'Post',
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
			validation: (Rule) => Rule.required().max(160),
		}),
		defineField({
			name: 'publishedAt',
			type: 'datetime',
			title: 'Published At',
		}),
		defineField({
			name: 'updatedAt',
			type: 'datetime',
			title: 'Updated At',
		}),
		defineField({
			name: 'mainImage',
			type: 'image',
			title: 'Main Image',
			options: {
				hotspot: true,
			},
			fields: [
				defineField({
					name: 'alt',
					type: 'string',
					title: 'Alt Text',
				}),
			],
		}),
		defineField({
			name: 'categories',
			type: 'array',
			title: 'Categories',
			of: [{ type: 'string' }],
		}),
		defineField({
			name: 'tags',
			type: 'array',
			title: 'Tags',
			of: [{ type: 'string' }],
		}),
		defineField({
			name: 'author',
			type: 'string',
			title: 'Author',
		}),
		defineField({
			name: 'featured',
			type: 'boolean',
			title: 'Featured',
		}),
		defineField({
			name: 'body',
			type: 'array',
			title: 'Body',
			of: [
				{
					type: 'block',
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
										title: 'Link',
									},
								],
							},
						],
					},
				},
			],
		}),
		defineField({
			name: 'migrationMetadata',
			type: 'object',
			title: 'Migration Metadata',
			fields: [
				defineField({
					name: 'sourceFile',
					type: 'string',
					title: 'Source File',
				}),
				defineField({
					name: 'sourceId',
					type: 'string',
					title: 'Source ID',
				}),
				defineField({
					name: 'legacyUrl',
					type: 'string',
					title: 'Legacy URL',
				}),
				defineField({
					name: 'migratedAt',
					type: 'datetime',
					title: 'Migrated At',
				}),
			],
		}),
	],
	preview: {
		select: {
			title: 'title',
			subtitle: 'description',
			media: 'mainImage',
		},
	},
});