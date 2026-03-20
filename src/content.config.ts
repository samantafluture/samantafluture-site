import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const stream = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/stream' }),
  schema: z.object({
    type: z.enum(['writing', 'shipped', 'note', 'link']),
    title: z.string().optional(),
    date: z.coerce.date(),
    project: z.string().optional(),
    excerpt: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    name: z.string(),
    description: z.string(),
    stack: z.string(),
    url: z.string().optional(),
    repo: z.string().optional(),
    order: z.number(),
  }),
});

export const collections = { stream, projects };
