# Demo Video Script & Narrative Assets

PromptWars requires a **dual submission**: the technical half (code + live preview) and a **narrative** half (a blog post and a LinkedIn "Build-in-Public" post). This file covers the narrative side plus a demo video script.

---

## 🎬 Demo Video Script — 3 minutes

Record at 1440×900, browser in fullscreen, dark mode. Have seed data loaded and your Gemini key already entered so nothing stalls on camera.

### 0:00 – 0:20 — The problem

> "Relapse rates in the first year of addiction recovery run between 40 and 60 percent. The hardest moments — 3am cravings, a trigger you didn't see coming — happen exactly when no clinician is available. RecoverAI is a companion built for those moments."

**On screen:** landing page, then the home dashboard.

### 0:20 – 0:50 — AI Voice Coach

Speak a craving out loud into the voice coach. Let the structured analysis render.

> "I speak to it the way I'd speak to a person. Gemini returns structured output — detected emotion, risk level, the trigger it identified, and a coping strategy. Not a chat bubble; a parsed clinical signal the rest of the app can act on."

**On screen:** live speech, then the emotion/risk/trigger JSON rendering into cards.

### 0:50 – 1:30 — Clinical dashboard & relapse prediction

> "Eight biomarkers — blood pressure, SpO2, HRV, sleep architecture, withdrawal severity. The 24-hour relapse predictor takes those physiological signals plus mood trend and forecasts craving vulnerability, so the user gets a warning before the craving arrives, not after."

**On screen:** scroll the biomarker cards, the 7-day chart, then run the predictor.

### 1:30 – 2:05 — Emergency response

> "When it does arrive: one tap to 988, one tap to WhatsApp a trusted contact, and an AI-generated three-step de-escalation protocol tailored to what's happening right now."

**On screen:** emergency page, tap the crisis protocol generator, show the 3 steps.

### 2:05 – 2:35 — Therapeutic tools

> "Between crises, the work is daily. Box breathing, binaural soundscapes generated in-browser with the Web Audio API, craving logging, and a journal where Gemini does CBT reframing on what you wrote."

**On screen:** breathing circle animating, then a journal entry with its CBT reframe.

### 2:35 – 3:00 — Engineering & close

> "It's a React 19 and Vite 6 SPA — no backend, so recovery data never leaves the device. Lint, 37 tests, and a production build run on every push across three Node versions. Built with Google Antigravity, prompt by prompt."

**On screen:** the green CI check on GitHub, then the README.

### Recording notes

- **Do not show your API key.** Close the Settings modal before recording, or blur it in post.
- Use demo data throughout — no real names, no real phone numbers.
- If you demo the camera, point it at a wall.
- Record system audio for the soundscape segment, or say what it does instead.

---

## 💼 LinkedIn "Build-in-Public" Post — draft

> Adjust the voice to sound like you. It's meant as a starting point, not a script.

---

40 to 60 percent. That's the relapse rate in the first year of addiction recovery.

What struck me reading that number is *when* relapse happens. Not in a clinic. At 3am, alone, after a trigger nobody saw coming — precisely when professional support isn't reachable.

So for PromptWars Challenge [N] I built **RecoverAI**: an AI recovery companion for the hours between appointments.

What it does:

🎙️ A voice coach that returns *structured* output — emotion, risk level, trigger, coping strategy — rather than a wall of text
📊 A clinical dashboard tracking 8 biomarkers, including withdrawal severity
🔮 A 24-hour relapse predictor combining HRV, sleep, and mood trend
🆘 One-tap crisis dialing plus an AI-generated de-escalation protocol
🧘 Box breathing, binaural soundscapes, and CBT journal reframing

Three things I learned building it with Google Antigravity:

**1. Structured output changed the architecture.** Asking Gemini for a JSON schema instead of prose turned the AI from a chat feature into a data source the whole app reads from. That one decision shaped everything downstream.

**2. Prompting the boring parts paid off most.** I expected AI to help with features. What actually saved me was generating the test suite, the ESLint config, and the CI pipeline — the scaffolding I'd normally skip under time pressure.

**3. Health software demands restraint.** The hardest work wasn't code, it was the disclaimer. Being precise that this is not a medical device, that withdrawal can be fatal, that AI output is a suggestion and not an assessment. Shipping fast is easy. Shipping fast *and* safely is the actual skill.

Every recovery data point stays in the browser. There's no backend, so there's no database of anyone's worst nights.

Code: github.com/Lokethon/recoverai
Live: [your deployment URL]

Built with Google Antigravity for #PromptWars by @Google for Developers × @Hack2skill

#BuildWithAI #PromptWars #GeminiAI #Hack2skill #GoogleForDevelopers #AddictionRecovery #React

---

**Before posting:** fill in the challenge number and live URL, and confirm the exact hashtags and handles PromptWars wants — they change per challenge.

---

## ✍️ Technical Blog Post — outline

Target 800–1,200 words. Hashnode, Dev.to, and Medium all work.

**Title options**

- "Building an AI Recovery Companion in 13 Days with Google Antigravity"
- "What Structured Output Taught Me About Designing Around an LLM"
- "RecoverAI: Prompting My Way to a Production-Ready Health App"

**Structure**

1. **The hook** (100 words) — the 40–60% relapse statistic and the 3am problem. Make it concrete, not abstract.

2. **Why this problem** (150 words) — why continuous support is a software problem, and what existing recovery apps don't do.

3. **Architecture decisions** (250 words) — client-only, and why that's a *privacy* decision rather than a shortcut. The trade-off you accepted: no cross-device sync in exchange for no database of anyone's relapse history. Include the folder structure.

4. **The structured-output insight** (250 words) — the heart of the post. Show a real before/after: prose response versus JSON schema. Explain how it turned AI output into something the relapse predictor and dashboard could both consume. Include the actual schema.

5. **Prompting workflow with Antigravity** (200 words) — what you delegated versus what you drove. Be specific and honest: which prompts failed, what you had to rewrite by hand. Reviewers can tell the difference between a real account and a polished one.

6. **Safety engineering** (200 words) — the disclaimer, the threat model in SECURITY.md, the decision to keep the app fully usable without an API key. Why a health app raises the bar.

7. **What I'd do next** (100 words) — the README roadmap: accessibility audit, offline service worker, Hindi localisation.

**Include**

- At least two real code snippets (the Gemini schema, and one storage or sanitisation function)
- A screenshot or two
- Links to the repo and the live demo
- An honest note on what's still rough — reviewers reward candour over a flawless narrative

**Avoid**

- Claiming clinical validity or medical efficacy
- Implying it diagnoses or treats anything
- Any language a person in recovery would find stigmatising
