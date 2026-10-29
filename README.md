# SkillReactor — Personalized Skill Roadmaps

SkillReactor is a web app for turning a learning goal into a structured, trackable roadmap. Users choose a career goal and skill level, set weekly study time, work through sequenced topics, track completion and streaks, and use an in-app mentor interface for next-step guidance.

## Features

- **Career roadmaps** for Data Science, Machine Learning, Web Development, Cloud Computing, and Cybersecurity.
- **Beginner and intermediate pathways** with ordered steps, estimated durations, descriptions, and learning resources.
- **Custom goals** and custom roadmap support.
- **Progress tracking** for completed steps, completion dates, current topic, and learning streaks.
- **Study-planning UI** to organize learning time and progress.
- **Mentor chat interface** with contextual responses based on the selected goal, skill level, completed steps, and next roadmap step.
- **Local browser state** — the app stores its state in `localStorage` under `skillreactor_state`.

> The mentor implementation in `components/mentor-page.tsx` uses local intent matching and predefined responses. It is not evidence of a connected hosted LLM service.

## Tech stack

- Next.js 16, React 19, TypeScript
- Tailwind CSS 4
- Framer Motion and Lucide React
- React Hook Form, Zod, and Radix UI components
- Recharts and date-fns

## Run locally

Requirements: Node.js compatible with the installed Next.js version.

```bash
npm install
npm run dev
```

Open the local URL printed by Next.js (normally http://localhost:3000).

## Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start development server |
| `npm run build` | Build the production app |
| `npm run start` | Start the production server after building |
| `npm run lint` | Run ESLint |

## Application areas

The app includes authentication-style screens, goal selection, dashboard, roadmap, learning journey, planner, progress, and mentor views. Inspect the app context and roadmap data for the current state and available roadmap definitions.

## Data and privacy

The current application context persists user state in browser local storage. Treat this as a client-side prototype rather than server-backed account storage; do not store secrets or sensitive personal information in the local profile.

## Project structure

- `app/` — Next.js app shell and routes
- `components/` — landing page, roadmap UI, progress, and mentor experience
- `lib/roadmap-data.ts` — career goals and roadmap content
- `lib/app-context.tsx` — app state, completion tracking, and local persistence
- `lib/custom-goals.ts` — custom roadmap data and helpers
