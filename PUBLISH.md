# Publishing to GitHub

Run these from `/Users/lokesh/Documents/Lokesh/Prompt_Wars_Google/recoverai`.

## 1. Clear two stray files

My sandbox couldn't delete files in this folder, so it left a stale git lock behind.
Remove both before anything else — the lock will block every git command otherwise:

```bash
rm -f .git/index.lock .git/testwrite
```

## 2. Verify locally (optional — all three passed on my side)

```bash
npm install
npm run lint && npm run test && npm run build
```

## 3. Commit and push

```bash
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
- Expand CONTRIBUTING.md with testing and PR process"

git push origin main
```

## 4. Repo settings on GitHub

Once pushed, at <https://github.com/Lokethon/recoverai/settings>:

- **General → Features**: enable **Discussions** (the issue template links to it)
- **Code security**: enable **Dependabot alerts**, **Dependabot security updates**, and **Private vulnerability reporting** (required for the SECURITY.md advisory link to work)
- **Branches**: add a protection rule on `main` requiring the `Lint, test & build` check to pass
- **About** (repo home, right sidebar): add a description, topics (`addiction-recovery`, `gemini-ai`, `react`, `hackathon`), and your live demo URL

## 5. Delete this file

```bash
rm PUBLISH.md && git add -A && git commit -m "docs: remove publish instructions" && git push
```
