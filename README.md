# Bharat Life Care Social Media Steward

Agentic, AI-led control center that orchestrates Bharat Life Care's social media lifecycle — from campaign strategy to content ideation, scheduling, and intelligence.

## ✨ Core Capabilities
- **Campaign command deck** – capture objectives, priorities, and channel mix in seconds.
- **AI content studio** – configure tone + cohorts to auto-generate multi-channel ideas, hashtags, and CTAs.
- **Workflow runway** – Kanban-style tracker with one-click stage progression across ideation → publish.
- **Schedule matrix** – see every upcoming drop by channel and toggle go-live status instantly.
- **Mission-control chat** – conversational assistant summarises status, surfaces alerts, and suggests next moves.
- **Cadence intelligence** – recommended posting rhythm tailored to Bharat Life Care’s channel mix.

## 🧱 Tech Stack
- [Next.js 14 (App Router)](https://nextjs.org/)
- [React 18](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Zustand](https://docs.pmnd.rs/zustand/getting-started/introduction) for state orchestration
- TypeScript, ESLint, Vitest test harness

## 🚀 Getting Started

```bash
npm install
npm run dev
```

Visit `http://localhost:3000` to interact with the steward locally.

## ✅ Quality Checks

```bash
npm run lint    # Static analysis
npm run typecheck
npm run build   # Production build
npm run test    # Vitest (JS DOM)
```

## 📁 Key Structure
```
src/
  app/              # Next.js App Router entry points
  components/       # UI building blocks (dashboard, chat, planners)
  lib/              # AI heuristics and generation logic
  store/            # Zustand store with seeded operational data
  types/            # Shared workflow types
```

## 🔌 Deployment
Ready for zero-config deployment on Vercel:
```
vercel deploy --prod --yes --token $VERCEL_TOKEN --name agentic-01cfe1f4
```

## 📝 Notes
- Initial data is pre-seeded with Bharat Life Care context so the workspace is usable on day one.
- AI responses are rule-based heuristics, keeping everything self-contained for demo and iteration.

Enjoy orchestrating Bharat Life Care’s digital presence with an always-on AI copilot! 🚑📈
