import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { presentationTool } from 'sanity/presentation';
import { visionTool } from '@sanity/vision';
import { umamiTool } from 'sanity-plugin-umami-analytics-tool';
import { CogIcon } from '@sanity/icons';
import { schemaTypes } from './src/studio/schemaTypes';
import { resolve } from './src/studio/lib/resolve';

export default defineConfig({
	name: 'default',
	title: 'Tasty Telescope',
	projectId: 'tx432zok',
	dataset: 'development',
	plugins: [
		structureTool({
			structure: (S) =>
				S.list()
					.title('Content')
					.items([
						S.listItem()
							.title('Settings')
							.icon(CogIcon)
							.child(
								S.document()
									.schemaType('settings')
									.documentId('settings'),
							),
						S.divider(),
						...S.documentTypeListItems().filter((item) => item.getId() !== 'settings'),
					]),
		}),
		visionTool(),
		umamiTool({
			url: import.meta.env.SANITY_STUDIO_UMAMI_URL,
		}),
		presentationTool({
			resolve,
			previewUrl: {
				initial: '/',
				previewMode: {
					enable: '/api/draft-mode/enable',
					disable: '/api/draft-mode/disable',
				},
			},
		}),
	],
	schema: {
		types: schemaTypes,
	},
});
