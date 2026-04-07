---
title: "Code Mode: give agents an entire API in 1,000 tokens"
pubDate: 2026-04-07
type: bookmark
tags: ["bookmark", "ai", "agents"]
source: "blog.cloudflare.com"
sourceUrl: "https://blog.cloudflare.com/code-mode-mcp/"
relatedProjects: []
relatedPosts: []
---

A great example of tool‑surface compression: instead of thousands of tools, expose two (search, execute) and let the agent write typed code against an SDK. Code becomes the compact plan, which scales better than enumerating endpoints. For large APIs, this reduces context cost by orders of magnitude while increasing flexibility. It’s a pattern I’d use whenever the API is big, structured, and stable. Code Mode isn’t just an optimization—it’s an architecture.
