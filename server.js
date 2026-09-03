const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_DIR = path.join(__dirname, 'data');
const USERS_DIR = path.join(DATA_DIR, 'users');
const JWT_SECRET = process.env.JWT_SECRET || 'uni-study-portal-secret-key-2026';

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

// Ensure directories exist
if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
if (!fs.existsSync(USERS_DIR)) fs.mkdirSync(USERS_DIR, { recursive: true });

function readFile(filename, defaultValue = {}) {
  const fp = path.join(DATA_DIR, filename);
  if (!fs.existsSync(fp)) return defaultValue;
  try { return JSON.parse(fs.readFileSync(fp, 'utf8')); } catch { return defaultValue; }
}

function writeFile(filename, data) {
  const fp = path.join(DATA_DIR, filename);
  fs.writeFileSync(fp, JSON.stringify(data, null, 2));
}

// User-scoped file helpers
function userDir(userId) {
  const dir = path.join(USERS_DIR, userId);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  return dir;
}

function readUserFile(userId, filename, defaultValue = {}) {
  const fp = path.join(userDir(userId), filename);
  if (!fs.existsSync(fp)) return defaultValue;
  try { return JSON.parse(fs.readFileSync(fp, 'utf8')); } catch { return defaultValue; }
}

function writeUserFile(userId, filename, data) {
  const fp = path.join(userDir(userId), filename);
  fs.writeFileSync(fp, JSON.stringify(data, null, 2));
}

function genId() { return Date.now().toString(36) + Math.random().toString(36).slice(2, 8); }

// ── AUTH MIDDLEWARE ──
function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized — no token provided' });
  }
  const token = authHeader.slice(7);
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.userId;
    req.username = decoded.username;
    next();
  } catch {
    return res.status(401).json({ error: 'Unauthorized — invalid token' });
  }
}

// ── AUTH ENDPOINTS ──

// Register
app.post('/api/auth/register', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ error: 'Username and password required' });
  if (username.length < 3 || username.length > 20) return res.status(400).json({ error: 'Username must be 3-20 characters' });
  if (password.length < 6) return res.status(400).json({ error: 'Password must be at least 6 characters' });

  const users = readFile('users.json', []);
  if (users.find(u => u.username === username)) {
    return res.status(409).json({ error: 'Username already exists' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = { id: genId(), username, password: hashedPassword, createdAt: new Date().toISOString() };
  users.push(user);
  writeFile('users.json', users);

  // Initialize user data with defaults
  const defaults = {
    stats: { hoursStudiedThisWeek: 24, assignmentsCompleted: 8, studyStreakDays: 15, currentGPA: 3.42 },
    streak: { month: new Date().toLocaleString('en-US', { month: 'long', year: 'numeric' }), emptyDays: new Date(new Date().getFullYear(), new Date().getMonth(), 1).getDay() - 1, days: Array(31).fill(0), stats: { currentStreak: 0, longestStreak: 0, totalDays: 0, consistency: '0%' } },
    deadlines: [], goals: [], grades: [], schedule: {}, timer_sessions: [], habits: { study: [], exercise: [], review: [], sleep: [] }, badges: [], activities: [],
    config: { name: username, degree: 'Bachelor of Commerce', avatarInitials: username.slice(0,2).toUpperCase(), subjects: [
      { id: 1, name: 'Business Law', color: '#d8c2b5' }, { id: 2, name: 'Accounting', color: '#a78bfa' }, { id: 3, name: 'Economics', color: '#60a5fa' },
      { id: 4, name: 'Marketing', color: '#34d399' }, { id: 5, name: 'Finance', color: '#f472b6' }, { id: 6, name: 'Management', color: '#fbbf24' },
      { id: 7, name: 'Statistics', color: '#fb923c' }, { id: 8, name: 'IT for Business', color: '#22d3ee' }
    ]}
  };
  for (const [key, val] of Object.entries(defaults)) {
    writeUserFile(user.id, key + '.json', val);
  }

  res.status(201).json({ message: 'Account created', username: user.username });
});

// Login
app.post('/api/auth/login', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ error: 'Username and password required' });

  const users = readFile('users.json', []);
  const user = users.find(u => u.username === username);
  if (!user) return res.status(401).json({ error: 'Invalid username or password' });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(401).json({ error: 'Invalid username or password' });

  const token = jwt.sign({ userId: user.id, username: user.username }, JWT_SECRET, { expiresIn: '7d' });
  res.json({ token, username: user.username, userId: user.id });
});

// Get current user
app.get('/api/auth/me', authMiddleware, (req, res) => {
  res.json({ userId: req.userId, username: req.username });
});

// Logout (client-side clears token, server can blacklist if needed)
app.post('/api/auth/logout', authMiddleware, (req, res) => {
  res.json({ message: 'Logged out successfully' });
});

// ── USER-SCOPED API ROUTES ──
// All routes below require authentication

// ── STATS ──
app.get('/api/stats', authMiddleware, (req, res) => res.json(readUserFile(req.userId, 'stats.json', {
  hoursStudiedThisWeek: 24, assignmentsCompleted: 8, studyStreakDays: 15, currentGPA: 3.42
})));
app.put('/api/stats', authMiddleware, (req, res) => { writeUserFile(req.userId, 'stats.json', req.body); res.json({ ok: true }); });

// ── STREAK ──
app.get('/api/streak', authMiddleware, (req, res) => res.json(readUserFile(req.userId, 'streak.json', {
  month: new Date().toLocaleString('en-US', { month: 'long', year: 'numeric' }),
  emptyDays: new Date(new Date().getFullYear(), new Date().getMonth(), 1).getDay() - 1,
  days: Array(31).fill(0),
  stats: { currentStreak: 0, longestStreak: 0, totalDays: 0, consistency: '0%' }
})));
app.put('/api/streak', authMiddleware, (req, res) => { writeUserFile(req.userId, 'streak.json', req.body); res.json({ ok: true }); });

app.get('/api/streak/today', authMiddleware, (req, res) => {
  const streak = readUserFile(req.userId, 'streak.json', { days: [] });
  const today = new Date().getDate() - 1;
  res.json({ studied: (streak.days[today] || 0) > 0, level: streak.days[today] || 0 });
});

app.post('/api/streak/today', authMiddleware, (req, res) => {
  const streak = readUserFile(req.userId, 'streak.json', { days: Array(31).fill(0), stats: {} });
  const today = new Date().getDate() - 1;
  const level = Math.min(5, (streak.days[today] || 0) + 1);
  streak.days[today] = level;
  let current = 0;
  for (let i = today; i >= 0; i--) { if ((streak.days[i] || 0) > 0) current++; else break; }
  streak.stats.currentStreak = current;
  streak.stats.totalDays = (streak.stats.totalDays || 0) + 1;
  writeUserFile(req.userId, 'streak.json', streak);
  res.json({ ok: true, todayLevel: level, currentStreak: current });
});

// ── DEADLINES ──
app.get('/api/deadlines', authMiddleware, (req, res) => res.json(readUserFile(req.userId, 'deadlines.json', [])));
app.post('/api/deadlines', authMiddleware, (req, res) => {
  const items = readUserFile(req.userId, 'deadlines.json', []);
  const item = { id: genId(), ...req.body, createdAt: new Date().toISOString() };
  items.push(item); writeUserFile(req.userId, 'deadlines.json', items); res.json(item);
});
app.put('/api/deadlines/:id', authMiddleware, (req, res) => {
  let items = readUserFile(req.userId, 'deadlines.json', []);
  items = items.map(i => i.id === req.params.id ? { ...i, ...req.body } : i);
  writeUserFile(req.userId, 'deadlines.json', items); res.json({ ok: true });
});
app.delete('/api/deadlines/:id', authMiddleware, (req, res) => {
  let items = readUserFile(req.userId, 'deadlines.json', []);
  items = items.filter(i => i.id !== req.params.id);
  writeUserFile(req.userId, 'deadlines.json', items); res.json({ ok: true });
});

// ── GOALS ──
app.get('/api/goals', authMiddleware, (req, res) => res.json(readUserFile(req.userId, 'goals.json', [])));
app.post('/api/goals', authMiddleware, (req, res) => {
  const items = readUserFile(req.userId, 'goals.json', []);
  const item = { id: genId(), text: req.body.text, done: false, createdAt: new Date().toISOString() };
  items.push(item); writeUserFile(req.userId, 'goals.json', items); res.json(item);
});
app.put('/api/goals/:id', authMiddleware, (req, res) => {
  let items = readUserFile(req.userId, 'goals.json', []);
  items = items.map(i => i.id === req.params.id ? { ...i, ...req.body } : i);
  writeUserFile(req.userId, 'goals.json', items); res.json({ ok: true });
});
app.delete('/api/goals/:id', authMiddleware, (req, res) => {
  let items = readUserFile(req.userId, 'goals.json', []);
  items = items.filter(i => i.id !== req.params.id);
  writeUserFile(req.userId, 'goals.json', items); res.json({ ok: true });
});

// ── GRADES ──
app.get('/api/grades', authMiddleware, (req, res) => res.json(readUserFile(req.userId, 'grades.json', [])));
app.post('/api/grades', authMiddleware, (req, res) => {
  const items = readUserFile(req.userId, 'grades.json', []);
  const item = { id: genId(), ...req.body, createdAt: new Date().toISOString() };
  items.push(item); writeUserFile(req.userId, 'grades.json', items); res.json(item);
});
app.put('/api/grades/:id', authMiddleware, (req, res) => {
  let items = readUserFile(req.userId, 'grades.json', []);
  items = items.map(i => i.id === req.params.id ? { ...i, ...req.body } : i);
  writeUserFile(req.userId, 'grades.json', items); res.json({ ok: true });
});
app.delete('/api/grades/:id', authMiddleware, (req, res) => {
  let items = readUserFile(req.userId, 'grades.json', []);
  items = items.filter(i => i.id !== req.params.id);
  writeUserFile(req.userId, 'grades.json', items); res.json({ ok: true });
});

// ── SCHEDULE ──
app.get('/api/schedule', authMiddleware, (req, res) => res.json(readUserFile(req.userId, 'schedule.json', {})));
app.put('/api/schedule', authMiddleware, (req, res) => { writeUserFile(req.userId, 'schedule.json', req.body); res.json({ ok: true }); });

// ── TIMER SESSIONS ──
app.get('/api/timer/sessions', authMiddleware, (req, res) => res.json(readUserFile(req.userId, 'timer_sessions.json', [])));
app.post('/api/timer/sessions', authMiddleware, (req, res) => {
  const items = readUserFile(req.userId, 'timer_sessions.json', []);
  const item = { id: genId(), ...req.body, timestamp: Date.now() };
  items.unshift(item); writeUserFile(req.userId, 'timer_sessions.json', items); res.json(item);
});

// ── HABITS ──
app.get('/api/habits', authMiddleware, (req, res) => res.json(readUserFile(req.userId, 'habits.json', { study: [], exercise: [], review: [], sleep: [] })));
app.put('/api/habits', authMiddleware, (req, res) => { writeUserFile(req.userId, 'habits.json', req.body); res.json({ ok: true }); });

// ── BADGES ──
app.get('/api/badges', authMiddleware, (req, res) => res.json(readUserFile(req.userId, 'badges.json', [])));

// ── CONFIG ──
app.get('/api/config', authMiddleware, (req, res) => res.json(readUserFile(req.userId, 'config.json', {
  name: req.username, degree: 'Bachelor of Commerce', avatarInitials: req.username.slice(0,2).toUpperCase(),
  subjects: [
    { id: 1, name: 'Business Law', color: '#d8c2b5' }, { id: 2, name: 'Accounting', color: '#a78bfa' }, { id: 3, name: 'Economics', color: '#60a5fa' },
    { id: 4, name: 'Marketing', color: '#34d399' }, { id: 5, name: 'Finance', color: '#f472b6' }, { id: 6, name: 'Management', color: '#fbbf24' },
    { id: 7, name: 'Statistics', color: '#fb923c' }, { id: 8, name: 'IT for Business', color: '#22d3ee' }
  ]
})));
app.put('/api/config', authMiddleware, (req, res) => { writeUserFile(req.userId, 'config.json', req.body); res.json({ ok: true }); });

// ── ACTIVITIES ──
app.get('/api/activities', authMiddleware, (req, res) => res.json(readUserFile(req.userId, 'activities.json', [])));
app.post('/api/activities', authMiddleware, (req, res) => {
  const items = readUserFile(req.userId, 'activities.json', []);
  const item = { id: genId(), ...req.body, time: req.body.time || new Date().toLocaleString() };
  items.unshift(item); writeUserFile(req.userId, 'activities.json', items); res.json(item);
});

app.listen(PORT, () => console.log(`Monash Study Portal API running on http://localhost:${PORT}`));
