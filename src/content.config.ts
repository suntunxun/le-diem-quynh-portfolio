import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			pubDate: z.coerce.date(),
			updatedDate: z.coerce.date().optional(),
			heroImage: image().optional(),
		}),
});

const works = defineCollection({
	loader: glob({ base: './src/content/works', pattern: '**/*.{md,mdx}' }),
	schema: z.object({
		title: z.string(),
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
	}),
});

export const collections = { blog, works };
