#!/usr/bin/env python3
"""Add subjects sidebar to individual study guide pages."""

import re

# Sidebar CSS to inject before </style>
SIDEBAR_CSS = """
/* ---- Subjects Sidebar ---- */
.page-wrap{display:flex;gap:0;max-width:1400px;margin:0 auto;width:100%}
.sidebar{
  width:260px;flex-shrink:0;
  position:sticky;top:72px;height:calc(100vh - 72px);overflow-y:auto;
  background:var(--bg-secondary);border-right:1px solid var(--border);
  padding:20px 0;border-radius:0;z-index:50;
}
.sidebar::-webkit-scrollbar{width:6px}
.sidebar::-webkit-scrollbar-thumb{background:rgba(191,155,122,0.10);border-radius:3px}
.sidebar-title{
  font-size:.75rem;color:var(--text-muted);text-transform:uppercase;letter-spacing:.08em;
  padding:0 20px 12px;font-weight:700;
}
.sidebar-subjects{list-style:none;padding:0;margin:0}
.sidebar-subjects li a{
  display:block;padding:8px 20px;color:var(--text-muted);text-decoration:none;
  font-size:.88rem;border-left:3px solid transparent;transition:.2s;
}
.sidebar-subjects li a:hover,.sidebar-subjects li a.active{
  color:var(--accent-tan);background:rgba(191,155,122,0.08);border-left-color:var(--accent-tan);
}
.sidebar-subjects li a .sub-code{font-weight:600;color:var(--text-primary)}
.main-content{flex:1;min-width:0}
.main-content .content-wrap{max-width:860px;margin:0 auto;padding:24px 24px 80px}

/* mobile sidebar toggle */
.sidebar-toggle{
  display:none;position:fixed;top:72px;left:12px;z-index:200;
  background:var(--bg-secondary);border:1px solid var(--border);border-radius:8px;
  padding:8px 12px;color:var(--text-primary);cursor:pointer;font-size:.85rem;
}
.sidebar-overlay{display:none;position:fixed;inset:0;background:rgba(0,0,0,.5);z-index:90}

@media(max-width:1024px){
  .sidebar{position:fixed;left:0;top:0;height:100vh;transform:translateX(-100%);transition:transform .3s;border-right:none;border-radius:0;z-index:100}
  .sidebar.open{transform:translateX(0)}
  .sidebar-toggle{display:block}
  .sidebar-overlay.show{display:block}
  .main-content{padding:0}
}
@media(max-width:640px){
  .main-content .content-wrap{padding:16px 16px 60px}
}
"""

# Sidebar HTML to inject after </header>
SIDEBAR_HTML = '''<button class="sidebar-toggle" onclick="document.querySelector('.sidebar').classList.toggle('open');document.querySelector('.sidebar-overlay').classList.toggle('show')">☰ Subjects</button>
<div class="sidebar-overlay" onclick="document.querySelector('.sidebar').classList.toggle('open');document.querySelector('.sidebar-overlay').classList.toggle('show')"></div>
<div class="page-wrap">
<aside class="sidebar">
  <div class="sidebar-title">Subjects</div>
  <ul class="sidebar-subjects">
    <li><a href="study.html"><span class="sub-code">All</span> — Study Hub</a></li>
    <li><a href="study_acw1020.html"><span class="sub-code">ACW1020</span> — Accounting in Business</a></li>
    <li><a href="study_acw1120.html"><span class="sub-code">ACW1120</span> — Financial Accounting 1</a></li>
    <li><a href="study_mkw1120.html"><span class="sub-code">MKW1120</span> — Marketing Fundamentals</a></li>
    <li><a href="study_ecw1101.html"><span class="sub-code">ECW1101</span> — Introductory Microeconomics</a></li>
    <li><a href="study_bfw1001.html"><span class="sub-code">BFW1001</span> — Foundations of Finance</a></li>
    <li><a href="study_btw1042.html"><span class="sub-code">BTW1042</span> — Business Law</a></li>
    <li><a href="study_ecm1953.html"><span class="sub-code">ECM1953</span> — Principles of Economics</a></li>
    <li><a href="study_etw1001.html"><span class="sub-code">ETW1001</span> — Introduction to Statistical Analysis</a></li>
    <li><a href="study_mgw1010.html"><span class="sub-code">MGW1010</span> — Introduction to Management</a></li>
    <li><a href="study_acw2220.html"><span class="sub-code">ACW2220</span> — Management Accounting 1</a></li>
    <li><a href="study_etc2440.html"><span class="sub-code">ETC2440</span> — Analytics &amp; Econometrics</a></li>
  </ul>
</aside>
<div class="main-content">
'''

PAGES = [
    "study_acw1020.html",
    "study_mkw1120.html",
    "study_ecw1101.html",
]

for page in PAGES:
    path = f"/home/node/.openclaw/workspace/uni-project/{page}"
    with open(path, "r", encoding="utf-8") as f:
        html = f.read()

    # Skip if already has sidebar
    if "sidebar-subjects" in html:
        print(f"Skipping {page} — sidebar already present")
        continue

    # Inject sidebar CSS before closing </style>
    html = html.replace("</style>", SIDEBAR_CSS + "\n</style>")

    # Inject sidebar HTML after </header> and before <div class="content-wrap">
    html = html.replace(
        '</header>\n\n<div class="content-wrap">',
        '</header>\n\n' + SIDEBAR_HTML + '<div class="content-wrap">'
    )

    # Close main-content and page-wrap before </body>
    html = html.replace("</body>", "</div>\n</div>\n</body>")

    with open(path, "w", encoding="utf-8") as f:
        f.write(html)

    print(f"Updated {page}")
