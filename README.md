# Monash B2026 Study Portal

A personal university study hub built for Monash University B2026 students. Tracks GPA, study streaks, deadlines, weekly schedules, Pomodoro sessions, grades, and exam revision — all with a dark-themed UI and a lightweight JSON-backed API server.

## Pages

| Page | File | Description |
|------|------|-------------|
| Dashboard | `index.html` | Overview with stats, progress rings, GPA calculator, countdown timers, study streak calendar, and activity feed |
| Notes | `notes.html` | Subject notes viewer |
| Visual | `visual.html` | Visual study aids |
| Planner | `planner.html` | Weekly schedule, deadlines, goals, Pomodoro timer, habit tracker, grade tracker |
| Study Guide | `study.html` | Exam study guide with formulas, MCQs, and quick reference |
| Exercises | `exercise.html` | Practice problems and exercises |

## Backend API

A lightweight Express server (`server.js`) persists data to JSON files under `data/`. No database required — everything is file-based and human-readable.

### Start the server

```bash
npm install
npm start
```

Server runs on `http://localhost:3000` by default.

### API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/stats` | Get dashboard stats |
| PUT | `/api/stats` | Update dashboard stats |
| GET | `/api/streak` | Get streak calendar data |
| PUT | `/api/streak` | Update streak data |
| GET | `/api/streak/today` | Get today's streak status |
| POST | `/api/streak/today` | Log today's study session (increments streak) |
| GET | `/api/deadlines` | List all deadlines |
| POST | `/api/deadlines` | Add a deadline |
| PUT | `/api/deadlines/:id` | Update a deadline |
| DELETE | `/api/deadlines/:id` | Delete a deadline |
| GET | `/api/goals` | List all goals |
| POST | `/api/goals` | Add a goal |
| PUT | `/api/goals/:id` | Toggle/update a goal |
| DELETE | `/api/goals/:id` | Delete a goal |
| GET | `/api/grades` | List all grades |
| POST | `/api/grades` | Add a grade |
| PUT | `/api/grades/:id` | Update a grade |
| DELETE | `/api/grades/:id` | Delete a grade |
| GET | `/api/schedule` | Get weekly schedule |
| PUT | `/api/schedule` | Update weekly schedule |
| GET | `/api/timer/sessions` | Get Pomodoro session history |
| POST | `/api/timer/sessions` | Log a completed session |
| GET | `/api/habits` | Get habit tracker data |
| PUT | `/api/habits` | Update habit tracker |
| GET | `/api/badges` | Get earned badges |
| GET | `/api/config` | Get user config (name, degree, subjects) |
| PUT | `/api/config` | Update user config |
| GET | `/api/activities` | Get recent activity feed |
| POST | `/api/activities` | Add an activity |

### Data Files

All data is stored in `data/` as JSON:
- `stats.json` — dashboard stats & streak info
- `streak.json` — streak calendar day-by-day data
- `deadlines.json` — deadline list
- `goals.json` — goals list
- `grades.json` — grade tracker entries
- `schedule.json` — weekly schedule grid
- `timer_sessions.json` — Pomodoro session log
- `habits.json` — habit tracker data
- `badges.json` — earned badges
- `config.json` — user profile & settings
- `activities.json` — activity feed

## Themes

The entire site uses a dark/black theme with warm neutral accents. Customize colors in CSS `:root` variables.

## Tech Stack

- **Frontend:** Vanilla HTML, CSS, JavaScript (no frameworks)
- **Backend:** Node.js + Express
- **Data:** JSON file persistence (no database)
- **Charts:** Chart.js (loaded from CDN)
- **Icons:** Font Awesome (loaded from CDN)

## License

Personal use only.
