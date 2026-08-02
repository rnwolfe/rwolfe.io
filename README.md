# rwolfe.io

Personal website and digital garden of Ryan Wolfe.

## Tech Stack

- **Framework:** Astro 5 with MDX and React islands
- **Styling:** Tailwind CSS 4 with typography plugin
- **Fonts:** Geist Sans & Geist Mono
- **Icons:** Astro Icon (Lucide)
- **OG Images:** Dynamic generation via Satori + Resvg

## Features

- Glass-panel UI with mouse-tracking refraction effects
- Dark/light theme with system preference detection
- Dynamic OG image generation for all content
- RSS feed and sitemap
- Responsive navigation with dropdown menus

## Content Collections

| Collection | Description |
|------------|-------------|
| `blog` | Long-form articles and tutorials |
| `notes` | Quick thoughts and TILs |
| `projects` | Project case studies |
| `journey` | Career timeline entries |

## Project Structure

```
src/
├── components/
│   ├── navigation/    # Navbar, dropdowns
│   └── ui/            # GlassPanel, ThemeToggle, etc.
├── content/           # MDX content collections
├── layouts/           # Base layout with metadata
├── pages/             # Routes and dynamic endpoints
└── styles/            # Global CSS and Tailwind
```

## Commands

| Command | Action |
|---------|--------|
| `npm install` | Install dependencies |
| `npm run dev` | Start dev server at `localhost:4321` |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |

## Pages

- `/` - Bento grid landing page
- `/blog` - Blog posts
- `/notes` - Quick notes
- `/projects` - Project showcase
- `/journey` - Career timeline
- `/tags` - Content taxonomy
- `/about` - About page
