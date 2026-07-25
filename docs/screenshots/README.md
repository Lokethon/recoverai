# Screenshots

The README expects these four files. Use exactly these names so the tables render:

| Filename | What to capture |
|---|---|
| `home.png` | Recovery dashboard — sobriety streak, mood tracker, daily pledge, AI planner card |
| `voice-chat.png` | AI Voice Coach mid-conversation, with an emotional analysis result visible |
| `progress.png` | Clinical EHR dashboard — the 8 biomarker cards and the 7-day vitals chart |
| `emergency.png` | Emergency crisis center — helpline dialer, SOS contacts, camera panel |

## How to capture

1. Run `npm run dev` and open `http://localhost:3000`
2. Use a **1440×900** browser window — wide enough to show the desktop layout, small enough that text stays readable in a README
3. macOS: `Cmd+Shift+4`, then press **Space** and click the window for a clean shot with no browser chrome
4. Save as PNG into this folder

## Before committing

- **Redact anything personal.** Real journal entries, real phone numbers in SOS contacts, and your API key in Settings must not appear. Use the demo/seed data.
- **Keep each file under ~500 KB** so the repo stays light. `pngquant` or [Squoosh](https://squoosh.app) will get you there without visible loss.
- Consider a light-mode and dark-mode pair if you have room — the app supports both, and it shows off the design system.

## Optional but worth it

A short animated GIF of one flow — the breathing exercise, or a craving being logged and the chart updating — communicates more than four stills. Keep it under 5 MB and name it `demo.gif`.
