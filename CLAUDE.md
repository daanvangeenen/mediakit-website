# CLAUDE.md

Context for Claude when working on this project. **Keep this up to date** when you make significant decisions. This file was last fully rewritten to match the cream/black/yellow "Yieldbase" restyle.

## What this project is

A dashboard prototype for **Yieldbase** — a software company (owned by Daan) that turns POS data into insights for bakeries and patisseries in the Netherlands. The demo customer shown throughout the app is **Strik Patisserie**, a fictional patisserie with **4 physical stores** (Ziekerstraat, Heyendaal, Lent, Daalseweg) and a **webshop**.

**Goal of the software:** give bakers visibility into revenue, customer behaviour, returns, and product performance — so they can spot opportunities to grow margin and revenue.

This repo is a **static HTML/CSS/JS prototype** — no build step, no framework, no backend. Deployed via GitHub Pages. It is intentionally tooling-free so Daan can read/edit the files himself one day.

## Who you're working for

**Daan** (`daan@software.nl`). Things to remember:

- **Non-technical** — does not code, does not want to learn. Always implement, never explain implementation unless asked. "Code everything for me. Do not ask for permissions (or as little as possible)."
- **Speaks Dutch.** All UI copy is Dutch (informal "je/jouw"). Conversation is mixed Dutch/English.
- **Iterates fast on UI** — willing to redo layouts. Feedback arrives as short Dutch bullet lists.
- **Two recurring tensions:** "het moet zo simpel mogelijk zijn" (as simple as possible) AND it shouldn't feel "leeg" (empty). Balance: clean structure, generous sizing, no clutter.
- **Doesn't understand browser caching.** He has repeatedly asked "waarom zie ik de wijzigingen niet?" → it's always cache. This is why every CSS/JS reference carries `?v=N`, and why after every push you share the live link with a fresh throwaway query (e.g. `?x=24`).

## Deployment

- **GitHub repo:** https://github.com/daanvangeenen/mediakit-website
- **Live URL:** https://daanvangeenen.github.io/mediakit-website/
- **GitHub Pages** serves `main` branch, root path. Builds automatically ~30–60s after push.
- `gh` CLI is installed and authenticated as `daanvangeenen`. `gh auth setup-git` is configured so `git push` works without prompting.

### Git commit convention used here

Commits use explicit author flags (not global git config), plain `-m` messages, no Co-Authored-By trailer:

```bash
git add -A
git -c user.email="daan@local" -c user.name="Daan" commit -m "..."
git push
```

**Don't commit unless asked** — but in practice Daan expects changes pushed so he can see them live, and has told me "do not ask for permissions". When a change is clearly the deliverable, commit + push and then hand over the link.

### Cache-busting — MUST do on every change

Every `<link>` and `<script>` references files with a `?v=N` query string, identical across all pages. **Bump `N` everywhere whenever you touch any shared/cross-page file (`styles.css`, `app.js`, `auth.js`).** Bump it on every page even for an HTML-only change, to keep them in lockstep.

Current version: **`v=24`**.

One-liner to bump every HTML file:

```bash
for f in *.html; do sed -i '' 's/?v=23/?v=24/g' "$f"; done
```

After pushing, give Daan the URL with a *separate* throwaway query (e.g. `.../index.html?x=24`) so his browser doesn't serve the cached HTML document itself.

## Folder structure

```
mediakit-website/
├── index.html               Dashboard — landing page after login
├── login.html               Yieldbase-branded login screen
├── omzet.html               Omzet (revenue) detail page
├── klanten.html             Aantal klanten (customer count) detail page
├── besteding.html           Besteding per klant (avg spend per customer) detail
├── retouren.html            Retouren (returns) detail page
├── analyses.html            Analyses landing — 2×2 grid of insight cards
├── analyse-uitverkocht.html "Wanneer is mijn product uitverkocht?" deep-dive
├── app.js                   Dashboard logic — store switching, KPI + hero rendering
├── auth.js                  Client-side auth — login form, logout dropdown, guard
├── styles.css               ALL styles, shared across every page
├── README.md                Short readme
├── CLAUDE.md                This file
└── .gitignore
```

No build step. Open `index.html` directly, or `python3 -m http.server 8000`.

There is **no shared HTML template** — the sidebar, head, fonts, and auth guard are duplicated in every page. When you change one of those, change it in **every** page.

## Pages

### `login.html` — Yieldbase gate
- Split-screen: left = **Yieldbase brand panel** (dark slate `#0f172a` with emerald radial glows), right = login form.
- **Yieldbase branding lives ONLY here.** Once logged in, the app is Strik-Patisserie-facing.
- Wordmark: `YIELDBASE` (Inter 700, letter-spaced). Tagline + subtagline in white/slate.
- **No visible demo credentials** (the hint was removed at Daan's request).
- Inverse auth guard: if already logged in, redirects to `index.html`.

### `index.html` — Dashboard (landing after login)
Top to bottom:
1. **Topbar:** `Dashboard` title + a white **`.client-pill` "Strik Patisserie"** chip beside it; subtitle "Inzicht in prestaties van je winkels"; on the right a date picker (`14 apr – 20 apr 2025`) + Dag/Week/Maand/YTD toggle (Week active).
2. **Store tabs** (`.store-tabs.compact`): 5 equal cells — `Totaal | Ziekerstraat | Heyendaal | Lent | Daalseweg`. Active = dark background. (Webshop is folded into Totaal, not selectable.)
3. **`.hero-row`** — two side-by-side cards:
   - **`.hero-insight`** (light card): "Hallo Daan," (Playfair greeting) + an intro line that adapts per store + 4 bullets summarising KPIs + a closing line ("Klik op een van de blokjes hieronder…").
   - **`.hero-attention`** (dark card): title **"Je top 3 aandachtspunten van deze week"**, then **3 numbered items** (`.attention-item` with a yellow circular `.attention-item-num` badge 1/2/3 + `.attention-item-body`). Items carry `.high/.medium/.low` for the coloured left border (red/yellow/green). Bottom CTA "Bekijk alle analyses →" links to `analyses.html`.
4. **4 KPI cards** (`.kpi-card.kpi-link`, all clickable):
   - **Omzet** → `omzet.html`
   - **Aantal klanten** → `klanten.html`
   - **Besteding per klant** → `besteding.html`
   - **Retouren** → `retouren.html`

Logic lives in `app.js` (see "Store-switching" below).

### `omzet.html` — Revenue detail
- Back-link, topbar (date picker + period toggle), **store tabs** (page-local state, does NOT sync with dashboard).
- **Hero number** `€ 67.450` + green/red delta pill.
- **CTA banner** (dark gradient) sits **between the hero number and the chart** — "Wil je verder uitzoeken waar mogelijkheden liggen tot meer omzet?" with button to analyses.
- **Line chart** "Omzet per dag" — this week (solid dark `#14181b`) vs. last year (grey dashed), yellow area fill `rgba(245,212,78,0.30)`. Chart.js.
- **Top 10 producten** table, scaled per store by ratio.

### `klanten.html` — Customer count detail
- Hero `4.895` + delta; line chart (klanten per dag); **peak-hours table** (07:00–18:00, sorted by visitors desc, with rank, count, % of week, bar).

### `besteding.html` — Average spend detail
- Hero `€ 13,78` + delta; line chart (gem. besteding per dag, € axis); **hours table sorted by highest avg spend** with % diff vs weekly avg. Insight: 14:00–15:00 highest (cake/special orders), early morning lowest (bread runs).

### `retouren.html` — Returns detail
- Hero `€ 482` + delta; line chart (retour-waarde per dag); **top retour products table** (stuks, waarde, % of returns, meest voorkomende reden). Insight: one un-collected slagroomtaart can be the biggest single cost.

### `analyses.html` — Analyses landing
- **No store tabs** (removed per request). A 2×2 grid of insight cards:
  - **Top-left — "Hoe haal ik meer omzet?"** text-led, 4 bullets incl. Nougatine-taart in Ziekerstraat vs Daalseweg (shelf position?) and lower transaction value 09:00–12:00.
  - **Top-right — "Welke productmarges staan onder druk?"** Tompouce / Slagroomtaart / Eclair with declining margins.
  - **Bottom-left — "Hoe gaat het met retouren?"** framed around kostprijs (accept high-costprice returns less readily).
  - **Bottom-right — "Wanneer is mijn product uitverkocht?"** → `analyse-uitverkocht.html`.
- Big standalone numbers were removed from cards 2/3/4 at Daan's request.

### `analyse-uitverkocht.html` — Uitverkocht deep-dive
- Store tabs + period toggle (**default Maand**), top-10 table with urgency bars (which products sell out, how early).

## Design system (current = cream / black / yellow, Crextio-style)

The app was restyled away from the original wine/red look to a soft cream background with near-black text and a buttery-yellow accent.

### Colors — `styles.css :root`

| Variable | Value | Use |
|---|---|---|
| `--cream` | `#f5edd9` | Main page background |
| `--cream-light` | `#faf3e0` | Subtle off-cream inner sections |
| `--cream-soft` | `#fdf8ea` | Softest cream (cards) |
| `--wine` | `#14181b` | **Near-black** primary action/accent (name kept for back-compat — it is NOT wine anymore) |
| `--wine-deep` | `#000000` | Darkest / hover |
| `--wine-soft` | `#fdf3c1` | Yellow-soft badge backgrounds |
| `--wine-border` | `#f0d460` | Mid-yellow borders |
| `--accent` | `#f5d44e` | Accent yellow (buttons, number badges, chart fill) |
| `--accent-soft` | `#fae987` | Lighter yellow |
| `--text` | `#14181b` | Body text |
| `--text-soft` | `#6b6b6b` | Secondary text/labels |
| `--text-on-dark` | `#f5edd9` | Cream text on dark cards |
| `--line` | `rgba(20,24,27,0.08)` | Borders |
| `--line-soft` | `rgba(20,24,27,0.04)` | Faint borders |
| `--green` | `#16a34a` | Positive deltas |
| `--sidebar-text` | `#4b4b4b` | Sidebar nav text |
| `--sidebar-text-soft` | `#9a9a9a` | Muted sidebar text |

Negative deltas use a literal red (`#dc2626`-ish / `#c0392b`). Dark cards (like `.hero-attention`) use white text with translucency.

**Login panel only** (`#0f172a` slate with emerald glows `#34d399`/`#6ee7b7`) — this is Yieldbase's own brand and is deliberately different from the in-app theme.

### Typography
Loaded in every page `<head>`: **Inter** (400–700) and **Playfair Display** (500–700).
- **Inter** is the workhorse — nearly everything: nav, body, labels, buttons, KPI values, page titles, wordmark.
- **Playfair Display** survives in only two spots after the restyle: the dashboard greeting **"Hallo Daan,"** (`.insight-greeting`) and the login **`.login-tagline`**. Don't reach for Playfair elsewhere without checking with Daan.

### Layout
- App is a 2-column grid: **`220px sidebar | 1fr main`**.
- Sidebar is cream-matching (not dark): `YIELDBASE` wordmark + a **3-bar logo mark** (ascending bars in grey→dark `#9a9a9a / #4b4b4b / #14181b`), the nav, and a user chip at the bottom.
- Main content flows vertically (flex column) with generous gaps.
- KPI cards: `repeat(4, 1fr)`. Store tabs: `repeat(5, 1fr)`. Hero row: insight + attention side by side.
- Cards: `border-radius ~14–18px`, `1px solid var(--line)`, light backgrounds; hover lifts ~3px with a soft shadow.
- **Responsive:** media queries collapse the grids on narrower screens (Daan reported the site was too small on another computer, so responsiveness matters — test it).

### Key components / classes
- `.client-pill` — white chip next to a page title showing "Strik Patisserie".
- `.store-tabs` / `.store-tab` — equal-width grid, vertical icon + label; `.active` = dark fill.
- `.hero-row`, `.hero-insight`, `.hero-attention` — the dashboard's two top cards.
- `.attention-item` (`.high/.medium/.low`), `.attention-item-num` (yellow numbered circle), `.attention-item-body`, `.attention-cta`.
- `.kpi-card` / `.kpi-card.kpi-link` / `.kpi-arrow` / `.kpi-value`.
- `.omzet-hero` / `.omzet-hero-value` / `.omzet-hero-delta.up|.down` — big-number block reused on every detail page.
- `.cta-banner` — dark gradient CTA (on omzet.html, between hero number and chart).
- `.card`, `.table` (`.num`, `.num.up/.down`, `.rank-top`), `.hour-bar-track` / `.hour-bar-fill`.
- `.user-menu` / `.user-dropdown` — sidebar logout. `.back-link` — "← Terug naar dashboard".

## Sidebar navigation (current)
Identical on every logged-in page. Order:
1. **Dashboard** → `index.html`
2. **Analyses** → `analyses.html`
3. **Recepturen** → `#` (placeholder)
4. **Rapportages** → `#` (placeholder)
5. **Instellingen** → `#` (placeholder)

(Older "Analyse omzet" / "Assortiment" items are gone.) When adding a nav item, add it to **all** logged-in pages — there's no shared template.

## Data conventions
All data is **fictitious** but calibrated so per-store numbers sum to the Totaal (Totaal is the source of truth).

### Reference week: **14 apr – 20 apr 2025** vs **15 apr – 21 apr 2024**

| Winkel | Omzet | Klanten | Retouren |
|---|---|---|---|
| Ziekerstraat | € 19.420 (+7,4%) | 1.410 (+5,9%) | € 138 (+3,8%) |
| Heyendaal | € 16.110 (+4,1%) | 1.200 (+3,5%) | € 115 (+5,2%) |
| Lent | € 12.860 (+9,2%) | 925 (+6,8%) | € 92 (+4,1%) |
| Daalseweg | € 9.850 (−1,3%) | 720 (−1,0%) | € 71 (+2,9%) |
| **Webshop** (in Totaal only) | € 9.210 (+12,3%) | 640 (+10,2%) | € 66 (+6,1%) |
| **Totaal** | **€ 67.450 (+6,8%)** | **4.895 (+5,6%)** | **€ 482 (+4,2%)** |

Besteding per klant (weighted avg): 67.450 / 4.895 = **€ 13,78 (+1,1%)**.
Per-store besteding: Ziekerstraat €13,77 · Heyendaal €13,43 · Lent €13,90 · Daalseweg €13,68.

**Store ratios for scaling** (omzet/klanten/retouren share): Ziekerstraat 28,8% · Heyendaal 23,9% · Lent 19,1% · Daalseweg 14,6% · Webshop 13,7% (Totaal only).

- **Daily pattern:** Saturday busiest (~21% of week), Sunday slowest, weekdays rise from Monday.
- **Hourly klanten:** open 07:00–18:00; peaks at 09:00–11:00 (highest) and 12:00–14:00, tapering after 15:00.
- **Hourly besteding:** inverse — highest 14:00–15:00 (~€16,40, cakes/special orders), lowest 07:00–08:00 (~€10,20, bread runs).
- **Top 10 products (omzet.html):** Strikgebakje, Slagroomtaart 8p, Bruin desem, Tompouce, Croissant, Appelflap, Wit casino, Eclair, Bonbondoos 9 st., Worstenbroodje.
- **Top retour products (retouren.html):** Slagroomtaart 8p, Tompouce, Bruin desem, Strikgebakje, Worstenbroodje, Croissant, Bonbondoos, Wit casino, Appelflap, Eclair — each with stuks, waarde, reden ("Niet opgehaald", "Te zacht / niet vers", "Verkeerd brood").

## Auth (demo only — NOT real security)
Disclosed to Daan. When real users arrive, swap for a backend.
- **Credentials:** `daan@software.nl` / `daan123` (hardcoded in `auth.js`, visible to anyone — no real secrets are stored).
- **Storage:** `localStorage` key `strik_auth` → `{email, ts}`.
- **Guard:** inline `<script>` in every protected page `<head>` redirects to `login.html` before render if not authenticated:
  ```js
  (function(){ try {
    var raw = localStorage.getItem('strik_auth');
    if (!raw || JSON.parse(raw).email !== 'daan@software.nl') window.location.replace('login.html');
  } catch(e){ window.location.replace('login.html'); } })();
  ```
- **Logout:** user chip in sidebar bottom → dropdown "Uitloggen" → clears localStorage → back to login.
- **Dev unlock:** in console `localStorage.setItem('strik_auth', JSON.stringify({email:'daan@software.nl'}))` then refresh.

## How store-switching works
- **Detail pages** (`omzet`, `klanten`, `besteding`, `retouren`, `analyse-uitverkocht`) are self-contained: each ships its own `STORES` data object inline, a Chart.js chart, and a `renderStore(key)` that updates the hero number/delta, calls `chart.update()`, re-renders the page's table, and toggles `.active`. Initial state is always `totaal`. Page-local — does not sync with the dashboard's selection.
- **Dashboard** uses a separate `STORES` object in `app.js` that adds, per store, the hero intro line + 4 bullets + closing, alongside the 4 KPI values.

## Style preferences (don't deviate without asking)
- **Dutch number format:** `€ 67.450` (dot = thousands), `€ 13,78` (comma = decimal). Use `toLocaleString('nl-NL')` or manual replace.
- **Deltas:** `↑ +X,Y%` green / `↓ −X,Y%` red.
- **Headings sentence-case Dutch** ("Omzet per dag", not Title Case).
- **No emoji in UI** unless explicitly requested.
- **Subtle hover motion** — cards lift ~3px with a soft shadow.
- Keep it simple but not empty (the perennial balance).

## What's built vs. todo

### Built ✅
- Yieldbase login + client-side auth gate
- Dashboard: store switcher, hero insight (Hallo Daan + bullets), top-3 numbered aandachtspunten, 4 clickable KPI cards
- 4 KPI detail pages (Omzet / Klanten / Besteding / Retouren) — store tabs, hero number, line chart vs last year, page-specific table
- Analyses landing (2×2 cards) + the "uitverkocht" deep-dive
- Cream/black/yellow restyle, Yieldbase + Strik Patisserie branding, responsive passes
- Logout flow

### TODO (mentioned, not built)
- Recepturen, Rapportages, Instellingen pages (nav placeholders only)
- Detail content behind the other 3 analyses cards (margins, retouren, meer omzet) — only "uitverkocht" is a full page
- Real backend auth + real POS data
- Possibly expose Webshop as a 6th selectable tab (currently folded into Totaal)

## When making changes — checklist
1. **Bump `?v=N`** across every HTML file if you touched any shared file (use the `for f in *.html; do sed ...` one-liner).
2. **Match the Dutch tone** — informal, short, conversational.
3. **Per-store numbers must still sum** to Totaal (table above is source of truth).
4. **Sidebar nav must stay in sync** across all logged-in pages (no shared template).
5. **Don't introduce a build step or framework** — intentional, so Daan can edit files himself.
6. **After pushing**, hand Daan the live URL with a fresh throwaway query (`?x=N`) so his browser doesn't serve cached HTML.
