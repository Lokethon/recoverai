#!/bin/bash
#
# RecoverAI — push and go live on GitHub Pages
#
# Double-click in Finder, or run:  bash deploy.command
#
# Commits the GitHub Pages setup, pushes to main, and points you at the one
# setting you must flip by hand. Stops before pushing if any check fails.

set -euo pipefail

cd "$(dirname "$0")"

BOLD=$'\033[1m'; GREEN=$'\033[32m'; RED=$'\033[31m'; YELLOW=$'\033[33m'; BLUE=$'\033[34m'; OFF=$'\033[0m'

step()  { printf "\n${BOLD}==> %s${OFF}\n" "$1"; }
ok()    { printf "${GREEN}    OK — %s${OFF}\n" "$1"; }
warn()  { printf "${YELLOW}    %s${OFF}\n" "$1"; }
die()   { printf "\n${RED}${BOLD}STOPPED: %s${OFF}\n\n" "$1"; printf "Nothing was pushed. Fix the above, then run this again.\n\n"; read -r -p "Press Return to close..."; exit 1; }

printf "${BOLD}RecoverAI — deploy to GitHub Pages${OFF}\n"

# ---------------------------------------------------------------------------
step "1/5  Clearing stale sandbox files"
rm -f .git/index.lock .git/testwrite .git/chmodtest
ok "cleared"

# ---------------------------------------------------------------------------
step "2/5  Checking the repo"
git rev-parse --is-inside-work-tree >/dev/null 2>&1 || die "This folder is not a git repository."
git remote get-url origin >/dev/null 2>&1 || die "No 'origin' remote configured."
printf "    branch: %s\n" "$(git rev-parse --abbrev-ref HEAD)"
printf "    origin: %s\n" "$(git remote get-url origin)"

# ---------------------------------------------------------------------------
step "3/5  Reinstalling dependencies"
# The sandbox that prepared these files may have left Linux binaries behind.
# This makes sure the native modules match your Mac.
npm install --no-audit --no-fund || die "npm install failed."
ok "dependencies match this machine"

# ---------------------------------------------------------------------------
step "4/5  Running lint, tests and build"
npm run lint  || die "Lint failed. Run 'npm run lint' to see the errors."
ok "lint passed"
npm run test  || die "Tests failed. Run 'npm run test' to see which."
ok "tests passed"
npm run build -- --base=/recoverai/ || die "Build failed. Run 'npm run build' to see the error."
ok "build succeeded with the GitHub Pages base path"

# ---------------------------------------------------------------------------
step "5/5  Committing and pushing"
if [ -z "$(git status --porcelain)" ]; then
  warn "Nothing new to commit."
else
  git add -A
  git commit -m "feat: deploy to GitHub Pages

- Add deploy workflow that publishes to Pages after CI passes on main
- Build with the Pages base path, SPA 404 fallback and .nojekyll
- Add Open Graph and description meta tags for link previews
- Add live demo badge and Pages deployment docs to the README

No API key is bundled: visitors supply their own key in Settings." || die "Commit failed."
  ok "committed"
fi

printf "\n    Pushing. If prompted, sign in or paste a personal access token.\n\n"
git push -u origin HEAD || die "Push failed. If it is an auth error, run 'gh auth login' first."

# ---------------------------------------------------------------------------
printf "\n${GREEN}${BOLD}Pushed.${OFF}\n"
printf "\n${YELLOW}${BOLD}One manual step is left — the deploy cannot run without it:${OFF}\n\n"
printf "  ${BOLD}1.${OFF} Open ${BLUE}https://github.com/Lokethon/recoverai/settings/pages${OFF}\n"
printf "  ${BOLD}2.${OFF} Under ${BOLD}Build and deployment${OFF}, set ${BOLD}Source${OFF} to ${BOLD}GitHub Actions${OFF}\n"
printf "  ${BOLD}3.${OFF} Watch it build: ${BLUE}https://github.com/Lokethon/recoverai/actions${OFF}\n\n"
printf "In a few minutes your app will be live at:\n"
printf "  ${BOLD}${BLUE}https://lokethon.github.io/recoverai/${OFF}\n\n"
printf "Full checklist: GITHUB_PAGES.md\n\n"

read -r -p "Press Return to close..."
