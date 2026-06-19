import { defineType, defineField } from 'sanity';
import { CogIcon } from '@sanity/icons';

export default defineType({
	name: 'settings',
	type: 'document',
	title: 'Settings',
	icon: CogIcon,
	fields: [
		defineField({
			name: 'mainNavigation',
			type: 'array',
			title: 'Main Navigation',
			description: 'Links shown in the site header',
			of: [
				defineField({
					name: 'navItem',
					type: 'object',
					title: 'Navigation Item',
					fields: [
						defineField({
							name: 'label',
							type: 'string',
							title: 'Label',
							validation: (Rule) => Rule.required(),
						}),
						defineField({
							name: 'linkType',
							type: 'string',
							title: 'Link Type',
							options: {
								list: [
									{ title: 'Page', value: 'page' },
									{ title: 'URL', value: 'url' },
								],
								layout: 'radio',
							},
							initialValue: 'page',
						}),
						defineField({
							name: 'pageReference',
							type: 'reference',
							title: 'Page',
							to: [{ type: 'page' }],
							hidden: ({ parent }) => parent?.linkType !== 'page',
						}),
						defineField({
							name: 'url',
							type: 'string',
							title: 'URL',
							hidden: ({ parent }) => parent?.linkType !== 'url',
						}),
					],
					preview: {
						select: {
							title: 'label',
							linkType: 'linkType',
						},
						prepare({ title, linkType }) {
							return {
								title: title || 'Untitled',
								subtitle: linkType === 'page' ? 'Internal Page' : 'External URL',
							};
						},
					},
				}),
			],
		}),
	],
	preview: {
		prepare() {
			return {
				title: 'Settings',
				subtitle: 'Navigation & site settings',
			};
		},
	},
});
