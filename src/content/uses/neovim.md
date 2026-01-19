---
title: "Neovim"
description: "My primary code editor. Fast, extensible, keyboard-driven."
category: tools
url: "https://neovim.io"
icon: "lucide:terminal"
reasoning: "After years of VS Code, I switched for speed and to reduce context-switching. The modal editing paradigm clicked after about 2 weeks, and now I can't go back."
alternatives:
  - VS Code
  - Zed
  - Helix
order: 1
---

I run a fairly minimal setup with lazy.nvim for plugin management. Key plugins:

- **telescope.nvim** - Fuzzy finding everything
- **lsp-zero** - LSP configuration without the boilerplate
- **treesitter** - Syntax highlighting that actually works
- **oil.nvim** - File management that feels like editing

The real productivity gain isn't typing speed—it's staying in flow state because I never reach for the mouse.
