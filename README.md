# FitLog

A dark, no-nonsense gym companion built for Programming Hero's Level 1, Assignment 6. Browse a library of workouts, drill into detailed instructions, and build out a daily training plan — capped at five lifts a day so you actually finish what you start.

**Live site:** _add your deployed URL here_
**Repository:** _add your GitHub repository URL here_

## Description

FitLog lets you explore a library of 12 lifts pulled from a live API, view full workout detail pages (equipment, sets/reps, instructions), and organize your training into a **Today's Plan** and a **Saved for later** list. Everything is tracked with live counters in the navbar and persists across page reloads via `localStorage`.

## Technologies Used

- **Next.js 16** (App Router)
- **React 19** + **TypeScript**
- **Tailwind CSS v4** for styling and responsive layout
- **lucide-react** for icons
- **react-hot-toast** for toast notifications
- FitLog REST API (`https://api.abcz.workers.dev/api/fitlog`) as the data source

## Key Features

1. **Workout library grid** — all 12 workouts fetched from the API and rendered as responsive cards (image, muscle-group tags, equipment, duration/calories/rating) with a skeleton loading animation while data is fetched.
2. **Workout detail pages** — dynamic `/workout/[id]` routes with a full spec table (equipment, difficulty, sets, reps, duration, calories, rating) and numbered step-by-step instructions.
3. **Today's Plan & Saved lists** — add any workout to today's plan or save it for later directly from the detail page, with live toast confirmations and a hard cap of 5 lifts per day.
4. **My Plan dashboard** — live-updating Exercises/Minutes/Calories summary, tabbed Today's Plan / Saved views, a Sort By dropdown (Duration, Calories, Rating), "Mark as Done" and remove (×) actions, and a friendly empty state.
5. **Persistent state** — plan and saved data are stored in `localStorage`, so your plan survives page reloads and revisits.
6. **Global navbar badges** — live "Plan" and "Saved" counters in the navbar link straight to `/my-plan`.
7. **Polished UX details** — active nav-link highlighting, a custom 404 page, smooth-scroll hero CTA, and responsive layouts for mobile, tablet, and desktop.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Build

```bash
npm run build
npm run start
```
