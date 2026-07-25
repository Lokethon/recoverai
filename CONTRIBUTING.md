# Contributing to RecoverAI

Thank you for your interest in contributing to RecoverAI! This project was built for the **Google PromptWars Hackathon 2026** and is open for community contributions.

Please read our [Code of Conduct](CODE_OF_CONDUCT.md) first — it includes specific expectations about non-stigmatising language, which matter a great deal in this problem space.

## ⚠️ Before You Start

RecoverAI is health-adjacent software used by people in recovery. Two rules override everything else in this guide:

1. **Never present AI output as medical advice.** Any new AI feature must frame its output as a suggestion, not an assessment or instruction.
2. **Never break or delay the emergency path.** Changes touching `src/pages/Emergency.jsx`, helpline numbers, or SOS contacts require manual testing and an explicit note in your PR.

Also: never commit an API key, a `.env` file, or real user data. `.gitignore` covers the usual cases, but check `git diff` before you push.

## 🚀 Getting Started

### Prerequisites
- **Node.js** ≥ 18.0.0
- **npm** ≥ 9.0.0
- A **Google Gemini API Key** (free at [aistudio.google.com](https://aistudio.google.com))

### Local Development Setup

```bash
# 1. Fork and clone the repository
git clone https://github.com/Lokethon/recoverai.git
cd recoverai

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev

# 4. Open http://localhost:3000 in your browser
```

### Setting Up Gemini AI
1. Open the app in your browser
2. Click the **⚙️ Settings** gear icon in the top navigation
3. Enter your Google Gemini API Key
4. Click **"Test Connection"** to verify

## 📁 Project Structure

```
recoverai/
├── index.html                  # Entry HTML with SEO meta tags
├── package.json                # Dependencies & scripts
├── vite.config.js              # Vite 6 build configuration
├── vercel.json                 # Vercel deployment SPA config
├── src/
│   ├── main.jsx                # React DOM entry point
│   ├── App.jsx                 # Root app with routing & auth
│   ├── index.css               # Global design tokens & Tailwind
│   ├── pages/
│   │   ├── Home.jsx            # Main recovery dashboard
│   │   ├── Progress.jsx        # Clinical EHR medical dashboard
│   │   ├── VoiceChat.jsx       # AI voice therapy conversation
│   │   ├── Emergency.jsx       # SOS crisis center & WebRTC
│   │   ├── Resources.jsx       # Education library & videos
│   │   └── LandingLogin.jsx    # Auth gate & registration
│   ├── components/
│   │   ├── Navbar.jsx          # Top navigation bar
│   │   ├── BottomNav.jsx       # Mobile bottom navigation
│   │   ├── AppleHealthWidget.jsx   # BioTracker vitals widget
│   │   ├── AIRelapsePredictor.jsx  # Gemini relapse risk engine
│   │   ├── AIDailyPlannerModal.jsx # AI morning recovery planner
│   │   ├── LogHealthVitalsModal.jsx # Clinical vitals logger
│   │   ├── CravingLoggerModal.jsx  # Craving surge tracker
│   │   ├── MeetingCheckinModal.jsx # AA/NA/SMART meeting log
│   │   ├── SoundscapePlayerModal.jsx # Binaural audio therapy
│   │   ├── BreathingExerciseModal.jsx # Box breathing exercise
│   │   ├── MoodSelectorModal.jsx   # Mood emotion logger
│   │   ├── GeminiSettingsModal.jsx # API key settings & tester
│   │   ├── EditContactsModal.jsx   # SOS contacts manager
│   │   ├── HospitalMapModal.jsx    # Nearby rehab hospitals
│   │   └── LoginModal.jsx         # Login form component
│   ├── services/
│   │   ├── gemini.js           # Google Gemini AI service layer
│   │   └── speech.js           # Web Speech API (STT/TTS)
│   └── utils/
│       ├── mockData.js         # Clinical data & constants
│       ├── storage.js          # localStorage persistence layer
│       ├── security.js         # Input sanitization utilities
│       └── appleHealth.js      # BioTracker vitals engine
```

## 🛡️ Code Quality Guidelines

- **Components**: Keep components focused and single-responsibility
- **Security**: Always use `sanitizeInput()` from `utils/security.js` for user inputs
- **State**: Use `localStorage` helpers from `utils/storage.js` for persistence
- **AI calls**: All Gemini API calls go through `services/gemini.js` with graceful fallbacks — the app must remain fully usable when no API key is set
- **Styling**: Use Tailwind CSS utility classes; follow the existing indigo/sky/slate color palette
- **Copy**: Use person-first language ("person in recovery", not "addict")

## ✅ Scripts & Checks

| Command | What it does |
|---|---|
| `npm run dev` | Dev server on port 3000 with HMR |
| `npm run build` | Production build into `dist/` |
| `npm run preview` | Serve the production build |
| `npm run lint` | ESLint across the project |
| `npm run lint:fix` | ESLint with auto-fix |
| `npm run test` | Run the Vitest suite once |
| `npm run test:watch` | Vitest in watch mode |
| `npm run test:coverage` | Tests with a coverage report |

Run all three before opening a PR — CI runs the same checks on Node 18, 20, and 22:

```bash
npm run lint && npm run test && npm run build
```

### A note on lint warnings

The config treats React Compiler rules (`react-hooks/purity`, `react-hooks/immutability`, `react-hooks/set-state-in-effect`) as **warnings**, not errors. They flag patterns worth refactoring but do not indicate current bugs. Please don't add new ones, and fixing existing ones is a welcome contribution — see the roadmap in the README.

## 🧪 Testing

Tests use **Vitest** + **jsdom** + **React Testing Library**. Place them next to the code they cover as `*.test.js` or `*.test.jsx`.

```bash
npm run test:watch
```

What we expect:

- **New utility or service functions** need unit tests, including the failure path (corrupted `localStorage`, rejected API call, missing key).
- **New components** need at least an interaction test — does clicking the thing produce the expected callback and persisted state? Test behaviour, not markup.
- **Bug fixes** should come with a test that fails before the fix.

Shared setup lives in `src/test/setup.js`, which clears `localStorage` between tests.

## 📝 Commit Convention

Use clear, descriptive commit messages:

```
feat: add hydration detox tracking widget
fix: resolve craving logger modal close behavior
docs: update README with deployment instructions
test: cover corrupted-storage fallback in getStoredProfile
chore: bump vite to 6.4
style: adjust breathing exercise animation timing
```

## 🔁 Pull Request Process

1. Fork the repo and create a branch from `main` (`feat/short-description`).
2. Make your change, adding tests where the guidance above applies.
3. Run `npm run lint && npm run test && npm run build` locally.
4. Open a PR and fill in the template, including the **safety checklist**.
5. Link any issue your PR closes, and add screenshots for UI changes (redact personal data).
6. CI must pass before review. Address feedback with additional commits rather than force-pushing, so reviewers can follow the diff.

## 🔒 Reporting Security Issues

Do not open a public issue. Follow the private disclosure process in [SECURITY.md](SECURITY.md).

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.
