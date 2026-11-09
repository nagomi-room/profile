# Development policy

- Build lightweight, dependency-free, static HTML/CSS/JavaScript for GitHub Pages.
- Each account lives at its own directory (`nodoka/`); shared behavior and styles live in `assets/`.
- Only Nodoka is currently in scope. Do not add trading-account placeholders or links between profiles.
- Preserve verified source wording. Never infer age, favorites, pairing preferences, interaction rules, or other personal facts.
- Do not substitute stock, generated, or unrelated pictures for missing account illustrations. Record missing assets in `docs/content-status.md`.
- Keep twst and sprk equal in heading hierarchy, visual weight, and space.
- Design for mobile first; check 320px, 390px, tablet, and desktop widths, keyboard access, reduced motion, and JavaScript-disabled behavior.
- Shared galleries must support native horizontal swiping, buttons, accessible image enlargement, and explicit spoiler disclosure. A concealed spoiler must not expose an image or its descriptive alt text before disclosure.
- All paths must work under the GitHub Pages repository prefix `/profile/`.
- Keep preview artifacts, browser fixtures, and temporary scripts outside the published site. Publish only HTML and runtime assets.
- Review changes independently when sub-agents are available, then address material findings.
- Do not claim source migration, image review, or deployment is complete without evidence. Use the repository README for publication instructions and content status.
