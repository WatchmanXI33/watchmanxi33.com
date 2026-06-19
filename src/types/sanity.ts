export interface SanityImage {
	_type?: string;
	asset: { url: string } | null;
	alt?: string;
	crop?: { top: number; bottom: number; left: number; right: number };
	hotspot?: { x: number; y: number; width: number; height: number };
}

export interface SanityBlock {
	_type: 'block';
	_key: string;
	style: string;
	children: SanityBlockSpan[];
	markDefs?: SanityMarkDef[];
}

export interface SanityBlockSpan {
	_type: 'span';
	_key: string;
	text: string;
	marks?: string[];
}

export interface SanityMarkDef {
	_type: string;
	_key: string;
	href?: string;
}

export interface SanityPostBase {
	_id: string;
	title: string;
	slug: string;
	description: string;
	publishedAt: string | null;
	updatedAt: string | null;
	mainImage: SanityImage | null;
	categories: string[];
	tags: string[];
	author: string;
	featured: boolean;
}

export interface SanityPostListItem extends SanityPostBase {}

export interface SanityPostDetail extends SanityPostBase {
	body: SanityBlock[];
	migrationMetadata: {
		sourceFile: string;
		sourceId: string;
		legacyUrl: string;
		migratedAt: string;
	} | null | undefined;
}

export interface SanityPostSlug {
	slug: string;
}

export interface SanityPage {
	_id: string;
	title: string;
	slug: string;
	description: string | null | undefined;
	ogImage: SanityImage | null;
	pageBuilder: SanityPageBuilderBlock[];
}

export type SanityPageBuilderBlock = SanityBlockHero | SanityBlockSplitImage | SanityBlockFeatures | SanityBlockCTA | SanityBlockRichText;

export interface SanityBlockHero {
	_type: 'hero';
	_key: string;
	heading?: string;
	tagline?: string;
	image?: SanityImage;
	cta?: { label?: string; href?: string };
}

export interface SanityBlockSplitImage {
	_type: 'splitImage';
	_key: string;
	heading?: string;
	body?: SanityBlock[];
	image?: SanityImage;
	imagePosition?: 'left' | 'right';
}

export interface SanityBlockFeatures {
	_type: 'features';
	_key: string;
	heading?: string;
	items?: { title?: string; description?: string; icon?: string }[];
}

export interface SanityBlockCTA {
	_type: 'cta';
	_key: string;
	heading?: string;
	body?: string;
	buttonLabel?: string;
	buttonHref?: string;
	variant?: 'light' | 'dark' | 'brand';
}

export interface SanityBlockRichText {
	_type: 'richText';
	_key: string;
	content?: SanityBlock[];
}

export interface SanityNavItem {
	label?: string;
	linkType?: 'page' | 'url';
	url?: string;
	slug?: string | null;
}

export interface SanitySettings {
	mainNavigation: SanityNavItem[];
}
