# Running RecoverAI from GitHub

Your app will be hosted by GitHub itself at:

**<https://lokethon.github.io/recoverai/>**

Free, HTTPS, no Vercel account, no server. Every push to `main` that passes CI redeploys automatically.

---

## Step 1 — Push

**Double-click `deploy.command`** in Finder. It reinstalls dependencies, runs lint/tests/build with the Pages base path, commits, and pushes.

> Why reinstall? The sandbox that prepared these files left Linux binaries in `node_modules`. The script fixes that so your Mac builds cleanly.

---

## Step 2 — Turn on Pages (one time, by hand)

**This is the one step that can't be automated.** The deploy workflow will fail until you do it.

1. Go to <https://github.com/Lokethon/recoverai/settings/pages>
2. Under **Build and deployment**, set **Source** to **GitHub Actions**
3. Save

That's it. No branch to pick, no `gh-pages` branch needed.

---

## Step 3 — Watch it deploy

<https://github.com/Lokethon/recoverai/actions>

Two workflows run in sequence:

1. **CI** — lint, tests, and build across Node 18, 20, 22
2. **Deploy to GitHub Pages** — starts automatically once CI goes green

First deploy takes 2–4 minutes. Afterwards, your site is live.

> **If Deploy doesn't start:** it only triggers after a *successful* CI run on `main`. Check CI passed first. You can always trigger it by hand — open the Deploy workflow and click **Run workflow**.

---

## Step 4 — Verify the live site

Open <https://lokethon.github.io/recoverai/> and check:

- [ ] The app loads — no blank page, no 404s in the console
- [ ] Styling and icons render (confirms the base path is right)
- [ ] Charts draw on the Progress page
- [ ] Mic permission prompt appears in the voice coach
- [ ] Camera opens on the Emergency page
- [ ] Location works in the hospital map
- [ ] Settings accepts a Gemini key and **Test Connection** succeeds
- [ ] Open it on your phone

Camera, mic, and location all need HTTPS — GitHub Pages provides it, so these should work exactly as they do locally.

**Blank page with 404s for `/assets/...`?** The base path is wrong. The workflow derives it automatically, so this shouldn't happen — but if it does, check the Deploy log's build step for the `--base` value it used.

---

## How visitors use the AI features

No API key ships in the published bundle — nothing to leak. When someone opens your live site:

- The app loads fully, and every non-AI feature works immediately
- AI features stay dormant until they add their own Gemini key in **⚙️ Settings**
- Their key is stored only in their own browser

**For judges:** mention in your submission that AI features need a free key from [aistudio.google.com/apikey](https://aistudio.google.com/apikey), and that it takes about 30 seconds. Better still, show the AI working in your demo video so nobody has to.

Want AI to work with zero setup for visitors? That means baking a key into the public bundle where anyone can read it. If you decide the trade is worth it near the deadline, tell me and I'll wire it to a GitHub secret — but use a brand-new, quota-capped key and delete it after judging.

---

## Custom domain (optional)

If you own a domain: **Settings → Pages → Custom domain**, then add a `CNAME` file in `public/`. The workflow already handles the base path correctly for a custom domain — no config change needed.

---

## Worth adding before you share the link

`index.html` now has Open Graph tags, so the link shows a preview card on LinkedIn and WhatsApp — but it points at an `og-image.png` that doesn't exist yet. See `public/README.md`. Since your PromptWars submission includes a LinkedIn post, a proper preview card is worth the ten minutes.

---

## Cleanup

Once the site is live:

```bash
rm deploy.command GITHUB_PAGES.md PUBLISH.md NEXT_STEPS.md
git add -A && git commit -m "docs: remove setup instructions" && git push
```

Keep `docs/DEMO_SCRIPT.md` until you've submitted.
