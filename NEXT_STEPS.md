# RecoverAI — Next Steps

Work through these in order. Steps 1–3 take about 20 minutes; step 4 is the submission itself.

---

## ✅ Step 1 — Push to GitHub

Nothing has been committed yet. Everything is sitting uncommitted in this folder.

**Double-click `publish.command`** in Finder. It clears the stale git lock, runs lint/tests/build, commits, and pushes. It stops before pushing if any check fails.

Prefer doing it by hand? See `PUBLISH.md`.

If the push fails with an authentication error, you need a credential on this machine:

```bash
# Option A — GitHub CLI (easiest)
brew install gh && gh auth login

# Option B — personal access token
# Create at github.com/settings/tokens with 'repo' scope,
# then paste it as the password when git prompts you.
```

---

## ⚙️ Step 2 — GitHub repo settings

### Verify CI

Go to <https://github.com/Lokethon/recoverai/actions>. The **CI** workflow should run automatically and go green across Node 18, 20, and 22. If a job fails, open it and read the failing step — lint, test, and build all pass locally, so a failure is most likely a Node version difference.

Once green, the badge at the top of your README turns green too.

### Settings to enable

At <https://github.com/Lokethon/recoverai/settings>:

| Where | What | Why |
|---|---|---|
| General → Features | Enable **Discussions** | Your issue template links to it; the link 404s otherwise |
| Code security | Enable **Dependabot alerts** + **security updates** | `.github/dependabot.yml` is already configured |
| Code security | Enable **Private vulnerability reporting** | Required for the advisory link in `SECURITY.md` to work |
| Branches | Add a rule on `main` requiring **Lint, test & build** to pass | Stops a broken commit landing during the final rush |

### The About box

On the repo home page, click the ⚙️ beside **About** (right sidebar):

- **Description:** `AI-powered addiction recovery companion built with Google Gemini — 24/7 voice coaching, clinical biomarker tracking, relapse prediction, and emergency crisis response.`
- **Website:** your live URL from step 3
- **Topics:** `addiction-recovery` `gemini-ai` `google-promptwars` `mental-health` `ai-therapy` `react` `vite` `healthcare` `hackathon`

A repo with no description and no topics reads as abandoned. This takes two minutes and is the first thing a reviewer sees.

---

## 🚀 Step 3 — Deploy live

PromptWars requires **a live preview of your app**, so this is not optional.

### Vercel (recommended — `vercel.json` is already configured)

Easiest path, via the dashboard:

1. Go to <https://vercel.com/new> and sign in with GitHub
2. Import `Lokethon/recoverai`
3. Framework preset: **Vite**. Build command `npm run build`, output directory `dist`. Vercel usually detects all of this.
4. Deploy

Or from the terminal:

```bash
npm i -g vercel
vercel --prod
```

### Should you set the API key on the server?

You have a decision to make:

- **Leave it unset** — visitors must enter their own Gemini key to see AI features. Safer, but a reviewer may not bother, and the AI half of your app goes unseen.
- **Set `VITE_GEMINI_API_KEY`** in Vercel's environment variables — AI works instantly for everyone. But Vite inlines it into the public bundle, so **anyone can read it**.

If you set it: create a **brand new key** at <https://aistudio.google.com/apikey> used only for this deployment, cap its quota, and **delete it once judging ends**. Never use a key tied to anything else.

### After deploying — verify

Camera, microphone, and geolocation need HTTPS. Vercel gives you that, but check them on the live URL:

- [ ] Voice coach — mic permission prompt appears, speech is transcribed
- [ ] Emergency page — camera preview opens
- [ ] Hospital map — location permission works
- [ ] AI features respond (or degrade gracefully with no key set)
- [ ] Deep-linking works — reload on a sub-page shouldn't 404 (`vercel.json` handles this)
- [ ] Open it on a phone. Judges will.

Then add the URL to your README badges and the GitHub About box.

---

## 📤 Step 4 — PromptWars submission

### ⚠️ Two things that disqualify people

1. **PromptWars is a dual submission.** Technical (code + live preview) *and* narrative (a technical blog post + a LinkedIn "Build-in-Public" post). Submitting only the repo is incomplete.
2. **Google Antigravity is mandatory.** Per the official FAQ, using Antigravity is required for all submissions. Make sure your build genuinely used it and that your blog post describes how — reviewers look for this.

### Checklist

- [ ] Code pushed and CI green
- [ ] Live preview URL working, tested on mobile
- [ ] Screenshots added (see `docs/screenshots/README.md`)
- [ ] Demo video recorded (script in `docs/DEMO_SCRIPT.md`)
- [ ] Technical blog post published (outline in `docs/DEMO_SCRIPT.md`)
- [ ] LinkedIn build-in-public post published (draft in `docs/DEMO_SCRIPT.md`)
- [ ] Submitted on the Hack2skill portal **by Day 13** of your challenge cycle

### Confirm these yourself

I could not verify from the public pages which challenge you're entered in or your exact deadline. Before submitting, check on the portal:

- Your challenge number and its **Day 13 deadline**
- Whether your track wants a blog post, a LinkedIn post, or both
- The exact hashtags and handles required — these vary per challenge
- Any submission form fields beyond the repo and demo links

Support: <promptwarssupport@hack2skill.com>

### What your repo already argues well

Against the evaluation criteria, the work from this session gives you concrete evidence rather than assertions:

- **Code quality** — ESLint enforced in CI, modular structure, documented standards
- **Security** — a real threat model in `SECURITY.md`, no hardcoded keys, security headers, private disclosure
- **Testing** — 37 tests, CI matrix across three Node versions
- **Efficiency** — main bundle cut from 1.17 MB to 168 kB

The weakest remaining area is **accessibility**. If you have time before the deadline, a focus-management pass on the modals and ARIA labels on icon-only buttons is the highest-value improvement left.

---

## 🧹 Step 5 — Cleanup

Once you've pushed and deployed, these three files have served their purpose:

```bash
rm publish.command PUBLISH.md NEXT_STEPS.md
git add -A && git commit -m "docs: remove setup instructions" && git push
```

Keep `docs/DEMO_SCRIPT.md` until after you've submitted.
