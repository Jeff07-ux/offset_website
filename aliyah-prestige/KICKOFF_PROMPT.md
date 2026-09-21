# First prompt to paste into Claude Code

(Start Claude Code inside this folder, after running `bash setup.sh` and putting
the two PNGs in `refs/`.)

---

Read CLAUDE.md fully and follow it exactly.

Reference screenshots are in refs/. Build these two sections in `index.html`,
strictly one at a time and in this order:

1. refs/home-hero.png        -> <section id="home-hero">
2. refs/services-section.png -> <section id="services-section">

For each section:
- First write me the measurement list (sizes, spacing, fonts, colours). Sample
  colours with `npm run sample`, do not guess them.
- Build it, run `npm run build:css`, then run
  `npm run compare -- --ref refs/<name>.png --selector "#<name>"`.
- Iterate until the rendered size matches the reference exactly and the mismatch
  is <= 1%. Also check the result visually with the Playwright MCP.
- When done, stop and report: final mismatch %, remaining differences, and every
  assumption (fonts, missing image assets). Wait for my OK before the next section.

If the fonts or image assets can't be determined from the screenshots, ask me
before you continue.
