#!/usr/bin/env python3
"""Fix navigation across all pages to match index.html style"""
import re

# Auth script to add before </head>
AUTH_SCRIPT = '''<script>
if (!localStorage.getItem('token')) location.href = 'login.html';
function logout() { localStorage.removeItem('token'); localStorage.removeItem('username'); location.href = 'login.html'; }
</script>'''

# Font links
FONTS = '<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">'
FA = '<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">'

# Common header CSS
HEADER_CSS = '''
    .header {
      display: flex; justify-content: space-between; align-items: center;
      padding: 20px 40px; margin-bottom: 30px;
      border-bottom: 1px solid rgba(191,155,122,0.10);
      background: rgba(21,16,12,0.90);
      position: sticky; top: 0; z-index: 100;
      backdrop-filter: blur(20px) saturate(1.2);
    }
    .logo { display: flex; align-items: center; gap: 12px; }
    .logo-icon {
      width: 48px; height: 48px; background: linear-gradient(135deg, #BF9B7A, #8C5B3E);
      border-radius: 12px; display: flex; align-items: center; justify-content: center;
      font-size: 24px; box-shadow: 0 0 40px rgba(191,155,122,0.08);
    }
    .logo-text h1 {
      font-family: "Cormorant Garamond", Georgia, serif;
      font-size: 1.5rem; font-weight: 700;
      color: #F2E6D8; letter-spacing: -0.02em;
    }
    .logo-text h1 em { font-style: italic; color: #BF9B7A; }
    .logo-text span { font-size: 0.8rem; color: #8C5B3E; letter-spacing: 0.05em; }
    .nav-links { display: flex; gap: 8px; }
    .nav-links a {
      padding: 10px 18px; border-radius: 10px; text-decoration: none;
      color: #8C5B3E; font-weight: 500;
      transition: all 0.3s ease; border: 1px solid transparent;
      font-size: 0.85rem;
    }
    .nav-links a:hover, .nav-links a.active {
      color: #BF9B7A; background: rgba(191,155,122,0.08);
      border-color: rgba(191,155,122,0.18);
    }
    .nav-links a i { margin-right: 6px; }
    .user-profile { display: flex; align-items: center; gap: 12px; }
    .user-avatar {
      width: 40px; height: 40px; border-radius: 50%;
      background: linear-gradient(135deg, #555934, #BF9B7A); display: flex;
      align-items: center; justify-content: center; font-weight: 700;
      cursor: pointer; transition: transform 0.3s ease;
      color: #F2E6D8;
    }
    .user-avatar:hover { transform: scale(1.1); }
'''

def make_nav(active_page, title):
    nav = '''<header class="header">
<div style="display:flex;align-items:center;gap:16px">
<div class="logo">
                <div class="logo-icon">📚</div>
                <div class="logo-text">
                    <h1>UNI <em>''' + title + '''</em></h1>
                    <span>Your Academic Hub</span>
                </div>
            </div>
</div>
            <nav class="nav-links">
                <a href="index.html"''' + (' class="active"' if active_page == 'dashboard' else '') + '''><i class="fas fa-home"></i> Dashboard</a>
                <a href="notes.html"''' + (' class="active"' if active_page == 'notes' else '') + '''><i class="fas fa-sticky-note"></i> Notes</a>
                <a href="visual.html"''' + (' class="active"' if active_page == 'visual' else '') + '''><i class="fas fa-project-diagram"></i> Visual</a>
                <a href="planner.html"''' + (' class="active"' if active_page == 'planner' else '') + '''><i class="fas fa-calendar-alt"></i> Planner</a>
                <a href="study.html"''' + (' class="active"' if active_page == 'study' else '') + '''><i class="fas fa-book"></i> Study</a>
                <a href="exercise.html"''' + (' class="active"' if active_page == 'exercise' else '') + '''><i class="fas fa-dumbbell"></i> Exercise</a>
            </nav>
            <div class="user-profile">
                <span style="color: #8C5B3E; font-size: 0.9rem;">Bachelor of Science</span>
                <div class="user-avatar" id="userAvatar">JD</div>
                <button onclick="logout()" style="background:transparent;border:1px solid rgba(191,155,122,0.18);color:#8C5B3E;padding:6px 14px;border-radius:8px;cursor:pointer;font-size:.8rem;transition:all .2s" onmouseover="this.style.color='#f87171'" onmouseout="this.style.color='#8C5B3E'">Logout</button>
            </div>
        </header>'''
    return nav


def fix_file(filename, active_page, title):
    with open(filename, 'r') as f:
        content = f.read()

    # 1. Add fonts if missing
    if 'Cormorant Garamond' not in content:
        content = content.replace('</head>', FONTS + '\n</head>')

    # 2. Add Font Awesome if missing
    if 'font-awesome' not in content and 'fontawesome' not in content:
        content = content.replace('</head>', FA + '\n</head>')

    # 3. Add auth script
    if 'function logout()' not in content:
        content = content.replace('</head>', AUTH_SCRIPT + '\n</head>')

    # 4. Add header CSS before </style> or before body styles
    if '.header {' not in content:
        # Find first <style> tag and insert after opening
        style_match = re.search(r'<style[^>]*>', content, re.IGNORECASE)
        if style_match:
            insert_pos = style_match.end()
            content = content[:insert_pos] + '\n' + HEADER_CSS + content[insert_pos:]

    # 5. Replace nav/header sections
    nav = make_nav(active_page, title)

    # Remove existing nav/header patterns
    patterns = [
        r'<nav[^>]*>.*?</nav>',
        r'<header[^>]*>.*?</header>',
        r'<a href="index\.html"[^>]*>.*?Back.*?</a>',
    ]
    for pattern in patterns:
        content = re.sub(pattern, '', content, flags=re.DOTALL)

    # Insert new nav after <body> tag
    content = re.sub(r'(<body[^>]*>)', r'\1\n' + nav, content, flags=re.IGNORECASE)

    with open(filename, 'w') as f:
        f.write(content)

    print(f"Fixed {filename}")


# Fix all pages
pages = [
    ('visual.html', 'visual', 'Visual'),
    ('planner.html', 'planner', 'Planner'),
    ('notes.html', 'notes', 'Notes'),
    ('study.html', 'study', 'Study Guide'),
    ('exercise.html', 'exercise', 'Exercise'),
    ('tutor.html', 'tutor', 'Tutor'),
]

for filename, active, title in pages:
    fix_file(filename, active, title)

print("All pages fixed!")
