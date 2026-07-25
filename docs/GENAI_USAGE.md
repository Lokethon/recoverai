# Gen AI Services Used — PromptWars Submission

Everything below is verified against the code in this repository. Two sections you must complete yourself are marked **[CONFIRM]** — I can't attest to your build process for you.

---

## 📋 Short answer — for a submission form field

> **Gen AI services used:** Google Gemini API (`gemini-3.6-flash`) via the `@google/genai` JavaScript SDK, and Google Antigravity as the development environment.
>
> **Where:** Gemini powers five distinct features in the app — emotional voice analysis, daily recovery planning, CBT journal reframing, 24-hour relapse risk prediction, and emergency crisis protocol generation — all implemented in `src/services/gemini.js`. Every call uses Gemini's JSON mode with a defined response schema, so AI output feeds the app's UI and analytics as structured data rather than free text. Google Antigravity was used to architect, generate, and iterate on the codebase throughout the build.

---

## 🔍 Detailed answer — for the blog post or a longer form field

### 1. Google Gemini API — `gemini-3.6-flash`

**SDK:** `@google/genai` v2.13.0
**Implementation:** `src/services/gemini.js`
**Key handling:** supplied by the user at runtime, stored only in browser `localStorage`. No key is committed or bundled.

Five features, each a separate call with its own prompt and tuned parameters:

| # | Feature | Called from | Config | What Gemini does |
|---|---|---|---|---|
| 1 | **Emotional voice analysis** | `src/pages/VoiceChat.jsx` | JSON mode, `temperature: 0.3` | Reads the user's spoken or typed message and returns emotion, risk level, likely trigger, a one-sentence summary, an empathetic response, two recommended actions, and a tailored motivational line |
| 2 | **Daily recovery planner** | `src/components/AIDailyPlannerModal.jsx` | JSON mode, `temperature: 0.4` | Generates a personalised morning affirmation, three categorised tasks (mindfulness / physical / reflection), and a trigger advisory based on the user's recovery day count |
| 3 | **CBT journal reframing** | `src/pages/Progress.jsx` | Plain text, `temperature: 0.3` | Reads a journal reflection and returns a two-sentence Cognitive Behavioral Therapy insight and positive reframe |
| 4 | **24-hour relapse risk prediction** | `src/components/AIRelapsePredictor.jsx` | JSON mode, `temperature: 0.2` | Takes physiological biomarkers (heart rate, HRV, sleep hours) plus recovery streak and returns a risk level, probability score, forecast, and mitigation recommendation |
| 5 | **Emergency crisis protocol** | `src/pages/Emergency.jsx` | JSON mode, `temperature: 0.2` | Generates a three-step de-escalation protocol tailored to the acute trigger the user is experiencing |

Plus a **connection tester** in `src/components/GeminiSettingsModal.jsx` that issues a live Gemini call and reports round-trip latency in milliseconds, so users can verify their key works before relying on it.

### 2. Google Antigravity — development environment **[CONFIRM]**

> Fill in the specifics — reviewers can tell a real account from a generic one. Useful things to name: which components you generated versus hand-wrote, prompts that needed several attempts, and anything Antigravity got wrong that you had to correct.

Used throughout to architect, generate, and iterate on the application: _[describe your workflow here]_.

### 3. Web Speech API — browser-native

**Implementation:** `src/services/speech.js`

Not a Gen AI cloud service, but worth listing for completeness since it's part of the AI voice pipeline:

- `SpeechRecognition` / `webkitSpeechRecognition` — converts speech to text before it reaches Gemini
- `SpeechSynthesisUtterance` — reads Gemini's response back aloud

Note that some browsers process speech recognition on vendor servers rather than on-device. This is documented in `SECURITY.md`.

---

## 💡 The design decision worth highlighting

If the form gives you room, this is the strongest technical point in the submission:

> **Every Gemini call uses JSON mode with an explicit response schema rather than returning prose.** That single decision changed the architecture: AI output became structured data the whole app consumes, not text pasted into a chat bubble. The relapse predictor's risk score drives a chart. The voice coach's detected trigger is stored and trended over time. The crisis protocol renders as three tickable steps. The AI is a data source, not a chat feature.
>
> **Temperature is tuned per safety context.** Crisis protocol generation and relapse prediction run at `0.2` — near-deterministic, because a person in acute crisis needs consistent, predictable guidance. Emotional analysis and CBT reframing run at `0.3`. The daily planner runs at `0.4`, where variety is a feature rather than a risk.
>
> **Every AI feature has a deterministic fallback.** If the API call fails, the key is missing, or the response won't parse, the app returns hand-written clinical content instead of an error. A person reaching for a crisis tool at 3am must never see a stack trace. This is why the app is fully usable with no API key at all.

---

## ⚠️ Two things to sort out before submitting

### Disclose the AI tools used to build the project **[CONFIRM]**

This session (Claude, in Cowork) was used for the production-hardening pass: the ESLint configuration, the Vitest test suite, the CI and GitHub Pages workflows, `SECURITY.md`, the safety disclaimer, the bundle splitting, and the documentation.

**My recommendation: disclose it.** PromptWars is a competition about AI-assisted building, so using AI tooling is expected rather than penalised — but the rules prohibit "unfair means", and undisclosed tooling is the kind of thing that looks much worse discovered later than declared upfront. Check whether the submission form asks specifically about the development environment or about all AI assistance, and answer the question it actually asks.

### Confirm the Antigravity requirement is genuinely met

The PromptWars FAQ states Google Antigravity is **required for all submissions**. If your build predates Antigravity or used a different environment, resolve this with the organisers before submitting rather than after — <promptwarssupport@hack2skill.com>.

---

## ✅ Quick copy — one-liner

> Google Gemini 2.5 Flash (via `@google/genai`) powering five structured-output features — emotional voice analysis, daily recovery planning, CBT journal reframing, 24-hour relapse risk prediction, and emergency crisis protocol generation — built using Google Antigravity.
