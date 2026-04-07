---
title: "Quantization from the ground up | ngrok blog"
pubDate: 2026-04-07
type: bookmark
tags: ["bookmark"]
source: "ngrok.com"
sourceUrl: "https://ngrok.com/blog/quantization?utm_campaign=february_2026_b&utm_medium=email&_hsenc=p2ANqtz-_6Zi_C5jOYgiqfshJ9NZxFReWwvJ_rb6JZQyK1_kV7lb5f0GyEJ63kJYP58D7XUoR2IJPmGXZsoEPqlT4NuxEyFeG4dg&_hsmi=411568079&utm_content=blog_quantization&utm_source=hubspot"
relatedProjects: []
relatedPosts: []
---

A clear explainer on why quantization works and what it trades off. The core idea is not “make the model smaller,” but “store the same ideas with fewer bits,” which explains why quality often drops only slightly. This reframing makes the infra trade‑offs feel concrete: precision vs. speed vs. cost. It’s a good mental model if you ship models rather than just use them. If you care about cost‑per‑inference, you eventually need this literacy.
