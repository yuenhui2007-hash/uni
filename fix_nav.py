#!/usr/bin/env python3
import re

# Common header/nav HTML to inject
NAV_HTML = '''<header class="header">
<div style="display:flex;align-items:center;gap:16px">
<div class="logo">
                <div class="logo-icon">📚</div>
                <div class="logo-text">
                    <h1>UNI <em>{title}</em></h1>
                    <span>Your Academic Hub</span>
                </div>
            </div>
            <nav class="nav-links">
                <a href="index.html"{dash_active}><i class="fas fa-home"></i> Dashboard</a>
                <a href="notes.html"{notes_active}><i class="fas fa-sticky-note"></i> Notes</a>
                <a href="visual.html"{visual_active}><i class="fas fa-project-diagram"></i> Visual</a>
                <a href="planner.html"{planner_active}><i class="fas fa-calendar-alt"></i> Planner</a>
                <a href="study.html"{study_active}><i class="fas fa-book"></i> Study</a>
                <a href="exercise.html"{exercise_active}><i class="fas fa-dumbbell"></i> Exercise</a>
            </nav>
            <div class="user-profile">
                <span id="userDegree" style="color: var(--text-secondary); font-size: 0.9rem;">Bachelor of Science</span>
                <div class="user-avatar" id="userAvatar">JD</div>
                <button onclick="logout()" style="background:transparent;border:1px solid var(--border-light);color:var(--text-secondary);padding:6px 14px;border-radius:8px;cursor:pointer;font-size:.8rem;transition:all .2s" onmouseover="this.style.color='var(--danger)'" onmouseout="this.style.color='var(--text-secondary)'">Logout</button>
            </div>
        </header>'''

AUTH_SCRIPT = '''<script>
if (!localStorage.getItem('token')) location.href = 'login.html';
function logout() { localStorage.removeItem('token'); localStorage.removeItem('username'); location.href = 'login.html'; }
</script>'''

FONTS = '<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">'
FA = '<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">'

pages = [
    ('visual.html', 'Visual', 'visual'),
    ('planner.html', 'Planner', 'planner'),
    ('notes.html', 'Notes', 'notes'),
    ('study.html', 'Study Guide', 'study'),
    ('exercise.html', 'Exercise', 'exercise'),
    ('tutor.html', 'Tutor', 'tutor'),
]

for filename, title, active_page in pages:
    with open(filename, 'r') as f:
        content = f.read()

    # Add fonts if missing
    if 'Cormorant Garamond' not in content:
        content = content.replace('</head>', FONTS + '\n</head>')

    # Add Font Awesome if missing
    if 'font-awesome' not in content:
        content = content.replace('</head>', FA + '\n</head>')

    # Add auth script before </head>
    if 'logout()' not in content or 'localStorage.getItem' not in content:
        content = content.replace('</head>', AUTH_SCRIPT + '\n</head>')

    # Build nav with active state
    active = ' class="active"'
    nav = NAV_HTML.format(
        title=title,
        dash_active=active if active_page == 'dashboard' else '',
        notes_active=active if active_page == 'notes' else '',
        visual_active=active if active_page == 'visual' else '',
        planner_active=active if active_page == 'planner' else '',
        study_active=active if active_page == 'study' else '',
        exercise_active=active if active_page == 'exercise' else ''
    )

    # Replace existing nav/header patterns
    # Try to find and replace nav sections
    patterns = [
        r'<nav[^>]*>.*?</nav>',
        r'<header[^>]*>.*?</header>',
        r'<div class="navbar".*?</div>\s*</div>',
    ]

    # For visual.html - replace the nav section
    if filename == 'visual.html':
        content = re.sub(r'<nav>.*?</nav>', nav, content, flags=re.DOTALL)
        # Also remove the hero section since we have our own header now
        content = re.sub(r'<div class="hero">.*?</div>\s*</div>', '', content, flags=re.DOTALL, count=1)
    elif filename == 'planner.html':
        # Replace the back link and tabs nav
        content = re.sub(r'<a href="index\.html"[^>]*>.*?</a>\s*<nav class="tabs">.*?</nav>', nav, content, flags=re.DOTALL, count=1)
    elif filename == 'notes.html':
        content = re.sub(r'<nav class="navbar">.*?</nav>', nav, content, flags=re.DOTALL)
    elif filename == 'study.html':
        content = re.sub(r'<nav class="navbar">.*?</nav>', nav, content, flags=re.DOTALL)
        content = re.sub(r'<div class="hero">.*?</div>', '', content, flags=re.DOTALL, count=1)
    elif filename == 'exercise.html':
        content = re.sub(r'<nav>.*?</nav>', nav, content, flags=re.DOTALL)
    elif filename == 'tutor.html':
        # Add nav after body tag if no nav exists
        if '<nav' not in content:
            content = content.replace('<body>', '<body>\n' + nav)
        else:
            content = re.sub(r'<nav[^>]*>.*?</nav>', nav, content, flags=re.DOTALL)

    with open(filename, 'w') as f:
        f.write(content)

    print(f"Updated {filename}")
