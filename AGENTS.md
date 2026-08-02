# AGENTS.md

Guidelines for AI agents working on this codebase.

## Tech Stack

### Framework
- **Astro 5** - Static site generator with islands architecture
- **MDX** - Markdown with JSX components for content
- **React** - Used for interactive islands only, not full pages

### Styling
- **Tailwind CSS 4** - Utility-first CSS via Vite plugin (not PostCSS)
- **Custom properties** - Brand colors defined in `src/styles/global.css`
- **Dark mode** - Class-based (`dark:` variants), toggled on `<html>`

### Key Patterns

**Glass Panel Effect**
```css
/* Defined in global.css - uses backdrop-filter + mouse-tracking */
.glass-panel { /* frosted glass with overflow:hidden by default */ }
```
When nesting dropdowns or absolute elements inside `.glass-panel`, add `!overflow-visible` to the parent.

**Content Collections**
```typescript
// Access content via Astro's content layer
import { getCollection } from 'astro:content';
const posts = await getCollection('blog');
```

Collections: `blog`, `notes`, `projects`, `journey`

**Theme Toggle**
- Preference stored in `localStorage` as `'theme'`
- Script in `Layout.astro` prevents flash on load
- Toggle component: `src/components/ui/ThemeToggle.astro`

**Dynamic OG Images**
- Generated at `/og/[...slug].png` via Satori + Resvg
- Endpoint: `src/pages/og/[...slug].png.ts`
- Cached PNG responses for each content entry

### File Conventions

| Path | Purpose |
|------|---------|
| `src/pages/*.astro` | Routes (file-based routing) |
| `src/content/<collection>/*.mdx` | Content entries |
| `src/components/ui/*.astro` | Reusable UI components |
| `src/components/navigation/*.astro` | Nav-specific components |
| `src/layouts/Layout.astro` | Base layout wrapper |

### Commands
```bash
npm run dev      # Dev server at localhost:4321
npm run build    # Production build to ./dist
npm run preview  # Preview production build
```

---

## Developer Personal Brand Guidelines

A personal site should demonstrate technical competence while revealing personality. These principles guide content and design decisions.

### Content Strategy

**Show, Don't Tell**
- Projects with live demos > lists of technologies
- Code snippets with context > "I know React"
- Decision records explaining *why* > just *what*

**Write for Two Audiences**
1. **Hiring managers** - Want signal on competence, communication, judgment
2. **Fellow developers** - Want useful content, honest takes, shared learning

**Content Types That Work**
| Type | Purpose | Example |
|------|---------|---------|
| Case studies | Demonstrate end-to-end thinking | "Building X: from problem to production" |
| TILs/Notes | Show continuous learning | "TIL: CSS container queries" |
| Decision records | Reveal judgment and trade-offs | "Why I chose Astro over Next.js" |
| Tool reviews | Establish taste and opinions | "My terminal setup in 2024" |

**Avoid**
- Generic "Hello World, I'm a developer" intros
- Listing every technology you've touched
- Content that could be anyone's

### Design Principles

**Personality Through Details**
- Micro-interactions (logo scramble, hover states)
- Opinionated color choices
- Typography that reflects your taste

**Performance as Feature**
- Fast sites signal competence
- Lighthouse scores matter for credibility
- Minimal JS, progressive enhancement

**Mobile-First, But Desktop-Memorable**
- Core content accessible everywhere
- Delightful details on larger screens

### Maintenance

**Keep It Current**
- Outdated content hurts more than no content
- Archive old projects rather than delete

**Quality Over Quantity**
- One great case study > ten shallow posts
- Prune ruthlessly
- Every page should earn its place

### Voice

- Confident but not arrogant
- Technical but accessible
- Opinionated but open to being wrong
- Brief but not terse
