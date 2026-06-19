import { sanityClient } from 'sanity:client';
import imageUrlBuilder from '@sanity/image-url';
import { defineQuery } from 'groq';

const builder = imageUrlBuilder(sanityClient);

export function urlFor(source: unknown) {
	return builder.image(source);
}

export const POSTS_QUERY = defineQuery(`
	// NOTE: !(_id in path("drafts.**")) filters drafts when perspective is "raw".
	// When loadQuery uses perspective "drafts"/"previewDrafts", Sanity resolves
	// draft document IDs to their published counterparts, so the filter does NOT
	// exclude them — intentional for Visual Editing support.
	*[_type == "post" && defined(slug.current) && !(_id in path("drafts.**"))]{
		_id,
		title,
		"slug": slug.current,
		description,
		publishedAt,
		updatedAt,
		mainImage{
			...,
			asset->
		},
		categories,
		tags,
		author,
		featured
	}
`);

export const POST_QUERY = defineQuery(`
	// NOTE: draft filter — see POSTS_QUERY for perspective interaction docs.
	*[_type == "post" && slug.current == $slug && !(_id in path("drafts.**"))][0]{
		_id,
		title,
		"slug": slug.current,
		description,
		publishedAt,
		updatedAt,
		mainImage{
			...,
			asset->
		},
		categories,
		tags,
		author,
		featured,
		body,
		migrationMetadata
	}
`);

export const POST_SLUGS_QUERY = defineQuery(`
	// NOTE: draft filter — see POSTS_QUERY for perspective interaction docs.
	*[_type == "post" && defined(slug.current) && !(_id in path("drafts.**"))]{
		"slug": slug.current
	}
`);

export async function fetchPosts() {
	try {
		return await sanityClient.fetch(POSTS_QUERY);
	} catch {
		return null;
	}
}

export async function fetchPost(slug: string) {
	try {
		return await sanityClient.fetch(POST_QUERY, { slug });
	} catch {
		return null;
	}
}

export const PAGE_QUERY = defineQuery(`
	// NOTE: draft filter — see POSTS_QUERY for perspective interaction docs.
	*[_type == "page" && slug.current == $slug && !(_id in path("drafts.**"))][0]{
		_id,
		title,
		"slug": slug.current,
		description,
		ogImage{
			...,
			asset->
		},
		pageBuilder[]{
			...,
			_type == "hero" => {
				_type,
				_key,
				heading,
				tagline,
				image{
					...,
					asset->
				},
				cta
			},
			_type == "splitImage" => {
				_type,
				_key,
				heading,
				body,
				image{
					...,
					asset->
				},
				imagePosition
			},
			_type == "features" => {
				_type,
				_key,
				heading,
				items
			},
			_type == "cta" => {
				_type,
				_key,
				heading,
				body,
				buttonLabel,
				buttonHref,
				variant
			},
			_type == "richText" => {
				_type,
				_key,
				content
			}
		}
	}
`);

export const NAV_QUERY = defineQuery(`
	*[_type == "settings" && _id == "settings"][0]{
		mainNavigation[]{
			label,
			linkType,
			url,
			"slug": pageReference->slug.current
		}
	}
`);

export async function fetchNavigation() {
	try {
		return await sanityClient.fetch(NAV_QUERY);
	} catch {
		return null;
	}
}