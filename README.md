# suelliott77.github.io

Personal portfolio site for Sutton Elliott, hosted on GitHub Pages.

**Live site:** [suttonelliott.com](https://suttonelliott.com)

## Pages

| URL | File | Description |
|-----|------|-------------|
| `/` | `index.html` | Home / landing page |
| `/experience/` | `experience/index.html` | Professional and resume-worthy projects |
| `/personal-projects/` | `personal-projects/index.html` | Personal experiments and side builds |
| `/education/` | `education/index.html` | Education background |
| `/about-me/` | `about-me/index.html` | Personal background and leadership experience |

Each page lives in its own folder as `index.html` so it serves at a clean, extensionless URL. All internal links, styles, and scripts use root-relative paths (`/style.css`, `/images/...`, etc.) so they resolve correctly regardless of folder depth.

## Structure

```
├── index.html
├── experience/
│   └── index.html
├── personal-projects/
│   └── index.html
├── education/
│   └── index.html
├── about-me/
│   └── index.html
├── style.css          # Global styles
├── animations.js      # Scroll and entrance animations
├── theme.js           # Theme utilities
├── CNAME              # Custom domain (suttonelliott.com)
└── images/            # Project screenshots, backgrounds, resume PDF — organized by page
```

## Deployment

Automatically deployed via GitHub Pages on every push to `main`. No build step required — all files are plain HTML, CSS, and JavaScript.
