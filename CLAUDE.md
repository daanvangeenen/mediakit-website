# CLAUDE.md

Context for Claude when working on this project. Keep this up to date when you make significant decisions.

## What this project is

A dashboard mockup for **Yield** (the software company — placeholder name) that shows POS-data insights to bakeries and patisseries in the Netherlands. The demo customer is **Strik Patisserie**, a fictional patisserie with 4 physical stores (Ziekenstraat, Heyendaal, Lent, Daalseweg) and a webshop.

**Goal of the software:** give bakers visibility into store revenue, customer behavior, returns, and product performance — so they can spot opportunities to grow margin and revenue.

This repo is a **static HTML/CSS/JS prototype** — no build step, no backend. It's deployed via GitHub Pages.

## Who you're working for

**Daan** (`daan@software.nl`). Important things to remember about him:

- **Non-technical** — does not code, does not want to learn. Always implement, never explain implementation unless asked.
- **Speaks Dutch.** All UI copy is Dutch. Conversation is mixed Dutch/English.
- **Wants minimal permission prompts.** "Code everything for me. Do not ask for permissions (or as little as possible)."
- **Iterates fast on UI** — willing to redo layouts. Feedback comes in short Dutch bullet lists.
- **Two recurring requests:** "het moet zo simpel mogelijk zijn" (must be as simple as possible) AND it shouldn't feel "leeg" (empty). Balance: clean structure, generous sizing, no clutter.
- **Doesn't understand browser caching.** Multiple times asked "why don't I see the changes?" → cache. This is why every CSS/JS reference has `?v=N`.

## Deployment

- **GitHub repo:** https://github.com/daanvangeenen/mediakit-website
- **Live URL:** https://daanvangeenen.github.io/mediakit-website/
- **GitHub Pages** is enabled on `main` branch, root path. Builds automatically on push (~30–60s after push).
- `gh` CLI is installed and authenticated as `daanvangeenen`. `gh auth setup-git` is configured so `git push` works without prompting.

### Git commit convention used here

Commits are created with explicit author flags (not global config):

```bash
git -c user.email="daan@local" -c user.name="Daan" commit -m "..."
```

Plain `-m` messages, no Co-Authored-By trailer in this repo.

### Cache-busting — MUST do on every change

Every `<link>` and `<script>` tag references files with a `?v=N` version query string. **Bump `N` everywhere whenever you modify `styles.css`, `app.js`, `auth.js`, or any file referenced cross-page.** Current version: **`v=9`**.

After a push, also share the live link with a fresh `?something=N` so the browser doesn't serve the cached HTML.

## Folder structure

```
mediakit-website/
├── index.html        Dashboard — landing page after login
├── login.html        Yield-branded login screen
├── omzet.html        Omzet (revenue) detail page
├── klanten.html      Aantal klanten (customer count) detail page
├── besteding.html    Besteding per klant (avg spend per customer) detail
├── retouren.html     Retouren (returns) detail page
├── app.js            Dashboard logic — store switching, KPI rendering, hero text
├── auth.js           Client-side auth — login form, logout dropdown, guard helper
├── styles.css        ALL styles, shared across every page
├── README.md         Short readme
├── CLAUDE.md         This file
└── .gitignore        Standard ignores
```

There is no build step. Open `index.html` in a browser or `python3 -m http.server 8000` — that's it.

## Pages

### 1. `login.html` — Yield-branded gate

- Split-screen: left = Yield brand panel (dark slate), right = login form (cream).
- **Yield branding only here.** Once logged in, everything is Strik Patisserie themed.
- Yield logo = 3 ascending green bars + "YIELD" wordmark.
- Demo hint visible at bottom of form: `daan@software.nl / daan123`.

### 2. `index.html` — Dashboard

Layout top to bottom:
1. **Client banner pill:** `KLANT · Strik Patisserie` (small wine-coloured pill, signals which bakery's data this is)
2. **Topbar:** "Dashboard" title + date picker (`14 apr – 20 apr 2025`) + Dag/Week/Maand/YTD toggle
3. **Store tabs:** 5 equal-width cards in a row — `Totaal | Ziekenstraat | Heyendaal | Lent | Daalseweg`. Active = wine background.
4. **Hero insight panel** (cream background):
   - "Hallo Daan,"
   - Intro line that adapts per store ("Het was een goede week voor de winkels!", "Lent is de grootste stijger van deze week!", etc.)
   - 4 bullets summarizing the KPIs
   - Closing line: "Wil je meer weten over een specifiek onderdeel? Klik op een van de blokjes hieronder."
   - Sparkle badge top-right
5. **4 KPI cards** (all clickable links to detail pages):
   - **Omzet** → `omzet.html` (has "Klik om details te zien" hint with arrow, wine border)
   - **Aantal klanten** → `klanten.html`
   - **Besteding per klant** → `besteding.html`
   - **Retouren** → `retouren.html`
6. **Footer:** comparison period notice + "Wijzig vergelijking in instellingen" link

### 3. `omzet.html` — Revenue detail

Sections in order:
- Client banner, back-link, topbar (with date picker + period toggle)
- **Store tabs** (same 5 tabs, page-local state — does NOT sync with dashboard selection)
- **Hero number:** big `€ 67.450` (Playfair 52px, wine) + green/red delta pill
- **Line chart** "Omzet per dag" — this week (solid wine) vs. last year (grey dashed). Chart.js, line+area gradient.
- **Top 10 producten** table — numbers scale per store by `ratio` (store omzet / total omzet)
- **CTA banner** (wine gradient): "Wil je verder uitzoeken waar mogelijkheden liggen tot meer omzet? Klik dan hier of klik op het tabje 'Analyse omzet' in het menu links." With "Naar Analyse omzet →" button.
- Footer

### 4. `klanten.html` — Customer count detail

- Hero: `4.895` + delta
- Line chart: klanten per dag
- **Peak hours table** — all opening hours 07:00–18:00, sorted by visitor count descending, with:
  - Rank (top 3 in wine)
  - Time block
  - Klanten count (scaled by store ratio)
  - % of weekly total
  - Visual bar (wine gradient)

### 5. `besteding.html` — Average spend per customer detail

- Hero: `€ 13,78` + delta
- Line chart: gemiddelde besteding per dag (€ values, Y-axis in €,XX)
- **Hours table** sorted by **highest avg spend**, with % difference vs weekly average. Insight: middag (14:00–15:00) has highest spend (cake/special orders), vroege ochtend lowest (bread runs).

### 6. `retouren.html` — Returns detail

- Hero: `€ 482` + delta
- Line chart: retour-waarde per dag
- **Top retour products table** — sorted by return value:
  - Stuks retour
  - Waarde retour
  - % of weekly returns
  - Meest voorkomende reden (e.g., "Niet opgehaald", "Te zacht / niet vers", "Verkeerd brood")
- Insight: 1 niet-opgehaalde slagroomtaart can be the largest single cost.

## Design system

### Colors (CSS variables in `styles.css :root`)

**Strik Patisserie (the customer — used everywhere except login):**

| Variable | Value | Use |
|---|---|---|
| `--wine` | `#6e1622` | Primary brand colour, sidebar, accents, value numbers |
| `--wine-deep` | `#5c111c` | Hover states for wine buttons |
| `--wine-soft` | `#f7e9e9` | Light pink for icon circle backgrounds |
| `--wine-border` | `#e9d3d3` | Soft borders on hover |
| `--cream` | `#f7f1ea` | Main page background |
| `--cream-light` | `#fbf6f0` | Card backgrounds (e.g. hero insight, table row hover) |
| `--text` | `#2b1414` | Body text |
| `--text-soft` | `#6b5a5a` | Secondary text, labels |
| `--green` | `#2a8a3e` | Positive deltas |
| (literal) `#c0392b` | red | Negative deltas |
| `--line` | `#ead7d7` | Borders |
| `--sidebar-text` | `#f1d6b8` | Tan on sidebar |

**Yield (only on login.html):**

- Background: `#0f172a` (slate-900)
- Logo bars: `#34d399`, `#6ee7b7`, `#a7f3d0` (emerald gradient)
- Text: `#e2e8f0` headings / `#94a3b8` subtle

### Typography

Google Fonts, loaded in every page's `<head>`:

- **Playfair Display** (500, 600, 700) — serif. Used for: page titles (h1), KPI values, "STRIK" wordmark, card titles, hero greeting, hero/omzet numbers.
- **Inter** (400, 500, 600, 700) — sans-serif. Used for everything else: body text, labels, buttons, nav.

Page title (`.page-title`): 34px Playfair 700.
KPI value (`.kpi-value`): 40px Playfair 700, wine, tight letter-spacing.
Omzet hero number (`.omzet-hero-value`): 52px Playfair 700.

### Layout

- App is a 2-column grid: `220px sidebar | 1fr main`
- Main content uses `padding: 22px 36px 16px` with vertical flow (flex column, gap 18px)
- KPI cards are `grid-template-columns: repeat(4, 1fr)`, gap 16px, min-height 200px
- Store tabs are `grid-template-columns: repeat(5, 1fr)`, gap 12px
- Cards use `border-radius: 14–18px`, `1px solid var(--line)` border, white background

### Components / patterns

- **`.client-banner`** — small wine pill at top of main area showing `KLANT · Strik Patisserie`
- **`.kpi-card`** — base card. `.kpi-card.selected` adds wine border. `.kpi-link` makes it an anchor with hover lift.
- **`.kpi-arrow`** — chevron circle top-right. `.kpi-arrow.filled` = solid wine background.
- **`.kpi-hint`** — the "Klik om details te zien" microcopy (only on Omzet card)
- **`.hero-insight`** — cream-light card with greeting + intro + bullets + closing
- **`.hero-bullets li::before`** — small wine dot as bullet
- **`.store-tabs` / `.store-tab`** — full-width grid, equal cells, vertical icon + label
- **`.omzet-hero`** — big-number block used on every detail page (omzet, klanten, besteding, retouren)
- **`.omzet-hero-delta.up` / `.down`** — pill with green/red delta
- **`.card`** — generic white card with title/sub/content
- **`.table`** — shared table styling, supports `.num`, `.num.up`, `.num.down`, `.rank-top` for top 3 rank
- **`.hour-bar-track` / `.hour-bar-fill`** — small bar visualization in hours tables
- **`.cta-banner`** — wine-gradient CTA section (currently only on omzet.html)
- **`.user-menu` / `.user-dropdown`** — sidebar bottom logout dropdown
- **`.back-link`** — `← Terug naar dashboard` link on detail pages

## Data conventions

All data is **fictitious** but calibrated so per-store numbers sum to the Totaal.

### Reference week: **14 apr – 20 apr 2025** vs. **15 apr – 21 apr 2024**

### Per-store totals (must always sum correctly):

| Winkel | Omzet | Klanten | Retouren |
|---|---|---|---|
| Ziekenstraat | € 19.420 (+7,4%) | 1.410 (+5,9%) | € 138 (+3,8%) |
| Heyendaal | € 16.110 (+4,1%) | 1.200 (+3,5%) | € 115 (+5,2%) |
| Lent | € 12.860 (+9,2%) | 925 (+6,8%) | € 92 (+4,1%) |
| Daalseweg | € 9.850 (−1,3%) | 720 (−1,0%) | € 71 (+2,9%) |
| **Webshop** (in Totaal only) | € 9.210 (+12,3%) | 640 (+10,2%) | € 66 (+6,1%) |
| **Totaal** | **€ 67.450 (+6,8%)** | **4.895 (+5,6%)** | **€ 482 (+4,2%)** |

Besteding per klant (weighted avg): 67.450 / 4.895 = **€ 13,78** (+1,1%)

### Per-store besteding:
- Ziekenstraat €13,77 (+1,4%) · Heyendaal €13,43 (+0,6%) · Lent €13,90 (+2,1%) · Daalseweg €13,68 (−0,3%)

### Store ratios for scaling (omzet/klanten/retouren-aandeel):
- Ziekenstraat 28,8% / Heyendaal 23,9% / Lent 19,1% / Daalseweg 14,6%
- Webshop 13,7% (only contributes to Totaal, never shown standalone)

### Daily distribution pattern:
Saturday is always the busiest day (~21% of the week). Sunday is the slowest. Weekday curve rises gradually from Monday.

### Hourly distribution (klanten, totaal weekly = 4.895):
Bakery curve with three peaks:
- Morning bread + coffee peak: 09:00–11:00 (highest)
- Lunch peak: 12:00–14:00
- Afternoon: tapers off after 15:00, closes 18:00
- Opening hours: 07:00–18:00

### Hourly besteding pattern:
Inverse of klanten — highest spend in **14:00–15:00** (cake / special orders, ~€16,40), lowest in **07:00–08:00** (bread runs, ~€10,20).

### Top 10 products (in `omzet.html`):
Strikgebakje, Slagroomtaart 8p, Bruin desem, Tompouce, Croissant, Appelflap, Wit casino, Eclair, Bonbondoos 9 st., Worstenbroodje. Each has aantal, omzet, marge, YoY%.

Per-store views scale aantal + omzet by the store's ratio.

### Top retour products (in `retouren.html`):
Slagroomtaart 8p, Tompouce, Bruin desem, Strikgebakje, Worstenbroodje, Croissant, Bonbondoos, Wit casino, Appelflap, Eclair. Each has stuks, waarde, reden ("Niet opgehaald", "Te zacht", etc.).

## Auth

**Client-side only. NOT real security.** This is disclosed to Daan; when ready for real users we'll add a backend.

- **Credentials:** `daan@software.nl` / `daan123` (hardcoded in `auth.js`)
- **Storage:** `localStorage` key `strik_auth` → `{email, ts}`
- **Guard:** Inline `<script>` in `<head>` of every protected page redirects to `login.html` if not authenticated. Runs before render so there's no flash. Pattern:
  ```js
  (function() {
    try {
      var raw = localStorage.getItem('strik_auth');
      if (!raw || JSON.parse(raw).email !== 'daan@software.nl') {
        window.location.replace('login.html');
      }
    } catch (e) { window.location.replace('login.html'); }
  })();
  ```
- **Inverse guard:** `login.html` redirects to `index.html` if already logged in.
- **Logout:** click the user chip in the sidebar bottom → dropdown with "Uitloggen" → clears localStorage → redirects to login.
- **Manual unlock for dev:** in browser console run `localStorage.setItem('strik_auth', JSON.stringify({email:'daan@software.nl'}))` then refresh.

## Sidebar navigation

Identical across all logged-in pages. Order:

1. **Dashboard** → `index.html`
2. **Analyse omzet** → `#` (placeholder — not built yet, but CTA on omzet.html points here)
3. **Assortiment** → `#`
4. **Recepturen** → `#`
5. **Rapportages** → `#`
6. **Instellingen** → `#`

When adding a new nav item, **add it to every page's sidebar** (index, omzet, klanten, besteding, retouren). There's no shared template — sidebar HTML is duplicated per file.

## How store-switching works (per detail page)

Each detail page (`omzet`, `klanten`, `besteding`, `retouren`) is self-contained: it ships its own `STORES` data object inline in a `<script>` block, plus a Chart.js chart and a `renderStore(key)` function. Clicking a `.store-tab` calls `renderStore(tab.dataset.store)` which:

1. Updates the hero number + delta
2. Calls `chart.update()` with new daily data
3. Re-renders the page-specific table (top products, peak hours, etc.)
4. Toggles `.active` class on the clicked tab

Initial state is always `renderStore('totaal')`.

The **dashboard** (`index.html`) uses a separate `STORES` object in `app.js` that includes the hero intro + bullets + closing per store, in addition to the 4 KPI values.

## Style preferences observed (don't deviate without asking)

- **Numbers always in Dutch format:** `€ 67.450` (dot for thousands), `€ 13,78` (comma for decimal). Use `toLocaleString('nl-NL')` or manual `.replace('.', ',')`.
- **Deltas as `↑ +X,Y%` or `↓ −X,Y%`** with green/red text.
- **Headings sentence-case Dutch** (e.g. "Omzet per dag", not "Omzet Per Dag")
- **No emoji in UI text** unless explicitly requested.
- **Hover states should have subtle motion** — KPI cards lift 3px + soft wine shadow on hover.
- **Use Playfair for "the headline number"** — KPI value, hero value, card title. Inter for everything else.

## What's been built vs. todo

### Built ✅
- Login screen (Yield brand) with client-side auth
- Dashboard with store switcher, hero insight (Hallo Daan + intro + bullets + closing), 4 clickable KPI cards
- 4 detail pages (Omzet, Klanten, Besteding, Retouren), each with: store tabs, hero number, line chart vs. last year, specific table (top products / peak hours / hours by spend / top retour products)
- "Analyse omzet" sidebar item (visual only, doesn't link anywhere yet)
- CTA banner on omzet.html pointing to Analyse omzet
- Logout flow

### TODO (mentioned but not built)
- **Analyse omzet** page (CTA target — should surface opportunities to grow omzet: high-margin underperformers, slow hours, cross-sell suggestions, etc.)
- **Assortiment** page (product catalogue with margin analysis — serves the "welke producten het duurste zijn / waar liggen kansen" goal from the original brief)
- **Recepturen, Rapportages, Instellingen** pages
- **Real backend auth** (Auth0 / Supabase / Firebase) — currently demo gate only
- **Real POS data integration**
- **Webshop** as a 6th selectable tab? Currently it's folded silently into Totaal. Daan may want to expose it later.

## When making changes

1. **Always bump `?v=N`** across every CSS/JS reference if you touched a shared file (styles.css, app.js, auth.js). Use a single replace_all per file.
2. **Match the existing Dutch tone** — informal "je/jouw", short, conversational.
3. **Per-store numbers must still sum** to Totaal after edits. The table in "Per-store totals" above is the source of truth.
4. **Sidebar nav must stay in sync** across all 5 logged-in pages (index, omzet, klanten, besteding, retouren).
5. **Don't commit unless asked.** Daan has been telling me when to push.
6. **Don't introduce a build step or framework.** This is intentionally a no-tooling static site so Daan can read/edit the files himself eventually.
7. **After pushing**, give Daan the live URL with a fresh `?something=N` query so his browser doesn't cache.
