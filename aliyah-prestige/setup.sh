#!/usr/bin/env bash
# Run once from the project root:  bash setup.sh
set -euo pipefail

# --- Node check (Playwright MCP needs Node 20+) ------------------------------
NODE_MAJOR=$(node -p "process.versions.node.split('.')[0]" 2>/dev/null || echo 0)
if [ "$NODE_MAJOR" -lt 20 ]; then
  echo "Node 20+ is required (found: $(node -v 2>/dev/null || echo none)). Install it and re-run."
  exit 1
fi

# --- npm project -------------------------------------------------------------
[ -f package.json ] || npm init -y >/dev/null
npm pkg set type=module >/dev/null

# Tailwind v4 CLI + Playwright (renders the page) + pixelmatch/pngjs (diffing)
npm install -D tailwindcss @tailwindcss/cli playwright pixelmatch pngjs

# Chromium for tools/compare.mjs
npx playwright install chromium

# --- folders & Tailwind entry ------------------------------------------------
mkdir -p refs src dist shots diffs tools
[ -f src/input.css ] || printf '@import "tailwindcss";\n' > src/input.css

npm pkg set "scripts.build:css=tailwindcss -i src/input.css -o dist/output.css" >/dev/null
npm pkg set "scripts.watch:css=tailwindcss -i src/input.css -o dist/output.css --watch" >/dev/null
npm pkg set "scripts.compare=node tools/compare.mjs" >/dev/null
npm pkg set "scripts.sample=node tools/sample.mjs" >/dev/null
npm run build:css

# --- Playwright MCP for Claude Code (lets the agent open/screenshot the page) -
if command -v claude >/dev/null 2>&1; then
  claude mcp add playwright -- npx @playwright/mcp@latest || \
    echo "Playwright MCP may already be registered - check with: claude mcp list"
else
  echo "Claude Code CLI not found in PATH. Later run:"
  echo "  claude mcp add playwright -- npx @playwright/mcp@latest"
fi

cat <<'EOF'

Done. Next:
  1. Put your screenshots in refs/  (refs/home-hero.png, refs/services-section.png)
  2. In Claude Code run /plugin and install "frontend-design" (optional, see CLAUDE.md)
  3. Start Claude Code in this folder and paste the prompt from KICKOFF_PROMPT.md
EOF
