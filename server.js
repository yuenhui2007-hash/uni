const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_DIR = path.join(__dirname, 'data');

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

// Ensure directories exist
if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });

function readFile(filename, defaultValue = {}) {
  const fp = path.join(DATA_DIR, filename);
  if (!fs.existsSync(fp)) return defaultValue;
  try { return JSON.parse(fs.readFileSync(fp, 'utf8')); } catch { return defaultValue; }
}

function writeFile(filename, data) {
  const fp = path.join(DATA_DIR, filename);
  fs.writeFileSync(fp, JSON.stringify(data, null, 2));
}

function genId() { return Date.now().toString(36) + Math.random().toString(36).slice(2, 8); }

// ── STATS ──
app.get('/api/stats', (req, res) => res.json(readFile('stats.json', {
  hoursStudiedThisWeek: 24, assignmentsCompleted: 8, studyStreakDays: 15, currentGPA: 3.42
})));
app.put('/api/stats', (req, res) => { writeFile('stats.json', req.body); res.json({ ok: true }); });

// ── STREAK ──
app.get('/api/streak', (req, res) => res.json(readFile('streak.json', {
  month: new Date().toLocaleString('en-US', { month: 'long', year: 'numeric' }),
  emptyDays: new Date(new Date().getFullYear(), new Date().getMonth(), 1).getDay() - 1,
  days: Array(31).fill(0),
  stats: { currentStreak: 0, longestStreak: 0, totalDays: 0, consistency: '0%' }
})));
app.put('/api/streak', (req, res) => { writeFile('streak.json', req.body); res.json({ ok: true }); });

app.get('/api/streak/today', (req, res) => {
  const streak = readFile('streak.json', { days: [] });
  const today = new Date().getDate() - 1;
  res.json({ studied: (streak.days[today] || 0) > 0, level: streak.days[today] || 0 });
});

app.post('/api/streak/today', (req, res) => {
  const streak = readFile('streak.json', { days: Array(31).fill(0), stats: {} });
  const today = new Date().getDate() - 1;
  const level = Math.min(5, (streak.days[today] || 0) + 1);
  streak.days[today] = level;
  let current = 0;
  for (let i = today; i >= 0; i--) { if ((streak.days[i] || 0) > 0) current++; else break; }
  streak.stats.currentStreak = current;
  streak.stats.totalDays = (streak.stats.totalDays || 0) + 1;
  writeFile('streak.json', streak);
  res.json({ ok: true, todayLevel: level, currentStreak: current });
});

// ── DEADLINES ──
app.get('/api/deadlines', (req, res) => res.json(readFile('deadlines.json', [])));
app.post('/api/deadlines', (req, res) => {
  const items = readFile('deadlines.json', []);
  const item = { id: genId(), ...req.body, createdAt: new Date().toISOString() };
  items.push(item); writeFile('deadlines.json', items); res.json(item);
});
app.put('/api/deadlines/:id', (req, res) => {
  let items = readFile('deadlines.json', []);
  items = items.map(i => i.id === req.params.id ? { ...i, ...req.body } : i);
  writeFile('deadlines.json', items); res.json({ ok: true });
});
app.delete('/api/deadlines/:id', (req, res) => {
  let items = readFile('deadlines.json', []);
  items = items.filter(i => i.id !== req.params.id);
  writeFile('deadlines.json', items); res.json({ ok: true });
});

// ── GOALS ──
app.get('/api/goals', (req, res) => res.json(readFile('goals.json', [])));
app.post('/api/goals', (req, res) => {
  const items = readFile('goals.json', []);
  const item = { id: genId(), text: req.body.text, done: false, createdAt: new Date().toISOString() };
  items.push(item); writeFile('goals.json', items); res.json(item);
});
app.put('/api/goals/:id', (req, res) => {
  let items = readFile('goals.json', []);
  items = items.map(i => i.id === req.params.id ? { ...i, ...req.body } : i);
  writeFile('goals.json', items); res.json({ ok: true });
});
app.delete('/api/goals/:id', (req, res) => {
  let items = readFile('goals.json', []);
  items = items.filter(i => i.id !== req.params.id);
  writeFile('goals.json', items); res.json({ ok: true });
});

// ── GRADES ──
app.get('/api/grades', (req, res) => res.json(readFile('grades.json', [])));
app.post('/api/grades', (req, res) => {
  const items = readFile('grades.json', []);
  const item = { id: genId(), ...req.body, createdAt: new Date().toISOString() };
  items.push(item); writeFile('grades.json', items); res.json(item);
});
app.put('/api/grades/:id', (req, res) => {
  let items = readFile('grades.json', []);
  items = items.map(i => i.id === req.params.id ? { ...i, ...req.body } : i);
  writeFile('grades.json', items); res.json({ ok: true });
});
app.delete('/api/grades/:id', (req, res) => {
  let items = readFile('grades.json', []);
  items = items.filter(i => i.id !== req.params.id);
  writeFile('grades.json', items); res.json({ ok: true });
});

// ── SCHEDULE ──
app.get('/api/schedule', (req, res) => res.json(readFile('schedule.json', {})));
app.put('/api/schedule', (req, res) => { writeFile('schedule.json', req.body); res.json({ ok: true }); });

// ── TIMER SESSIONS ──
app.get('/api/timer/sessions', (req, res) => res.json(readFile('timer_sessions.json', [])));
app.post('/api/timer/sessions', (req, res) => {
  const items = readFile('timer_sessions.json', []);
  const item = { id: genId(), ...req.body, timestamp: Date.now() };
  items.unshift(item); writeFile('timer_sessions.json', items); res.json(item);
});

// ── HABITS ──
app.get('/api/habits', (req, res) => res.json(readFile('habits.json', { study: [], exercise: [], review: [], sleep: [] })));
app.put('/api/habits', (req, res) => { writeFile('habits.json', req.body); res.json({ ok: true }); });

// ── BADGES ──
app.get('/api/badges', (req, res) => res.json(readFile('badges.json', [])));

// ── CONFIG ──
app.get('/api/config', (req, res) => res.json(readFile('config.json', {
  name: 'User', degree: 'Bachelor of Commerce', avatarInitials: 'US',
  subjects: [
    { id: 1, name: 'Business Law', color: '#d8c2b5' }, { id: 2, name: 'Accounting', color: '#a78bfa' }, { id: 3, name: 'Economics', color: '#60a5fa' },
    { id: 4, name: 'Marketing', color: '#34d399' }, { id: 5, name: 'Finance', color: '#f472b6' }, { id: 6, name: 'Management', color: '#fbbf24' },
    { id: 7, name: 'Statistics', color: '#fb923c' }, { id: 8, name: 'IT for Business', color: '#22d3ee' }
  ]
})));
app.put('/api/config', (req, res) => { writeFile('config.json', req.body); res.json({ ok: true }); });

// ── ACTIVITIES ──
app.get('/api/activities', (req, res) => res.json(readFile('activities.json', [])));
app.post('/api/activities', (req, res) => {
  const items = readFile('activities.json', []);
  const item = { id: genId(), ...req.body, time: req.body.time || new Date().toLocaleString() };
  items.unshift(item); writeFile('activities.json', items); res.json(item);
});

app.listen(PORT, () => console.log(`Monash Study Portal API running on http://localhost:${PORT}`));
