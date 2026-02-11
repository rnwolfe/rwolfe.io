---
title: "How StrongDM’s AI team build serious software without even looking at the code"
pubDate: 2026-02-11
type: bookmark
tags: ["bookmark"]
source: "simonwillison.net"
sourceUrl: "https://simonwillison.net/2026/Feb/7/software-factory/"
relatedProjects: []
relatedPosts: []
---

Simon’s writeup is a great tour of the “dark factory” end of the spectrum, with the real question front-and-center: if agents write both the code and the tests, what does “proof it works” even mean? The StrongDM approach—scenario holdout sets + LLM-as-judge + a “digital twin universe” for dependencies—reads like the first serious attempt at an answer. The clever bit is treating scenarios like evaluation data: useful for validating, dangerous to leak into the training loop (or the agent’s context). The takeaway isn’t “never review code”; it’s that verification needs to move up a level to behavior under realistic conditions. It’s an uncomfortable idea, which is why it’s interesting.
