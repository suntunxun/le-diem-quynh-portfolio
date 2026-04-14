import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const worksSchema = z.object({
	title: z.string(),
	slug: z.string().optional(),
	year: z.number(),
	order: z.number().default(999),
	category: z.enum(['film', 'music-video', 'commercial']),
	role: z.string(),
	client: z.string().optional(),
	duration: z.string().optional(),
	thumbnail: z.string().optional(),
	videoUrl: z.string().optional(),
	stills: z.array(z.string()).optional(),
	description: z.string(),
	featured: z.boolean().default(false),
	pubDate: z.coerce.date(),
});

const film = defineCollection({
	loader: glob({ base: './src/content/film', pattern: '**/*.{md,mdx}' }),
	schema: worksSchema,
});

const musicVideo = defineCollection({
	loader: glob({ base: './src/content/music-video', pattern: '**/*.{md,mdx}' }),
	schema: worksSchema,
});

const commercial = defineCollection({
	loader: glob({ base: './src/content/commercial', pattern: '**/*.{md,mdx}' }),
	schema: worksSchema,
});

export const collections = { film, 'music-video': musicVideo, commercial };
