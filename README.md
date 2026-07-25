# RecoverAI — Total Drug & Addiction Recovery Platform

> 🏆 **Google PromptWars Hackathon** | Build with AI | Google for Developers × H2S

### [▶️ Try the live app](https://lokethon.github.io/recoverai/)

[![Live Demo](https://img.shields.io/badge/Live%20Demo-lokethon.github.io%2Frecoverai-4f46e5?style=for-the-badge)](https://lokethon.github.io/recoverai/)

[![CI](https://github.com/Lokethon/recoverai/actions/workflows/ci.yml/badge.svg)](https://github.com/Lokethon/recoverai/actions/workflows/ci.yml)
[![Deploy](https://github.com/Lokethon/recoverai/actions/workflows/deploy.yml/badge.svg)](https://github.com/Lokethon/recoverai/actions/workflows/deploy.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![React 19](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)](https://react.dev)
[![Vite 6](https://img.shields.io/badge/Vite-6-646CFF?logo=vite&logoColor=white)](https://vite.dev)
[![Gemini 2.5 Flash](https://img.shields.io/badge/Gemini-2.5%20Flash-4285F4?logo=google&logoColor=white)](https://ai.google.dev)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

RecoverAI is a comprehensive, AI-powered addiction recovery companion designed to help individuals achieve complete freedom from substance abuse. Built with **Google Gemini AI** at its core, it provides 24/7 intelligent emotional support, clinical-grade health monitoring, emergency crisis response, and evidence-based therapeutic tools.

---

## ⚠️ Important Safety & Medical Disclaimer

**If you or someone else is in immediate danger, stop reading and call emergency services.**
US: **911**, or the Suicide & Crisis Lifeline at **988**. SAMHSA National Helpline: **1-800-662-4357**.
India: **112**, or Tele-MANAS at **14416**. Outside these regions, use your local emergency number.

RecoverAI is an **educational and self-help project**, not a medical product.

- **Not a medical device.** It is not FDA-cleared, CE-marked, or approved by any regulator. It does not diagnose, treat, cure, or prevent any condition.
- **Not a substitute for professional care.** Nothing in this app replaces a doctor, therapist, counsellor, or addiction specialist. Never disregard professional advice or delay seeking it because of something this app produced.
- **AI output can be wrong.** All AI features are powered by a large language model, which can produce inaccurate, incomplete, or inappropriate responses. Its risk scores, daily plans, CBT reframes, and crisis protocols are suggestions to discuss with a professional — not clinical assessments.
- **Health metrics are illustrative.** Vitals, withdrawal-severity indices, and recovery timelines are self-reported or demonstration data. They are not clinically validated measurements and must not be used to make treatment decisions, including any decision about medication or detox.
- **Withdrawal can be fatal.** Unsupervised withdrawal from alcohol, benzodiazepines, and some other substances can cause seizures or death. Never begin or change a detox based on this app. Seek medical supervision.
- **Emergency features are supplementary.** The SOS dialer, WhatsApp alert, and camera capture depend on your device, browser permissions, and network. They can fail. Never rely on them as your only safety plan.
- **Your data stays on your device**, but content you submit to AI features is sent to Google's Gemini API. See [SECURITY.md](SECURITY.md) before entering sensitive personal health information.

Use of this software is at your own risk. It is provided "as is", without warranty of any kind, as set out in the [LICENSE](LICENSE).

---

## 🧠 Problem Statement Alignment

**Core Challenge**: Substance addiction recovery requires continuous, personalized support that traditional healthcare cannot provide 24/7. Relapse rates exceed 40-60% within the first year.

**RecoverAI Solution**: An always-available AI companion that combines real-time physiological monitoring, predictive relapse analytics, cognitive behavioral therapy, and instant emergency response into a single unified platform.

---

## ✨ Key Features

### 🤖 Full Google Gemini AI Integration
- **24/7 AI Voice Coach** — Real-time speech emotional analysis with structured JSON output (emotion, risk level, triggers, motivation) and personalized coping recommendations
- **AI Morning Recovery Planner** — Custom daily task generator with trigger advisories tailored to the user's recovery stage
- **AI CBT Journal Therapist** — Cognitive Behavioral Therapy reframing insights generated from personal journal reflections
- **AI 24-Hour Relapse Risk Predictor** — Evaluates physiological biomarkers (HRV, Sleep, Heart Rate) + mood trends to forecast craving vulnerability
- **AI Emergency Crisis Protocol** — Generates real-time 3-step de-escalation task protocols during acute panic/craving episodes
- **Dynamic Gemini API Connection Tester** — Live latency measurement (ms) to verify API key connectivity

### 🏥 Clinical EHR-Grade Medical Dashboard
- **8 Real-Time Clinical Biomarker Cards**: Blood Pressure (mmHg), Blood Oxygen SpO2 (%), Heart Rate (BPM), HRV Stress Score (ms), Sleep Architecture (hrs), Hydration Detox (L), Daily Exercise (min), Withdrawal Severity Index (COWS/CIWA)
- **7-Day Multi-Series Vitals Analytics Chart**: Recharts multi-line timeline tracking BP, Heart Rate, SpO2, and HRV trends simultaneously
- **Interactive Health Vitals Logging Modal**: Log comprehensive clinical measurements in real-time
- **6 Organ Health Recovery Milestones**: Clinical body self-repair timeline (24h → 1 Year)

### 🧘 Therapeutic & Coping Tools
- **30-Second Guided Box Breathing Exercise** — Animated breathing circle with phase timer and confetti completion
- **Calming Binaural Soundscapes** — Web Audio API synthesizer with 432Hz Alpha, 528Hz Solfeggio, and Brown Noise frequencies
- **Craving Surge Logger** — Track craving intensity (1-10 scale), triggers, location, and coping strategies with Recharts visualization
- **Daily Sobriety Pledge** — Morning commitment tracker with streak motivation
- **Daily Motivation Quote Ticker** — Curated recovery quotes from Dr. Anna Lembke, Dr. Andrew Huberman, and SAMHSA

### 🆘 Emergency Response System
- **24/7 Crisis Helpline Dialer** — Native `tel:` links for SAMHSA (988), Crisis Text Line (741741)
- **WebRTC Emergency Camera & Video Recording** — Live camera stream with 8-second MediaRecorder clip capture
- **WhatsApp SOS Dispatcher** — 1-click deep link (`wa.me`) prefilled with emergency alert payload
- **Editable SOS Emergency Contacts Manager** — Custom trusted contact and therapist phone/WhatsApp numbers

### 👥 Community & Support
- **AA / NA / SMART Recovery Meeting Check-in System** — Log support group attendance with topic notes
- **Personal Recovery Journal with Search** — Searchable journal with mood, trigger tagging, and AI CBT analysis
- **YouTube Recovery Education Library** — Embedded lectures from Stanford Psychiatry and Huberman Lab

---

## 📸 Screenshots

> Drop your captures into `docs/screenshots/` using these filenames and they will appear here automatically.

| Recovery Dashboard | AI Voice Coach |
|---|---|
| ![Home dashboard](docs/screenshots/home.png) | ![AI voice coach](docs/screenshots/voice-chat.png) |

| Clinical EHR Dashboard | Emergency Crisis Center |
|---|---|
| ![Clinical dashboard](docs/screenshots/progress.png) | ![Emergency center](docs/screenshots/emergency.png) |

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React 19 + Vite 6 |
| **Styling** | Tailwind CSS v4 |
| **AI Engine** | Google Gemini 2.5 Flash (`@google/genai` SDK) |
| **Charts** | Recharts (Area, Bar, Line) |
| **Icons** | Lucide React |
| **Audio** | Web Audio API (Binaural Oscillator Synthesis) |
| **Camera** | WebRTC (`getUserMedia` + `MediaRecorder`) |
| **Storage** | Browser `localStorage` (encrypted client-side) |
| **Animations** | Canvas Confetti + CSS Keyframes |

---

## 🚀 Getting Started

### Prerequisites
- Node.js ≥ 18 (20 or 22 recommended)
- npm ≥ 9
- A [Google Gemini API key](https://aistudio.google.com/apikey) — free tier is sufficient

### Installation

```bash
# Clone the repository
git clone https://github.com/Lokethon/recoverai.git
cd recoverai

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at **`http://localhost:3000/`**.

### Gemini API Key Setup

> Using the [live app](https://lokethon.github.io/recoverai/)? Same steps — no installation needed. Your key stays in your own browser.

The app works without a key — AI features are simply disabled. To enable them:

1. Open the app and click the **⚙️ Settings** icon in the navbar
2. Paste your Google Gemini API key
3. Click **"Test Connection"** to verify connectivity and see live latency
4. All AI features activate automatically

Your key is stored in your browser's `localStorage` and sent only to Google's API. It never reaches any RecoverAI server — there isn't one.

For demo deployments where you'd rather supply the key yourself, copy `.env.example` to `.env.local` and set `VITE_GEMINI_API_KEY`. **Read the warning in that file first** — Vite inlines the value into the public bundle.

---

## 📜 Available Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Start the Vite dev server on port 3000 with HMR |
| `npm run build` | Produce an optimised production build in `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | Run ESLint across the project |
| `npm run lint:fix` | Run ESLint and auto-fix what it can |
| `npm run test` | Run the Vitest suite once |
| `npm run test:watch` | Run Vitest in watch mode |
| `npm run test:coverage` | Run tests and emit a coverage report |

---

## 📁 Project Structure

```
recoverai/
├── .github/
│   ├── ISSUE_TEMPLATE/       # Bug report & feature request forms
│   ├── workflows/ci.yml      # Lint, test & build on Node 18/20/22
│   └── PULL_REQUEST_TEMPLATE.md
├── src/
│   ├── components/           # Modals, widgets, navigation
│   ├── pages/                # Home, VoiceChat, Emergency, Progress, Resources
│   ├── services/
│   │   ├── gemini.js         # All Gemini API calls & structured-output schemas
│   │   └── speech.js         # Web Speech API recognition & synthesis
│   ├── utils/
│   │   ├── security.js       # Input sanitisation & validation
│   │   ├── storage.js        # localStorage persistence layer
│   │   ├── appleHealth.js    # Health data integration helpers
│   │   └── mockData.js       # Seed data & recovery milestones
│   ├── test/setup.js         # Vitest + Testing Library setup
│   ├── App.jsx               # Root component & routing state
│   └── main.jsx              # Entry point
├── eslint.config.js          # Flat ESLint config
├── vitest.config.js          # Test runner config
├── vite.config.js            # Build config
└── vercel.json               # SPA rewrites & security headers
```

---

## 🧪 Testing

```bash
npm run test           # run once
npm run test:watch     # watch mode
npm run test:coverage  # with coverage report
```

Tests use **Vitest** with **jsdom** and **React Testing Library**. Coverage focuses on `src/utils` and `src/services` — the sanitisation, persistence, and AI-integration layers where regressions are most costly. Component tests cover interaction and persistence behaviour rather than markup.

CI runs lint, tests, and a production build against Node 18, 20, and 22 on every push and pull request.

---

## 🌐 Deployment

### GitHub Pages (live)

The app deploys itself. `.github/workflows/deploy.yml` runs after CI passes on `main`, builds with the correct base path, and publishes to GitHub Pages — so every push to `main` that passes lint, tests, and build goes live automatically.

No API key is baked into the published bundle. Visitors add their own key in Settings if they want the AI features; everything else works immediately.

To enable it once, in the repo: **Settings → Pages → Build and deployment → Source: GitHub Actions**.

To deploy manually, use **Run workflow** on the *Deploy to GitHub Pages* action.

### Other hosts

The app is a static SPA with no backend, so it runs anywhere.

**Vercel** — `vercel.json` is included with SPA rewrites, immutable asset caching, and security headers:

```bash
npm i -g vercel
vercel --prod
```

**Anywhere else** — run `npm run build` and serve `dist/`. Point all routes at `/index.html` and replicate the headers from `vercel.json`.

> Camera, microphone, and geolocation require **HTTPS** (or `localhost`). GitHub Pages and Vercel both provide it; a plain HTTP host will make those features fail silently.

---

## 🤝 Contributing

Contributions are welcome. Please read [CONTRIBUTING.md](CONTRIBUTING.md) for setup, coding standards, and the pull request process, and [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) — which includes specific expectations around non-stigmatising language, given the subject matter.

Found a security issue? Please report it privately as described in [SECURITY.md](SECURITY.md) rather than opening a public issue.

---

## 📊 PromptWars Evaluation Criteria Alignment

| Parameter | Impact | How RecoverAI Addresses It |
|---|---|---|
| **Code Quality** | 🟢 High | Modular React architecture with clean separation of concerns (pages/components/services/utils), ESLint flat config enforced in CI, documented contribution standards |
| **Problem Statement Alignment** | 🟢 High | End-to-end addiction recovery: AI therapy, clinical monitoring, emergency response, community support |
| **Security** | 🟢 High | Input sanitization (`sanitizeInput`), no hardcoded API keys, documented threat model in `SECURITY.md`, security headers configured, private vulnerability disclosure, Dependabot enabled |
| **Efficiency** | 🟡 Medium | Vite 6 optimized build, lazy state management, minimal re-renders, immutable asset caching |
| **Testing** | 🟢 High | Vitest + React Testing Library suite covering sanitization, persistence, and component interaction; CI matrix across Node 18/20/22 running lint, tests, and build |
| **Accessibility** | 🔵 Low | High contrast UI, keyboard navigable, WCAG-compliant color ratios, semantic HTML |

---

## 🗺️ Roadmap

- [ ] Broaden test coverage across remaining pages and the Gemini service layer
- [ ] Full WCAG 2.1 AA audit: focus management in modals, ARIA labels, screen reader passes
- [ ] Resolve React Compiler advisories (currently ESLint warnings — see `eslint.config.js`)
- [ ] Optional end-to-end encryption for locally stored journal entries
- [ ] Offline support via a service worker, so crisis tools work without a network
- [ ] Localisation, starting with Hindi

---

## 📝 License

Released under the [MIT License](LICENSE). Built for the Google PromptWars Hackathon 2026.

## 🙏 Acknowledgements

Recovery content and helpline information draw on public resources from SAMHSA, NIDA, the 988 Suicide & Crisis Lifeline, and Stanford Psychiatry. RecoverAI is not affiliated with or endorsed by any of these organisations.
