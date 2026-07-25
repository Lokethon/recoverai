#!/bin/bash
#
# RecoverAI — one-step publish to GitHub
#
# Double-click this file in Finder, or run:  bash publish.command
#
# It clears the stale git lock, runs lint/tests/build, commits everything,
# and pushes to origin/main. It stops at the first failure and tells you why.
# Nothing is pushed unless all checks pass.
#
# Safe to run more than once. Delete it after a successful push.

set -euo pipefail

cd "$(dirname "$0")"

BOLD=$'\033[1m'; GREEN=$'\033[32m'; RED=$'\033[31m'; YELLOW=$'\033[33m'; OFF=$'\033[0m'

step()  { printf "\n${BOLD}==> %s${OFF}\n" "$1"; }
ok()    { printf "${GREEN}    OK — %s${OFF}\n" "$1"; }
warn()  { printf "${YELLOW}    %s${OFF}\n" "$1"; }
die()   { printf "\n${RED}${BOLD}STOPPED: %s${OFF}\n\n" "$1"; printf "Nothing was pushed. Fix the above, then run this again.\n\n"; read -r -p "Press Return to close..."; exit 1; }

printf "${BOLD}RecoverAI — publish to GitHub${OFF}\n"
printf "Repo: %s\n" "$(pwd)"

# ---------------------------------------------------------------------------
step "1/6  Clearing stale sandbox files"
rm -f .git/index.lock .git/testwrite .git/chmodtest
ok "git lock cleared"

# ---------------------------------------------------------------------------
step "2/6  Checking the repo"
git rev-parse --is-inside-work-tree >/dev/null 2>&1 || die "This folder is not a git repository."
git remote get-url origin >/dev/null 2>&1 || die "No 'origin' remote configured."
printf "    branch: %s\n" "$(git rev-parse --abbrev-ref HEAD)"
printf "    origin: %s\n" "$(git remote get-url origin)"

if [ -z "$(git status --porcelain)" ]; then
  warn "No changes to commit — everything is already committed."
  step "Pushing anything unpushed"
  git push origin HEAD && ok "up to date with GitHub"
  read -r -p "Press Return to close..."
  exit 0
fi
ok "changes found"

# ---------------------------------------------------------------------------
step "3/6  Guarding against committed secrets"
if git status --porcelain | grep -qE '^\?\? \.env$|^\?\? \.env\.local$'; then
  die "A .env file is untracked but present. It should be gitignored — check .gitignore before continuing."
fi
if git diff --cached --name-only 2>/dev/null | grep -qE '\.env$|\.pem$|\.key$'; then
  die "A secret-looking file is staged. Unstage it before continuing."
fi
ok "no secret files staged"

# ---------------------------------------------------------------------------
step "4/6  Installing dependencies"
npm install --no-audit --no-fund || die "npm install failed."
ok "dependencies installed"

# ---------------------------------------------------------------------------
step "5/6  Running lint, tests and build"
npm run lint  || die "Lint failed. Run 'npm run lint' to see the errors."
ok "lint passed"
npm run test  || die "Tests failed. Run 'npm run test' to see which."
ok "tests passed"
npm run build || die "Build failed. Run 'npm run build' to see the error."
ok "build succeeded"

# ---------------------------------------------------------------------------
step "6/6  Committing and pushing"
git add -A

git commit -m "chore: make repository production ready

- Add ESLint 9 flat config and fix the broken lint script
- Add Vitest + React Testing Library with 37 tests across
  sanitisation, storage persistence, and component interaction
- Add GitHub Actions CI: lint, test and build on Node 18/20/22
- Add SECURITY.md with a documented client-only threat model,
  CODE_OF_CONDUCT.md, issue/PR templates and Dependabot
- Add safety and medical disclaimer to the README
- Add optional VITE_GEMINI_API_KEY build-time fallback and .env.example
- Split vendor bundles: main chunk 1.17 MB -> 168 kB
- Expand CONTRIBUTING.md with testing and PR process" || die "Commit failed."
ok "committed"

printf "\n    Pushing to GitHub. If prompted, sign in or paste a personal access token.\n\n"
git push origin HEAD || die "Push failed. If it is an auth error, run 'gh auth login' or set up a personal access token."

# ---------------------------------------------------------------------------
printf "\n${GREEN}${BOLD}Done — pushed to GitHub.${OFF}\n\n"
printf "Next:\n"
printf "  1. Watch CI:      https://github.com/Lokethon/recoverai/actions\n"
printf "  2. Repo settings: https://github.com/Lokethon/recoverai/settings\n"
printf "  3. See NEXT_STEPS.md in this folder for the full checklist.\n\n"
printf "You can delete this script and PUBLISH.md now:\n"
printf "  rm publish.command PUBLISH.md\n\n"

read -r -p "Press Return to close..."
