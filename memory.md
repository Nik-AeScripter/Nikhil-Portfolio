# Project Memory — Nikhil Ratan Dere Portfolio

## Project
- **Type:** Video editor / motion designer portfolio site
- **Stack:** Vanilla HTML + CSS + JS (no frameworks, no build step)
- **Files:** `D:\Anitgravity\Nikhil-Portfolio-Updated\` → `index.html`, `styles.css`, `script.js`
- **Run:** Open `index.html` in browser. No server required.

## User Identity
- **Name:** Nikhil Ratan Dere (Nick)
- **Role:** Motion Designer & Video Editor
- **Location:** Mumbai, India
- **Experience:** 5+ years
- **Education:** BAMMC, Reena Mehta College
- **Past work:** ZI Systech Pvt. Ltd., GetSetFly Media
- **Profile image:** `https://nikhilportfolio.lovable.app/assets/circle-profile-Bb3A6G1y.png`
- **Resume file:** `CV.pdf` (local, in same folder)
- **Old site:** `https://nikhilportfolio.lovable.app/` (content was imported from here)

## Site Structure
1. **Hero** — name, role, "Video Editor & Motion Designer" heading, 2 CTAs
2. **Marquee** — scrolling skill tags
3. **Work** — 5 categories, 23 videos total
4. **About** — bio + mini stats card
5. **Skills** — 4 strengths
6. **Contact** — form + links
7. **Footer**

## Video Categories (23 total)
| # | Category | Count | Video IDs |
|---|----------|-------|-----------|
| 01 | Corporate Consulting | 2 | 5C-cZONqiPk, yuouhTFR_N0 |
| 02 | Logo Reveals | 4 | QBhgHWQ3SM0, xwHrEe0sgaE, O_E2OE1flDk, WHfDBAp_n0M |
| 03 | Shorts / Reels | 5 | KTTEkRIqcdE, _g5zdnBYVC0, HT76qerb7O8, iHWTZjPEU7g, bE-zyvxLpqM |
| 04 | Illusion Aligner Brand | 9 | O63JWFXthSg, GkQkN-aChYA, qYQMfFzkhCM, zYcK-JC_UWc, NngjR1NSRBg, vFHlZlUOFTM, -Xy68bB6Evw, 6mqR6pJmqzo, XrHzqYG8y4Y |
| 05 | Teasers / Trailers | 3 | 0aD6hSsZA0c, N2RiRzAuyQs, g8MHJAA7_oo |

## Design Tokens
- **Theme:** Cinematic dark (`#0a0a0a` bg, `#e8e8e8` text)
- **Accent:** `#ff4d2e` → `#ffb84d` gradient
- **Fonts:** Bebas Neue (headings), Inter (body)
- **Tokens:** `--serif`, `--accent`, `--accent-2`, `--ease: cubic-bezier(0.22,1,0.36,1)`, `--pad: clamp(16px,4vw,56px)`

## YouTube Embed Convention
- Thumbnails: `https://img.youtube.com/vi/{ID}/hqdefault.jpg` (fallback: mqdefault)
- Embeds: `https://www.youtube.com/embed/{ID}` — **MUST strip `?si=`** (causes Error 153)
- Modal adds: `autoplay=1&rel=0&modestbranding=1`

## Key Rules Learned
- **All `<em>` and `<i>` tags are forced to `font-style: normal` (no italic)** — italic rendering was the root cause of the right-edge text cropping. Set in base reset.
- Em tags with gradient text-fill get clipped on the right if `display:inline-block` + parent `overflow:hidden` — use default `inline` display
- Hero title animation should NOT use `overflow:hidden` on line wrappers
- All headings: use `width: fit-content; max-width: 100%` to size to content and prevent overflow
- All em tags: add `padding-right: 0.05em` for gradient breathing room
- `?si=` parameter in YouTube embed URLs causes "Error 153 Video player configuration error" — strip in JS
- Body has `overflow-x:hidden` — long words can still be cut at right edge if they exceed viewport
- Section padding: use `clamp(16px, 4vw, 56px)` for `--pad` to scale with viewport
