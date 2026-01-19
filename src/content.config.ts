import { defineCollection, z, reference } from 'astro:content';
import { glob } from 'astro/loaders';

// ===== SHARED SCHEMAS =====
const statusSchema = z.enum(['draft', 'ongoing', 'completed', 'archived', 'featured']);

const metricSchema = z.object({
	label: z.string(),
	value: z.string(),
	change: z.string().optional(), // e.g., "+40%", "-2s"
});

// ===== BLOG =====
const blog = defineCollection({
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			pubDate: z.coerce.date(),
			updatedDate: z.coerce.date().optional(),
			heroImage: image().optional(),
			status: statusSchema.default('completed'),
			tags: z.array(z.string()).default([]),
			relatedProjects: z.array(reference('projects')).default([]),
			relatedDecisions: z.array(reference('decisions')).default([]),
		}),
});

// ===== PROJECTS / CASE STUDIES =====
const projects = defineCollection({
	loader: glob({ base: './src/content/projects', pattern: '**/*.{md,mdx}' }),
	schema: ({ image }) =>
		z.object({
			// Core metadata
			title: z.string(),
			description: z.string(),
			outcomeSummary: z.string(), // Outcome-first: "Reduced load time by 60%"
			pubDate: z.coerce.date(),
			updatedDate: z.coerce.date().optional(),
			heroImage: image().optional(),
			status: statusSchema.default('completed'),

			// Project context
			role: z.string().optional(), // "Lead Engineer", "Solo Developer"
			company: z.string().optional(),
			duration: z.string().optional(), // "3 months", "Jan - Mar 2024"
			teamSize: z.string().optional(), // "Solo", "Team of 5"

			// Tech & categorization
			tech: z.array(z.string()).default([]),
			category: z.string().optional(), // "Web App", "API", "DevOps"

			// Structured content for density
			problem: z.string().optional(), // Brief problem statement
			constraints: z.array(z.string()).default([]), // "No budget", "Legacy system"
			approach: z.string().optional(), // High-level approach summary
			metrics: z.array(metricSchema).default([]), // KPIs & impact data

			// Cross-referencing
			relatedProjects: z.array(reference('projects')).default([]),
			relatedDecisions: z.array(reference('decisions')).default([]),
			relatedPosts: z.array(reference('blog')).default([]),
		}),
});

// ===== TECHNICAL DECISIONS (ADRs) =====
const decisions = defineCollection({
	loader: glob({ base: './src/content/decisions', pattern: '**/*.{md,mdx}' }),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		status: z.enum(['proposed', 'accepted', 'deprecated', 'superseded']).default('accepted'),

		// ADR structure
		context: z.string(), // Why was this decision needed?
		decision: z.string(), // What did we decide?
		reasoning: z.string().optional(), // Why this choice?
		alternatives: z
			.array(
				z.object({
					option: z.string(),
					pros: z.array(z.string()).default([]),
					cons: z.array(z.string()).default([]),
				})
			)
			.default([]),
		consequences: z.array(z.string()).default([]), // What changed because of this?

		// Categorization
		category: z.string().optional(), // "Architecture", "Tooling", "Process"
		tags: z.array(z.string()).default([]),

		// Cross-referencing
		relatedProjects: z.array(reference('projects')).default([]),
		supersededBy: reference('decisions').optional(),
	}),
});

// ===== CAREER JOURNEY / TIMELINE =====
const journey = defineCollection({
	loader: glob({ base: './src/content/journey', pattern: '**/*.{md,mdx}' }),
	schema: z.object({
		title: z.string(),
		description: z.string().optional(),
		date: z.coerce.date(),
		endDate: z.coerce.date().optional(), // For roles with duration

		// Entry categorization
		entryType: z.enum(['role', 'milestone', 'learning', 'transition']).default('milestone'),

		// Role-specific fields
		company: z.string().optional(),
		role: z.string().optional(),
		location: z.string().optional(),

		// Key achievements or learnings (for density)
		highlights: z.array(z.string()).default([]),
		tech: z.array(z.string()).default([]),

		// Cross-referencing
		relatedProjects: z.array(reference('projects')).default([]),
	}),
});

// ===== USES / TECH STACK =====
const uses = defineCollection({
	loader: glob({ base: './src/content/uses', pattern: '**/*.{md,mdx}' }),
	schema: z.object({
		title: z.string(),
		description: z.string().optional(),
		category: z.enum(['tools', 'stack', 'hardware', 'services', 'workflow']),
		url: z.string().url().optional(),
		icon: z.string().optional(), // Icon name or emoji

		// Why this tool?
		reasoning: z.string().optional(),
		alternatives: z.array(z.string()).default([]), // What else was considered

		order: z.number().default(0), // For manual sorting
	}),
});

// ===== NOTES / THOUGHTS / MEDITATIONS =====
const notes = defineCollection({
	loader: glob({ base: './src/content/notes', pattern: '**/*.{md,mdx}' }),
	schema: z.object({
		title: z.string(),
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),

		// Quick categorization
		type: z.enum(['thought', 'quote', 'til', 'bookmark', 'question']).default('thought'),
		tags: z.array(z.string()).default([]),

		// Optional source for quotes/bookmarks
		source: z.string().optional(),
		sourceUrl: z.string().url().optional(),

		// Cross-referencing
		relatedProjects: z.array(reference('projects')).default([]),
		relatedPosts: z.array(reference('blog')).default([]),
	}),
});

export const collections = { blog, projects, decisions, journey, uses, notes };
