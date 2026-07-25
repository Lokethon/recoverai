# Security Policy

## Supported Versions

| Version | Supported |
| ------- | --------- |
| 1.x     | ✅        |

## Reporting a Vulnerability

**Please do not open a public GitHub issue for security vulnerabilities.**

Report suspected vulnerabilities privately via
[GitHub Security Advisories](https://github.com/Lokethon/recoverai/security/advisories/new).

Please include:

- A description of the issue and its potential impact
- Steps to reproduce, or a proof of concept
- Affected version, browser, and platform

You can expect an acknowledgement within 72 hours and a status update within
7 days. Please give us a reasonable window to ship a fix before any public
disclosure.

## Security Model

RecoverAI is a **client-only application**. There is no backend server and no
RecoverAI-operated database. Understanding what that means for your data:

### Where your data lives

- All recovery data — profile, journals, mood history, craving logs, meeting
  logs, chat history — is stored in your browser's `localStorage` on your own
  device. It is never transmitted to RecoverAI.
- Clearing your browser storage permanently deletes this data. There is no
  backup and no recovery path.
- Anyone with access to your unlocked device and browser profile can read this
  data. Use device-level encryption and a screen lock.

### Your Gemini API key

- The key you enter in Settings is stored in `localStorage` on your device and
  sent directly from your browser to Google's Gemini API.
- No API key is bundled in this repository or in the production build. Never
  commit a key.
- Because the key lives in the browser, it is visible to anyone with access to
  your device or browser devtools. Use a key scoped to this purpose, set quota
  limits in Google AI Studio, and rotate it if you suspect exposure.

### What is sent to third parties

- **Google Gemini API** — the text of your prompts, journal entries submitted
  for CBT analysis, mood and vitals data used for risk prediction, and voice
  transcripts. Review
  [Google's Gemini API terms](https://ai.google.dev/gemini-api/terms) before
  entering sensitive personal health information.
- **Web Speech API** — in some browsers, speech recognition is processed on
  vendor servers rather than on-device.
- **YouTube embeds** on the Resources page load content from Google.

Nothing is sent anywhere else.

### Application-level protections

- User input is escaped via `sanitizeInput` before rendering or being included
  in AI prompts, and length-capped via `limitStringLength`.
- No `dangerouslySetInnerHTML` or `eval` is used.
- Security headers (`X-Content-Type-Options`, `X-Frame-Options`,
  `Referrer-Policy`, `Permissions-Policy`) are configured in `vercel.json` for
  the recommended deployment target. If you deploy elsewhere, replicate them.
- Camera, microphone, and geolocation permissions are requested only when you
  actively trigger the relevant feature.

## Out of Scope

The following are known and accepted properties of a client-only design, not
vulnerabilities:

- `localStorage` data readable by anyone with local device access
- The Gemini API key being visible in browser devtools
- No server-side authentication (the login screen is a local profile selector,
  not an authentication boundary)

## Not a Medical Device

RecoverAI is a self-help and educational tool. It is not a medical device, is
not HIPAA-compliant, and must not be used as a clinical record system or as a
substitute for professional care. See the disclaimer in the
[README](README.md#-important-safety--medical-disclaimer).
