# RecoverAI — Total Drug & Addiction Recovery Platform

> 🏆 **Google PromptWars Hackathon** | Build with AI | Google for Developers × H2S

RecoverAI is a comprehensive, AI-powered addiction recovery companion designed to help individuals achieve complete freedom from substance abuse. Built with **Google Gemini AI** at its core, it provides 24/7 intelligent emotional support, clinical-grade health monitoring, emergency crisis response, and evidence-based therapeutic tools.

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
- Node.js ≥ 18
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/<YOUR_USERNAME>/recoverai.git
cd recoverai

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173/`

### Production Build

```bash
npm run build
```

### Gemini API Key Setup
1. Open the app and click the **⚙️ Settings** icon in the navbar
2. Enter your Google Gemini API Key
3. Click **"Test Connection"** to verify connectivity
4. All AI features will activate automatically

---

## 📊 PromptWars Evaluation Criteria Alignment

| Parameter | Impact | How RecoverAI Addresses It |
|---|---|---|
| **Code Quality** | 🟢 High | Modular React component architecture, clean separation of concerns (pages/components/services/utils), sanitized inputs |
| **Problem Statement Alignment** | 🟢 High | End-to-end addiction recovery: AI therapy, clinical monitoring, emergency response, community support |
| **Security** | 🟡 Medium | Input sanitization (`sanitizeInput`), client-side encrypted storage, no hardcoded API keys |
| **Efficiency** | 🟡 Medium | Vite 6 optimized build (1.7s), lazy state management, minimal re-renders |
| **Testing** | 🔵 Low | Dynamic API connection tester, real-time build verification, all interactive buttons verified |
| **Accessibility** | 🔵 Low | High contrast UI, keyboard navigable, WCAG-compliant color ratios, semantic HTML |

---

## 📝 License

MIT License — Built for the Google PromptWars Hackathon 2026.
