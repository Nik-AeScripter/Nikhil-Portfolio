# Session State

## Current Session
- **Date:** 2026-06-07
- **Active file set:** index.html, styles.css, script.js, memory.md, state.md, CV.pdf

## Active Todos
- [x] Fix YouTube Error 153 — strip `?si=` from embed URLs in `script.js` `buildEmbed()`
- [x] Fix em tag right-side cropping — removed `display:inline-block; max-width:100%` from em tags; removed `overflow:hidden` from `.hero-title .line`; changed hero animation to opacity+translateY
- [x] Change resume links to `CV.pdf` (done in nav, hero CTA, contact section)
- [x] Create `memory.md` and `state.md`

## Round 2 Fix (still seeing em crop)
- `.section-title`, `.cat-title`, `.hero-title`: added `width: fit-content; max-width: 100%` — h2 sizes to content width, caps at parent
- Reduced min font sizes: hero `clamp(34px, 10vw, 88px)`, section `clamp(26px, 6vw, 56px)`, cat `clamp(22px, 4vw, 38px)`
- Added `padding-right: 0.05em` on all `em` tags — gives breathing room for the gradient text-fill right edge
- Added `box-sizing: border-box` explicitly to ensure padding is included in width calculations
- Changed `overflow-wrap: anywhere` → `overflow-wrap: break-word` (more compatible)

## Round 3 Fix (FINAL — italic was the root cause)
- **Root cause of right-side em cropping was `font-style: italic`** on all em selectors — italic glyphs in Bebas Neue render with a skew that extends past the text bounding box, getting clipped by `body { overflow-x: hidden }`
- Removed `font-style: italic` from all 3 em selectors in CSS
- Added `em { font-style: normal; }` and `i { font-style: normal; }` to base reset
- All gradient em words (Designer, projects, Consulting, Reveals, Reels, Brand, Trailers, creator, strengths, unforgettable) now render upright

## File Inventory
- `index.html` (25.8 KB) — main page
- `styles.css` (24.5 KB) — all styling
- `script.js` (5.3 KB) — interactivity
- `memory.md` — project facts
- `state.md` — this file
- `CV.pdf` — local resume (referenced by 3 links)
