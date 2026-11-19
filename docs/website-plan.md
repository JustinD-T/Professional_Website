# Personal Website Plan: Justin Domagala-Tang

Draft v9, November 19, 2026. Focus: multi-session build protocol (section 19), on top of v8.

**Start here (any agent, any session)**
1. This file is the single source of truth for the site. In the repository it lives at `docs/website-plan.md`; outside the repository, Justin attaches the latest copy.
2. Read section 19.4 (build status) to see where the last session stopped, then follow the session protocol in section 19.1.
3. Take the next open work package in section 19.3, or the one Justin names, and read only the plan sections it lists.
4. Checkpoint after every finished sub-task, and stop cleanly before your context or credits run low: commit, then update sections 19.4 and 19.5. Sections 0 to 11 describe the site; sections 12 to 18 are the build specification.

**[DECIDE]** marks open decisions (section 11). **[CONFIRM]** marks facts to verify before launch (section 9). **[ADD]** marks information only you can supply (used in the section 17 drafts).

**Changes in v9**
- Added the multi-session build protocol: session rules, a `CLAUDE.md` and `AGENTS.md` template, 19 work packages sized for one session each, a build status table, a session log, an open-questions list, and paste-in prompts (section 19).

**Changes in v8**
- The meteor game is built around sub-pixel picking: pixel-integrated rendering, true head positions placed randomly within pixels, auto-zoom on the frozen frame, a magnifier, scaled touch nudging, 0.05 px keyboard steps, and scoring tight enough that only sub-pixel judgement scores well (section 15.3).
- Plate scale set to 80 m per pixel; misses are reported in pixels and metres.
- Planetary defence data confirmed: 2025, JPL APIs, warning time measured from the first observation date (section 15.1).

**Changes in v7**
- Planetary defence replays a real year of close approaches on a loop; visitors click an approaching asteroid to see its details, led by its warning time. This replaces the v6 telescope-beam game (sections 5.3, 15.1).
- Contrail winds lets visitors draw contrails that drift with a steady true wind and correct a biased model field live, starting from two seeded contrails (sections 5.3, 15.2).
- Faint meteors becomes a game: click the meteor's head on a frozen simulated frame and get scored using the plate scale (sections 5.3, 15.3).
- Sims appear on research pages only. The quantum portfolio, hackathons, and other projects stay out of the research and sim section.

**Changes in v6**
- Images now sit in a folder beside each page's markdown file instead of under `public/`, so the build checks that they exist, optimizes them, and Obsidian shows them inline (sections 2.1, 3, 8).
- Each sim is split into a build-safe `meta.ts` (defaults, controls, presets) and a browser-only `sim.ts`. The engine, not each sim, performs preset transitions (sections 5.1, 14).
- Only the featured tile animates on load; small tiles show a still frame until hover or focus, set by `tile_motion` in `site.yaml` (sections 5.2, 7).
- The planetary defence telescope is drawn as a beam from Earth toward the cursor, since a telescope sees a direction on the sky rather than a region of space (section 5.3).
- Tile gestures are hover, tap, or horizontal movement only, so they never trap vertical scrolling on phones. The CubeSat tile now maps horizontal position to inclination (sections 5.3, 14.9).
- Talks and publications use `related:`, which can name a research page or a project. Both lists are now filled in from your records (section 3.2).
- Framework (Astro 6), editing method (no CMS at launch), and typography are adopted as build defaults. The domain stays open and does not block the build (sections 0, 11).
- YAML examples put comments on the line above instead of aligned trailing comments.

---

## 0. Decisions so far

| Decision | Choice |
|---|---|
| Theme | Twilight, dark by default |
| Featured tile | Planetary defence |
| Tagline | "Physics and scientific computing at Western University, working on meteors, near-Earth asteroids, and the atmosphere they pass through." |
| PhD goal in About | Included |
| Internship clause in Currently line | Left out |
| Hero photo | Presenting at the London Contrail Workshop 2026 |
| Research page layout | Pinned sim beside the text that changes preset per section; sim on top with preset chips on mobile |
| Projects | Every project gets its own page |
| Interests and volunteer work | Two home page sections; every entry opens a small page with a photo, a text block, and an optional external link; volunteer pages add a "My role" section. No photo page for now. |
| Framework | Astro 6 (build default, v6) |
| Editing method | Text editor, Obsidian, and GitHub web editor; no CMS at launch |
| Typography | Source Serif 4 for headings and body, Atkinson Hyperlegible Next for interface text and sim labels (build default, v6) |
| Theme scope | Dark only at launch; tokens structured so a light set can be added later |
| Tile motion | Featured tile animates; small tiles show a still until hover or focus |
| Images | Stored beside each page's markdown file |
| Domain | Open; not needed until launch |
| Sim placement | Research pages only; no sims on project pages |
| Planetary defence sim | A looping year of real close approaches; click an asteroid for its warning time |
| Contrail sim | Visitors draw contrails that drift with the true wind and correct a model field |
| Meteor sim | A sub-pixel picking game: click the meteor's head on a zoomed frozen frame, scored in pixels and metres at 80 m per pixel |
| Planetary defence data | 2025, from the JPL Close Approach Data and Small-Body Database APIs; warning time measured from the first observation date |

---

## 1. Maintainability first

This is the most important requirement in the plan. The site must stay easy to update for years without anyone touching layout or simulation code for routine changes.

### 1.1 Rules
1. **All visible text lives in content files** (markdown and YAML), never inside components. If a sentence appears on the site, it can be found under `src/content/`.
2. **One file controls structure:** `src/content/site.yaml` sets nav order, home section order, the featured tile, research order, and which projects show on the home page.
3. **Adding a page means adding one folder** (a markdown file plus its images). Tiles, index rows, the glyph sub-nav, prev/next links, and the sitemap are all generated from content files.
4. **Forgiving defaults.** A page that isn't listed in `site.yaml` still appears (at the end, sorted by date), so forgetting a step never makes a page vanish.
5. **Hide without deleting.** `draft: true` in any page's frontmatter hides it from the live site.
6. **Sims are optional and pluggable.** A research page names a sim in its frontmatter. With no sim, its tile shows an image instead, so new research can go up before any sim is written.
7. **Sim tuning lives in frontmatter.** Counts, speeds, and captions can be changed per page without opening the sim code.
8. **Colors and type live in one file** (`src/styles/tokens.css`); font files are declared once in `astro.config.mjs`. Sims read their colors from the same CSS variables, so a palette change recolors everything at once.
9. **The build checks content.** Content schemas validate every file. A missing required field (like `dates`) or a misspelled sim name stops the build with a readable error message instead of deploying a broken page.
10. **Editing instructions ship with the site.** The repository includes an `EDITING.md` with the recipes in section 8.

### 1.2 Common edits

| I want to... | Edit this | Code needed? |
|---|---|---|
| Change the About text | `content/home/index.md` | No |
| Reorder research pages | `research_order` in `site.yaml` | No |
| Change the featured tile | `featured_research` in `site.yaml` | No |
| Add a research page | New folder in `content/research/` | No (a new sim is optional) |
| Add a sim to a research page | New folder in `src/sims/` (`meta.ts` and `sim.ts`) plus registry lines | Yes, two files |
| Add a project (gets its own page automatically) | New folder in `content/projects/` | No |
| Add a new top-level page (e.g. Photo, Outreach) | New folder in `content/pages/`, add it to `nav` in `site.yaml` | No |
| Add an interest or volunteer role (gets its own small page) | New folder in `content/interests/` or `content/volunteer/` | No |
| Change which sim state a section shows | `presets` in that research page's frontmatter | No |
| Add a talk or publication | `content/talks.yaml` or `content/publications.yaml` | No |
| Update the CV | Replace the PDF (same filename) and edit `content/cv/index.md` | No |
| Change the accent color | One line in `styles/tokens.css` | Minimal |
| Turn small-tile motion on or off | `tile_motion` in `site.yaml` | No |
| Rename a page without breaking old links | Rename its folder, add the old name to `redirect_from` | No |

### 1.3 Ways to edit
- **Any text editor or Obsidian** on the repository, then push. GitHub Actions rebuilds and deploys in about a minute. The `content/` folder can be opened directly as an Obsidian vault, and because images sit beside each page with relative links, they display inside Obsidian too.
- **GitHub's web editor** for quick fixes from any device: edit a file in the browser, commit, and the site redeploys.
- **Optional later:** a git-based CMS (such as Pages CMS) that gives form-style editing on top of the same files. Only worth adding if markdown editing becomes a chore; not planned for launch (section 0).

### 1.4 Acceptance tests (run before launch)
- Add a dummy research page as a folder holding only a markdown file and one image. It appears as a tile (if within the home grid count), an index row, a glyph, and in the prev/next chain, with zero code edits.
- Reorder research by editing only `research_order`.
- Change the featured tile by editing one line.
- Search for any sentence on the live site and find it under `src/content/`.
- Remove a required field from a page and confirm the build fails with a clear message.
- Replace the CV PDF and confirm the page updates.

---

## 2. Content architecture

### 2.1 Folder structure
```
src/
	content.config.ts
	content/
		site.yaml
		publications.yaml
		talks.yaml
		research-intro.md
		home/
			index.md
			hero.jpg
		cv/
			index.md
		research/
			planetary-defence/
				index.md
				still.png
				sky-plot.png
			contrails/
			subradiance/
			meteors/
			cubesat/
		projects/
			quantum-portfolio/
				index.md
				thumb.png
				hero.png
			hackathons/
			sx70-timer/
			photo-site/
			this-website/
		interests/
			film-photography/
			portaging/
		volunteer/
			science-soph/
			cfs/
			vsa/
			peer-leaders/
		pages/
	sims/
		engine.ts
		index.ts
		types.ts
		pha/
			meta.ts
			sim.ts
			data/
		contrails/
		meteors/
		subradiance/
		cubesat/
			meta.ts
			sim.ts
			data/coast.json
			data/stations.json
	lib/
		loaders.ts
		ordering.ts
		validate.ts
	layouts/
		ResearchPage.astro
		ProjectPage.astro
		SmallPage.astro
		Page.astro
	components/
		Nav.astro
		Tile.astro
		SimHost.astro
		SimControls.astro
		GlyphNav.astro
		Footer.astro
		glyphs/
	pages/
	styles/
		tokens.css
public/
	cv/justin-domagala-tang-cv.pdf
	og/
scripts/
	og.ts
tests/
EDITING.md
astro.config.mjs
.github/workflows/deploy.yml
```

Every folder under `content/` (other than the YAML files and `research-intro.md`) is one page: an `index.md` plus the images it uses, linked with relative paths such as `./still.png`. Collapsed folders above follow the same pattern as the expanded ones. `public/` keeps only files that need a fixed URL: the CV PDF and the generated link-preview images.

### 2.2 `site.yaml` (the one structural file)
YAML requires spaces for indentation (tabs are not allowed), so this file uses two spaces.

```yaml
title: Justin Domagala-Tang
tagline: Physics and scientific computing at Western University, working on meteors, near-Earth asteroids, and the atmosphere they pass through.
# Bolded automatically in publication author lists
highlight_name: Domagala-Tang

# Top bar, in this order
nav:
  - research
  - projects
  - cv

# Home page sections, in this order
home_sections:
  - about
  - research_grid
  - projects
  - interests
  - volunteer

featured_research: planetary-defence
# Number of small tiles under the featured one
home_grid_count: 4
# featured_only, all, or none
tile_motion: featured_only

# Drives the prev/next chain, glyph nav, research index, and home grid
research_order:
  - planetary-defence
  - contrails
  - subradiance
  - meteors
  - cubesat

# Rows shown on the home page
home_projects:
  - quantum-portfolio
  - hackathons
  - sx70-timer

# Unlisted projects follow, newest first
projects_order:
  - quantum-portfolio
  - hackathons
  - sx70-timer
  - photo-site
  - this-website

# Unlisted entries follow alphabetically
interests_order:
  - film-photography
  - portaging

volunteer_order:
  - science-soph
  - cfs
  - vsa
  - peer-leaders

contact:
  email: jdomaga2@uwo.ca
  linkedin: https://linkedin.com/in/justind-t
  github: https://github.com/JustinD-T
```

Because `home_grid_count` caps the home grid, the home page and top nav stay concise no matter how many research pages are added; extra pages live on the research index.

### 2.3 Page types
Every page uses one of five formats:

| Type | Source | Layout | URL |
|---|---|---|---|
| Research page | `content/research/<slug>/index.md` | `ResearchPage` | `/research/<slug>` |
| Project | `content/projects/<slug>/index.md` | `ProjectPage` for every project, plus a row on `/projects` | `/projects/<slug>` |
| Interest or volunteer page | `content/interests/<slug>/index.md`, `content/volunteer/<slug>/index.md` | `SmallPage` (role section only on volunteer pages), plus a row on the home page | `/interests/<slug>`, `/volunteer/<slug>` |
| Generic page | `content/pages/<slug>/index.md` | `Page` (simple prose) | `/<slug>` |
| Special pages | `home/index.md`, `cv/index.md` | Dedicated layouts | `/`, `/cv` |

Generic pages cover anything future (a photo page, Outreach, Teaching, Talks) without new layout work.

---

## 3. Subpage formats

### 3.1 Research page (pinned sim, section-synced)

**Desktop layout**
```
+------------------------------------------------------------+
| Top bar                                                    |
| Glyph sub-nav: five icons, current one highlighted         |
| Title                                                      |
| Role / institution / dates / supervisors                   |
+----------------------------+-------------------------------+
| The question               |                               |
|   (preset: baseline)       |   PINNED SIM                  |
| What I built    [figure]   |   stays in view while the     |
|   (preset: method)         |   text scrolls; switches      |
| Result                     |   preset as each section      |
|   (preset: result)         |   enters view                 |
| Progress log (optional)    |   [controls row]              |
| Outputs                    |   [Reset view]                |
+----------------------------+-------------------------------+
| < previous project                     next project >      |
+------------------------------------------------------------+
```
The text column takes about 45% of the width (keeping lines near 65 characters); the sim column takes about 55%.

**Mobile layout (fallback)**
- The sim sits at the top of the page (not pinned), followed by the text.
- A row of preset chips under the sim, labelled with the section names, lets phone visitors see each state with a tap.

**How the scroll sync works**
1. Each body section heading is watched as the visitor scrolls.
2. When a section reaches the upper third of the screen, the sim eases into that section's preset over about half a second.
3. If the visitor drags, clicks, or moves a control, they take over: presets stop switching until they scroll into a different section or press "Reset view."
4. Scrolling back up re-applies earlier presets, so the page reads the same in both directions.
5. Sections without a preset leave the sim as it is.
6. Reduced motion: presets switch instantly and the sim shows still frames.

**Writing rules (keeps pages consistent)**
- The question: 2 to 3 sentences, plain language.
- What I built: up to two short paragraphs and up to two figures.
- Result: 1 to 3 sentences with the headline numbers.
- Outputs are generated: any talk or publication in the YAML files tagged with this page's slug appears automatically.

**Frontmatter template** (planetary defence shown)
```yaml
---
title: Planetary defence
# Used on tiles and in the glyph tooltip
short_title: Planetary defence
summary: Measuring how much warning we get before newly discovered near-Earth asteroids make their closest approach.
role: Undergraduate Researcher, Scholars Electives research project
institution: Western University, Department of Physics and Astronomy
dates: September 2026 to present
# Used for sorting pages not listed in research_order
date_start: 2026-09
supervisors: [Prof. Paul Wiegert]
# Icon name from the glyph set (section 12.2)
glyph: planet
draft: false
# Old folder names that should redirect here after a rename
redirect_from: []

tile:
  caption: How much warning do we get?
  # null shows the sim's live counter instead
  result: null
  sim: pha
  sim_options:
    max_miss_ld: 5
  fallback_image: ./still.png
  alt: Earth at the centre of a dark field, with a year of real near-Earth asteroid close approaches drawn as dots tracing paths past it.

page_sim:
  sim: pha
  controls: [playing, time_speed, max_miss_ld, view_radius_ld, show_glare]
  # Section heading: preset name
  presets:
    The question: year
    What I'm building: discovery
    Result: warning
---

## The question
...

## What I'm building
...

## Result
...

## Progress log
- Month Year: one-line milestone
```

Keys under `presets` must match the section headings exactly, and preset names must exist in the sim; either mistake stops the build with a message naming the heading or preset. Body headings render in the order written, so a page can add an extra section (for example "Field work") and optionally give it a preset.

### 3.2 Research index (`/research`)
- One-sentence intro from `content/research-intro.md`.
- One row per research page in `research_order`: tile still on the left, title, dates, and a 2 to 3 sentence summary (`summary` field in frontmatter) on the right.
- Publications from `publications.yaml`, talks from `talks.yaml`.

`related` names a research page or a project; the entry then also appears on that page. Titles containing a colon must be quoted, or YAML misreads them.

```yaml
# talks.yaml, newest first
- event: Asteroids, Comets, and Meteors 2026
  location: Poznań, Poland
  year: 2026
  related: meteors
  award: null
- event: London Contrail Workshop 2026
  location: London, UK
  year: 2026
  related: contrails
  award: null
- event: Global Meteor Network Annual Meeting 2026
  year: 2026
  # [CONFIRM] meteors or contrails
  related: meteors
  award: null
- event: Physics Undergraduate Research Conference (PhUnC) 2026
  year: 2026
  related: subradiance
  award: 2nd place
- event: Western Student Research Conference 2026
  year: 2026
  related: subradiance
  award: 3rd place
- event: Research Opportunities in Physics, Fall 2026
  year: 2026
  # [CONFIRM] which project
  related: null
  award: null
- event: Western Meteor Group NASA Day 2025
  year: 2025
  related: meteors
  award: null
- event: USRI Research Conference 2025
  year: 2025
  related: meteors
  award: null
- event: Western Quantum Innovation Showcase 2025
  year: 2025
  # [CONFIRM] that this was the quantum portfolio project
  related: quantum-portfolio
  award: null
- event: Physics Undergraduate Research Conference (PhUnC) 2025
  year: 2025
  # [CONFIRM] which project
  related: null
  award: null
```

```yaml
# publications.yaml
# status: published, accepted, in review, submitted, in preparation, or in development
- authors: Domagala-Tang, J., Vida, D., Brown, P., Vovk, M.
  title: Development of an automated very faint meteor analysis algorithm applied to EMCCD sensor measurements
  venue: Journal of Experimental Astronomy
  # [CONFIRM] in preparation or in review at launch
  status: in preparation
  related: meteors
  hidden: false
- authors: Vovk, M., Brown, P., Vida, D., Campbell-Brown, M., Aubry, B., Domagala-Tang, J.
  title: "A new entry model for iron meteoroids: observational signatures and the I-type micrometeorite link"
  venue: JGR Planets
  status: in review
  related: meteors
  hidden: false
- authors: Vovk, M., Brown, P., Vida, D., Lee, C., Domagala-Tang, J., Harmos, R.
  title: "Physical properties of sporadic meteoroids: insights into the dominant source of satellite impacts"
  venue: null
  status: in development
  related: meteors
  # Recommended hidden until submitted
  hidden: true
```

CAP 2025 stays out of `talks.yaml` until confirmed.

### 3.3 Projects list and project pages (`/projects`)

**List:** one row per project in `projects_order`: thumbnail, title, one line, tags. The whole row links to the project's page. If the project has a looping preview, it plays on hover.

**Project page (case-file layout)**
```
+------------------------------------------------------------+
| Title                                                      |
| One-line summary                                           |
+-------------------+----------------------------------------+
| Facts             | Hero image, gallery, or looping video  |
|  Context and role |                                        |
|  Dates            | Overview                               |
|  Tools (tags)     | What I did                             |
|  Links            | Outcome                                |
+-------------------+----------------------------------------+
| All projects                               next project >  |
+------------------------------------------------------------+
```
- The facts panel is generated from frontmatter; on mobile it moves above the body.
- No sims on project pages. Media is one image, a gallery of up to four, or a muted looping video (paused under reduced motion).
- Writing rules: Overview (2 to 3 sentences), What I did (1 to 2 paragraphs), Outcome (1 to 3 sentences).
- A page with only frontmatter still renders, but aim for at least one image and two short paragraphs before publishing; keep `draft: true` until then.
- Hackathons stays one page with a subsection per event, since each event alone would be thin.

```yaml
---
title: Quantum portfolio optimization
one_line: Formulated ETF portfolio selection as QUBO problems and benchmarked quantum against classical solvers.
context: Western Quantum Computing Club
role: Quantum Developer
dates: September 2024 to April 2025
date_start: 2024-09
tags: [D-Wave Ocean, Qiskit, optimization]
thumbnail: ./thumb.png
thumbnail_alt: Describe the thumbnail for screen readers
media:
  # image, gallery, or video
  type: image
  src: ./hero.png
  alt: Describe the image for screen readers
# Optional muted loop shown on hover in the projects list
preview: null
links:
  code: null
  demo: null
  paper: null
draft: false
redirect_from: []
---

## Overview
...

## What I did
...

## Outcome
...
```

### 3.4 CV (`/cv`)
- `cv/index.md` frontmatter: `pdf` path and `last_updated`. Body: short summary of Education, Research positions, and Awards.
- Embedded PDF plus a "Download CV" button.
- Updating means replacing the PDF with the same filename and bumping `last_updated`.
- The public PDF is a **web version without phone number or street address**, and leaves GPA off.

### 3.5 Interests and volunteer work

**On the home page:** two short sections, each a list of rows linking to a small page.
- Interests row: title and one-line description.
- Volunteer row: role, organization, and dates.

**Interest page**
```
+------------------------------------------------------------+
| Title                                                      |
| [ photo, 3:2 ]                                             |
| caption (optional)                                         |
| Text block (1 to 3 short paragraphs)                       |
| [ Visit justindtphoto.com ]  (external link, optional)     |
| < Home                                   next interest >   |
+------------------------------------------------------------+
```

**Volunteer page**
```
+------------------------------------------------------------+
| Title                                                      |
| Organization                                               |
| [ photo, 3:2 ]                                             |
| Text block: what the organization does, why you joined     |
| My role                                                    |
|   Role title, dates                                        |
|   2 to 4 responsibility bullets                            |
| [ Visit organization site ]  (external link, optional)     |
| < Home                                       next role >   |
+------------------------------------------------------------+
```

**One layout for both:** `SmallPage` shows the "My role" section only when the file has a `role` field, and the link button only when `link.url` is set. Prev/next links follow `interests_order` or `volunteer_order`.

**Writing rules**
- Text block: 1 to 3 short paragraphs. On volunteer pages it explains the organization and why you joined; what you did goes in the role section.
- Role section: role title, dates, and 2 to 4 responsibility bullets (present tense for current roles).
- Photo: one landscape image (3:2) with alt text; caption optional.

**Interest template**
```yaml
---
title: Film photography
one_line: 35mm and large format film, printed in the darkroom.
photo: ./hero.jpg
photo_alt: Describe the photo for screen readers
photo_caption: null
link:
  label: Visit justindtphoto.com
  url: https://justindtphoto.com
draft: false
---

Text block goes here.
```

**Volunteer template**
```yaml
---
title: Science Soph
organization: Faculty of Science Soph Team, USC Orientation Program
one_line: Orientation leader for incoming first-year science students.
role:
  title: Science Soph
  dates: May 2026 to present
  responsibilities:
    - Guide first-year students through their academic and social transition to Western during O-Week.
    - Promote safety and participation in orientation events.
    - Connect students with campus resources and act as an upper-year role model.
photo: ./hero.jpg
photo_alt: Describe the photo for screen readers
photo_caption: null
link:
  label: Visit the Soph program
  # [CONFIRM]
  url: null
draft: false
---

Text block goes here.
```

**Starting entries**

| Section | Entry | Role and dates | Link |
|---|---|---|---|
| Interests | Film photography | n/a | justindtphoto.com |
| Interests | Portaging | n/a | None (trip photo only) |
| Volunteer | Science Soph (USC Orientation Program) | Science Soph, May 2026 to present | **[CONFIRM]** |
| Volunteer | CAISA Fashion Show | Director of Photography (Photography Exec 2025-26), September 2025 to present; leads a five-person photo team for a show that has raised $440,000+ for Children's Health Foundation | **[CONFIRM]** website or Instagram |
| Volunteer | Vietnamese Students' Association | VP External Affairs **[CONFIRM: VP or Co-VP]**, September 2025 to present; finds and manages sponsorships | **[CONFIRM]** |
| Volunteer | Western Peer Leaders | Scholars Electives Mentor, 2025 to present **[CONFIRM start month]** | **[CONFIRM]** |

Adding a photo page later is one generic page plus one `nav` entry in `site.yaml`.

### 3.6 Generic page (`content/pages/<slug>/index.md`)
- Frontmatter: `title`, optional `subtitle`, `draft`.
- Body: markdown with images and figures.
- Appears in the top nav only if its slug is added to `nav` in `site.yaml`; otherwise it's reachable by link only.

---

## 4. Research page content

Header fields and section outlines for each page. First-draft copy for every page, ready to paste into each `index.md`, is in section 17.

### 4.1 Planetary defence (featured)
- **Header:** Undergraduate Researcher (Scholars Electives research project), Western University, Department of Physics and Astronomy. September 2026 to present. Supervisor: Prof. Paul Wiegert.
- **Question:** How much warning do we get before a newly discovered near-Earth asteroid makes its closest approach, and how does that depend on where it comes from in the sky?
- **What I'm building:** an empirical study using the real Minor Planet Center NEA catalogue and JPL Close Approach Database. Planned analyses: discovery before vs. after closest approach; sky-position plots coloured by warning time; back-propagating orbits to find when each object first became plausibly visible vs. when it was discovered.
- **Result:** in progress; the progress log carries the page until results arrive.
- **Figures:** a sky-position plot once available.

### 4.2 Contrail winds
- **Header:** Mitacs Globalink Visiting Researcher, TU Delft, Faculty of Aerospace Engineering. April to August 2026. Supervisors: Dr. Vincent Meijer and Dr. Denis Vida.
- **Question:** Reanalysis winds (ERA5) are imperfect at cruise altitude. Can ground-based camera observations of contrails, which drift with the wind, correct them?
- **What I built:** installed a contrail detection camera at the NEOSAT Lab; built a Gaussian process model treating ERA5 wind bias as a latent field across space, altitude, and time, with Global Meteor Network contrail observations as path-averaged constraints; tools for contrail tracking, robust fitting, and camera pixel-to-coordinate projection.
- **Result:** walk-forward validation RMSE of 1.84 m/s vs. 2.50 m/s for ERA5, removing about 60% of the error above the measurement noise floor; bias reduced from +0.65 to +0.10 m/s.
- **Outputs:** London Contrail Workshop 2026.
- **Figures:** the camera at NEOSAT Lab; a wind-correction figure from your slides.

### 4.3 Quantum subradiance
- **Header:** Undergraduate Researcher, Submillimetre Astronomy Lab, Western University. September 2025 to April 2026. Supervisor: Dr. Martin Houde.
- **Question:** Can steady-state subradiance, a suppression of collective emission, be observed in a room-temperature molecular gas, as proposed by Houde and Rajabi (2025)?
- **What I built:** designed and assembled precision optics; built custom analysis tools; moved the target gas from CO to CH3CN (~331 GHz).
- **Result:** PhUnC 2026, 2nd place; Western Student Research Conference 2026, 3rd place.
- **Figures:** the optical setup; an emission measurement if publishable.

### 4.4 Faint meteors
- **Header:** Undergraduate Summer Research Intern, Western Meteor Physics Group. April to September 2025. Supervisors: Dr. Peter Brown and Dr. Denis Vida.
- **Question:** EMCCD cameras record huge numbers of very faint meteors, but measuring them by hand is slow and imprecise. Can the reduction be automated without losing accuracy?
- **What I built:** an automated reduction pipeline combining particle swarm optimization, computer vision (OpenCV), and numerical fitting.
- **Result:** 4x better spatial accuracy and 3x lower measurement uncertainty than manual reduction, enabling analysis of about 200,000 faint-meteor trajectories.
- **Outputs:** NASA Meteoroid Environment Office presentation; Asteroids, Comets, and Meteors 2026 (Poznań, CSA-funded travel); first-author manuscript in preparation.
- **Figures:** a raw EMCCD frame next to the pipeline's fitted output.

### 4.5 CubeSat orbits
- **Header:** Orbital Dynamics Team Lead, The Western Skylark (Institute for Earth and Space Exploration). November 2024 to September 2025.
- **Question:** What orbit lets a small satellite reach about 1,000 isolated Arctic MOTUS wildlife-tracking stations while passing the Canadian Space Agency's safety tests?
- **What I built:** designed and completed 7 CSA-mandated tests (conjunction, de-orbit, and debris scenarios) in Ansys STK and NASA DAS for a $350,000 CSA-funded 3U CubeSat; youngest team lead in a 60+ member team.
- **Result:** orbital analysis supporting coverage of ~1,000 Arctic stations.
- **Figures:** an STK ground-track screenshot.

---

## 5. Interactive elements

### 5.1 Shared sim engine
One small engine runs every sim, in both tiles and full research pages.

- **Lifecycle:** mount, init, run, pause when scrolled offscreen or the tab is hidden, resume.
- **One animation loop** drives all visible sims, instead of one per canvas.
- **Pointer input** is normalized to 0 to 1 coordinates, so sims work at any size. Mouse and touch go through the same handler.
- **Theme:** sims read colors from CSS variables (`--sodium`, `--wind`, `--starlight`) at startup.
- **Options:** each sim declares defaults; `sim_options` in frontmatter override them. Unknown option names produce a build warning.
- **Controls:** each sim declares its controls (slider, toggle, select, with label and range) in `meta.ts`. `SimControls` renders them as plain HTML at build time, so they appear before the sim loads and no page needs custom UI code.
- **Presets:** each sim's `meta.ts` defines three or four named states (option values plus overlays like labels and readouts). The engine eases between them by calling the sim's `setOptions` each frame, and the same presets drive desktop scroll sync and mobile chips.
- **Reduced motion:** `drawStill()` renders a static frame; the same function produces tile stills for the research index and Open Graph images.
- **Resolution:** device pixel ratio capped at 1.5 for tiles and 2 on full pages.
- **Fallback:** if a sim fails to load, the tile shows its `fallback_image`.

Each sim is a folder with two files: `meta.ts` (static data, imported at build time for validation and control rendering, and in the browser) and `sim.ts` (canvas code, browser only, loaded on demand). This replaces the single-module interface from v5.

```ts
// types.ts: shared by every sim
export interface SimMeta<O> {
	name: string;
	defaults: O;
	controls: Control<O>[];
	presets: Record<string, Preset<O>>;
	overlays: string[];
	readouts?: { key: string; label: string }[];
	// One-sentence canvas description for screen readers
	describe(opts: O): string;
}

export interface Preset<O> {
	label: string;
	options: Partial<O>;
	overlays?: string[];
}

export type Control<O> =
	| { kind: "slider"; key: keyof O; label: string; min: number; max: number; step: number; unit?: string }
	| { kind: "toggle"; key: keyof O; label: string }
	| { kind: "select"; key: keyof O; label: string; choices: { value: string; label: string }[] };

export interface SimRuntime<O> {
	init(ctx: CanvasRenderingContext2D, size: Size, opts: O, theme: Theme, mode: "tile" | "page"): void;
	resize(size: Size): void;
	// Called every frame during a preset transition and on control input
	setOptions(patch: Partial<O>): void;
	setOverlays(active: string[]): void;
	step(dt: number): void;
	draw(): void;
	// x and y are normalized to 0..1
	onPointer(e: SimPointer): void;
	// Static frame for reduced motion, stills, and link previews
	drawStill(): void;
	readouts?(): Record<string, string>;
	dispose?(): void;
}
```

```ts
// index.ts: the names used in frontmatter
import pha from "./pha/meta";
import contrails from "./contrails/meta";
import meteors from "./meteors/meta";
import subradiance from "./subradiance/meta";
import cubesat from "./cubesat/meta";

// Static metadata, safe to import at build time
export const meta = { pha, contrails, meteors, subradiance, cubesat };

// Runtime code, loaded only when a sim is about to be shown
export const load = {
	pha: () => import("./pha/sim"),
	contrails: () => import("./contrails/sim"),
	meteors: () => import("./meteors/sim"),
	subradiance: () => import("./subradiance/sim"),
	cubesat: () => import("./cubesat/sim"),
};
```

### 5.2 Tile behavior (all tiles)
- Idle: the featured tile runs slow ambient motion; small tiles show their still frame and start moving on hover or keyboard focus (`tile_motion` in `site.yaml` can switch to `all` or `none`). Hover: full interaction. Reduced motion: still frame everywhere.
- The cursor disturbs or probes the sim; the "Open" control and title navigate.
- Touch: tapping the canvas interacts; tapping the title or "Open" navigates. Tile gestures are taps or horizontal movement only, so a vertical swipe always scrolls the page.
- Tiles are keyboard-focusable; Enter opens the page.

### 5.3 Sim specs

Section 15 gives each sim's model, equations, ranges, and preset values. Fidelity labels: **illustrative** means physically motivated but simplified; **data-driven** means it uses real data or real math from the project. Presets are listed in section order (The question, What I built, Result).

#### Planetary defence (`pha`), featured, size L
- **Scene:** Earth at the centre with the Sun held fixed to the left. A real year of near-Earth asteroid close approaches replays as dots that trace their paths past Earth, then the year loops. A faint circle at one lunar distance gives scale.
- **Interaction:** click or tap an approaching asteroid before it passes to open its card: warning time first, then name, first observation date, closest-approach date and distance, speed, estimated size, and orbit class. Hovering a dot slows time so it can be caught. Asteroids not yet discovered are drawn hollow and fill in on their first observation date, so asteroids found only after they passed are visible as hollow dots slipping by.
- **Tile:** auto-plays; tapping a dot shows a small tag with its warning time.
- **Page controls:** play and pause, speed, "show passes closer than" (miss distance), view radius, glare wedge toggle.
- **Presets:** `year` (plain replay); `discovery` (hollow until discovered, glare wedge shaded); `warning` (trails coloured by warning time, objects found after closest approach highlighted, running counters).
- **Fidelity:** data-driven. Dates, distances, speeds, and discovery dates are real; drawn paths are a fitted approximation in the ecliptic plane.

#### Contrail winds (`contrails`), size M
- **Scene:** a steady true wind and a biased model wind (standing in for ERA5) over a 200 km patch of sky. Two seeded contrails are already drifting when the page loads. Each contrail drifts with the true wind, beside a dashed copy showing where the model predicted it would go.
- **Interaction:** visitors draw their own contrails (drag with a mouse; tap the start and end points on touch). After a few seconds of tracking, each contrail becomes an observation, and the model field visibly corrects: arrows shift, the error shading fades, and new predictions start to match. A caption explains that a contrail only reveals the wind across it, which invites drawing at different angles.
- **Page controls:** correction on or off, show true wind, show model error, "Add a contrail" (random angle, for keyboard users), reset.
- **Presets:** `model` (correction off; seeded contrails drift away from their predictions); `observe` (correction on; the seeded observations update the field); `corrected` (several contrails added automatically at varied angles; error mostly gone).
- **Fidelity:** illustrative wind fields; the correction is real math, using the same Gaussian process family and path-averaged observations as the real model.

#### Faint meteors (`meteors`), size M
- **Scene:** a grainy simulated EMCCD frame with faint stars, drawn as hard-edged pixels. A meteor crosses, the frame freezes, and the view zooms in around the meteor's head.
- **Game:** sub-pixel picking. The head's true position falls between pixel centres, so the visitor judges it from how its light spreads across neighbouring pixels, then clicks. Misses are scored in pixels and metres (80 m per pixel). Five rounds, fainter each round, ending with a comparison against picking the brightest pixel and against a Gaussian fit on the same frames.
- **Tile:** single rounds; the result appears as a small tag.
- **Page controls:** "Start game", noise level, show comparisons, show sub-pixel grid.
- **Presets:** `raw` (frames play, meteors pass, no game); `pipeline` (each meteor auto-detected with a box, a fitted head position, and its track); `game` (starts round 1).
- **Fidelity:** illustrative frames; the pixel rendering and the fit are real math; the plate scale (80 m per pixel) comes from the real camera.

#### Quantum subradiance (`subradiance`), size S
- **Scene:** a small cluster of emitters radiating circular waves, rendered as an interference intensity field on a coarse grid and upscaled. A glow meter shows the combined emission.
- **Tile:** cursor position sets the phase difference between neighbouring emitters. As they fall out of phase the waves cancel and the glow dims.
- **Page controls:** number of emitters, spacing (in wavelengths), and phase difference.
- **Options:** `emitter_count`, `spacing`.
- **Presets:** `in-phase` (emitters reinforce, bright glow); `phase-sweep` (phase difference slowly sweeps, glow rises and falls); `subradiant` (out of phase, glow suppressed).
- **Fidelity:** illustrative. Labelled clearly as a classical interference analogy, since real subradiance is a collective quantum effect in a gas.

#### CubeSat orbits (`cubesat`), size M
- **Scene:** a polar map centered on the North Pole with simplified coastlines, MOTUS station dots, and the satellite's moving ground track with its coverage footprint.
- **Tile:** horizontal pointer position sets orbit inclination (no dragging, so phone scrolling is never trapped); stations inside the footprint light up; a coverage counter tracks the share of stations reached.
- **Page controls:** inclination slider, altitude slider (changes footprint size), minimum elevation angle, and a time-warp toggle.
- **Options:** `inclination_deg`, `altitude_km`, `station_set`.
- **Presets:** `stations` (Arctic map with station dots, no satellite); `orbit` (ground track and footprint, stations lighting up as passed); `coverage` (time warp to accumulated coverage with a percentage readout).
- **Fidelity:** real orbital geometry with a circular orbit. Station positions are real if the MOTUS station list can be used **[CONFIRM]**, otherwise illustrative.

### 5.4 Other interactive pieces
- **Glyph sub-nav:** generated from `research_order` and each page's `glyph`; hover shows `short_title`.
- **Prev/next links:** generated from `research_order`.
- **Section scroll sync:** see section 3.1.
- **Project media:** looping previews play on hover in the projects list and autoplay muted on project pages; both pause under reduced motion.
- **Small page links:** the external link button on interest and volunteer pages opens in a new tab, marked with an external-link icon.

---

## 6. Home page (`/`)

All copy lives in `content/home/index.md`; section order comes from `home_sections` in `site.yaml`.

```
+------------------------------------------------------------+
| Justin Domagala-Tang               Research Projects CV  @ |
+---------------------------+--------------------------------+
| [photo: London 2026]      |                                |
| Tagline                   |   FEATURED TILE (live sim)     |
| About (3 short paras)     |   Planetary defence            |
| Currently: ...            |   live counter         Open    |
+--------------+--------------+--------------+---------------+
| Contrails    | Subradiance  | Meteors      | CubeSat       |
+--------------+--------------+--------------+---------------+
| Projects: compact list (from home_projects)                |
| Interests: rows that each open a small page                |
| Volunteer work: role rows that each open a small page      |
| Footer                                                     |
+------------------------------------------------------------+
```
The small tiles follow `research_order` after the featured page, capped at `home_grid_count`. Mobile order: About, featured tile, small tiles as a 2x2 grid, then the rest.

```yaml
---
hero_image: ./hero.jpg
hero_alt: Describe the photo for screen readers
hero_caption: Presenting at the London Contrail Workshop 2026
currently: Planetary defence research with Prof. Paul Wiegert.
---
```

**About (body of `home/index.md`):**

> I'm a third-year Honours Physics student at Western University in London, Ontario, majoring in Scientific Computing and part of the Scholars Electives program. Most of my work sits where observation meets code: turning noisy camera data into measurements of things moving through the sky.
>
> Right now I'm working with Prof. Paul Wiegert on planetary defence, studying how much warning we get before newly discovered near-Earth asteroids make their closest approach, and why some arrive unseen. Before that, I spent a summer at TU Delft as a Mitacs Globalink researcher using contrail observations to correct upper-atmosphere wind models, and a summer with the Western Meteor Physics Group building an automated pipeline for faint meteors, which I presented to NASA's Meteoroid Environment Office and at Asteroids, Comets, and Meteors 2026 in Poznań.
>
> Outside the lab I shoot film (35mm and large format, printed in the darkroom), lead the photo team for the CAISA Fashion Show, and go portaging whenever I can. I'm aiming for a PhD in planetary physics or astrodynamics.

---

## 7. Global design

### Top bar and footer
- Top bar: name (home link), nav items from `site.yaml`, email icon. Active page underlined. No hamburger menu on mobile while nav has three items.
- Footer: email, LinkedIn, GitHub (from `site.yaml`), "Last updated: Month Year".

### Tokens (`styles/tokens.css`)
| Token | Hex | Role |
|---|---|---|
| Twilight | `#1B2440` | Page background |
| Dusk | `#25304F` | Tile and panel surfaces |
| Starlight | `#E6E8EE` | Primary text |
| Haze | `#9AA3B8` | Secondary text, captions |
| Sodium | `#F2A541` | Single accent: cursor effects, links, detections |
| Wind | `#7FB7C9` | Data lines inside sims only |
| Rule | `#3A4668` | 1 px borders around tiles and panels |

Contrast against Twilight: Starlight 12.5:1, Haze 6.1:1, Sodium 7.5:1, Wind 6.9:1. Against Dusk the lowest is Haze at 5.1:1, so every text pairing passes WCAG AA. Dusk is only 1.18:1 against Twilight, which is why tiles and panels get the Rule border instead of relying on the surface color.

### Typography (build default)
- **Source Serif 4** for headings and body. Its optical-size axis does the display work: headings at the large optical size get finer contrast and tighter spacing, while body text at the text size stays sturdy on a dark background. One family keeps the page quiet so the sims carry the personality.
- **Atkinson Hyperlegible Next** for nav, captions, controls, and sim labels. The Braille Institute designed it for letterform distinction, which suits small labels near moving canvases. Variable weight 200 to 800 with italics.
- Both load through Astro's Fonts API, self-hosted, with `latin` and `latin-ext` subsets (Poznań needs latin-ext).
- Scale in px, from the classic scale in *The Elements of Typographic Style*: body 18, captions 14, sim labels 12 minimum, h3 21, h2 24, h1 36, home name 48. Body line-height 1.6 (serif on dark needs the room), headings 1.2.
- Body line length around 65 characters; left-aligned; sentence case everywhere; no all-caps labels, no eyebrow labels above headings, and no numbered markers except the progress log, which really is a sequence.
- Atkinson Hyperlegible Next has no tabular figures, so live counters sit in fixed-width, right-aligned boxes to keep changing digits from shifting the layout.

### Where the boldness goes
The featured sim is the one bold element on the site. Everything around it stays quiet: no entrance animations on sections, no hover lift on every card, one accent color, and small tiles at rest until someone reaches for them.

### Quality floor
- Responsive to 360 px; visible keyboard focus; reduced motion respected; text never sits directly on a moving sim.

### SEO and link previews
- Title: "Justin Domagala-Tang | Physics and Scientific Computing".
- Meta description from `site.yaml` tagline.
- Open Graph images generated from each sim's `drawStill()`; the home page uses the planetary defence tile.

---

## 8. Recipes (copied into `EDITING.md`)

**Add a research page**
1. Copy any folder in `content/research/` and rename it (the folder name becomes the URL).
2. Edit the frontmatter and the body sections in `index.md`.
3. Put images in the same folder and link them with relative paths (`./figure.png`).
4. Add the slug to `research_order` in `site.yaml` where you want it (optional; unlisted pages appear last).
5. Push. If the build fails, the error names the missing or misspelled field.

**Reorder pages or change the featured tile**
Edit `research_order`, `featured_research`, or `projects_order` in `site.yaml`, then push.

**Change which sim state a section shows**
Edit `presets` under `page_sim` in that research page's frontmatter. Each sim lists its preset names in its `meta.ts`.

**Add a project**
Copy any folder in `content/projects/`, edit the frontmatter and the three sections, put media in the same folder, and optionally add the slug to `projects_order`. It gets its own page automatically.

**Add an interest or volunteer role**
Copy any folder in `content/interests/` or `content/volunteer/`, edit the frontmatter and text, put the photo in the same folder, and optionally add the slug to `interests_order` or `volunteer_order`. It gets its own small page and a home page row automatically.

**Add a talk**
Add an entry to `talks.yaml` with `related:` set to a research or project slug. It appears on the research index and on that page.

**Add a top-level page**
Create `content/pages/<slug>/index.md`, then add the slug to `nav` in `site.yaml`.

**Hide a page temporarily**
Set `draft: true` in its frontmatter.

**Rename a page**
Rename its folder, then add the old folder name to `redirect_from` in its frontmatter so old links keep working.

**Update the CV**
Replace `public/cv/justin-domagala-tang-cv.pdf` (same filename) and update `last_updated` in `cv/index.md`.

**Preview locally**
Run `npm run dev` and open the local address it prints.

---

## 9. Before going public **[CONFIRM]**
- Western Automotive AI hackathon placement (2nd vs. 3rd) and QAI GenQ Calgary year.
- Quantum Club title: "Quantum Developer" only unless "Classical Team Lead" is confirmed.
- CAP 2025: leave off until confirmed.
- Whether to describe Mitacs Globalink as an award.
- Publication statuses current at launch.
- Web CV free of obsolete items (PASA research digest bullet, "Lab Lead" title, TU Delft 30% metric), phone number, and street address.
- Supervisor permission before posting figures, data, or code from unpublished work (WMG pipeline, GMN and TU Delft data, subradiance measurements).
- Whether MOTUS station coordinates can be used in the CubeSat sim.
- Consent for identifiable people in the London hero photo and any research, project, interest, or volunteer photos (Soph and CFS photos especially).
- Links and photos for each interest and volunteer page; VSA title (VP or Co-VP External Affairs); Peer Leaders start month.
- Talk mappings: which project the GMN Annual Meeting 2026, PhUnC 2025, and Research Opportunities in Physics (Fall 2026) talks belong to, and whether the Western Quantum Innovation Showcase 2025 talk was the quantum portfolio project.
- The Western Skylark's planned altitude and inclination, to set the CubeSat sim defaults (otherwise the generic 500 km and 97.5 degree defaults stay).
- Whether the subradiance page can say that thermal emission from CH3CN has been detected.
- Details for the hackathons (what was built at each, outcomes for HackWestern 2026 and NASA Space Apps 2026), SX-70 timer, photo site, and portaging pages. These stay `draft: true` until filled.
- Peer Leaders responsibilities, the VSA organization description, and why you joined each volunteer organization.
- Planetary defence progress log milestones since September 2026.

---

## 10. Tech stack and build phases

- **Framework:** Astro 6 (build default). Content-layer collections with Zod schemas (`src/content.config.ts`, `glob()` loaders, `z` from `astro/zod`) make rules 1 to 9 in section 1.1 straightforward. Requires Node 22.12 or newer.
- **Sims:** TypeScript and Canvas2D, no external sim libraries; one small engine, one folder per sim, loaded on demand.
- **Fonts:** Astro's built-in Fonts API, self-hosted at build time.
- **Images:** Astro's image pipeline (AVIF and WebP at responsive widths) for every image stored beside content.
- **Link previews:** a build script renders each sim's `drawStill()` with `@napi-rs/canvas` into `public/og/`.
- **Testing:** Vitest for sim math and content rules, a few Playwright smoke tests, Lighthouse CI, and a scheduled link check (section 16).
- **Hosting:** GitHub Pages with a GitHub Actions build.
- **Domain:** **[DECIDE]**, ideally matching justindtphoto.com. Not needed until launch; the build uses a placeholder `site` URL until then.

### Build phases
1. **Content skeleton first:** `site.yaml`, schemas and cross-file checks (section 12), ordering rules (section 13), every page type rendering from markdown with the section 17 drafts, nav and footer, still images in place of sims, deploy. Run the acceptance tests in 1.4 now, before any sim exists.
2. **Engine and vertical slice:** shared sim engine, `SimControls`, preset transitions, section scroll sync, and the planetary defence sim in the featured tile and on its research page (desktop pinned version and mobile chip version), following sections 14 and 15.1.
3. **Remaining sims:** contrails, meteors, subradiance, CubeSat, each in tile and page form with its three presets.
4. **Content pass:** final text, figures, publications, talks, project pages, CV, interest and volunteer pages.
5. **Polish and launch:** mobile pass, reduced motion, Open Graph images, Lighthouse check, section 9 checklist, `EDITING.md` review, then add the link to your email signature and LinkedIn.

---

## 11. Open decisions

| Decision | Options | Status |
|---|---|---|
| Domain | `justindt.dev` / `justindt.com` / a subdomain of justindtphoto.com / other | Open; needed only at launch |
| Typography | Source Serif 4 + Atkinson Hyperlegible Next / alternatives | Build default; changing it touches `tokens.css` and the fonts config only |
| Framework | Astro / Next.js / plain HTML | Build default: Astro 6 |
| Editing method | Text editor and GitHub web editor / add a git-based CMS | Build default: no CMS at launch |
| Small-tile motion | Featured only / all / none | Build default: featured only, switchable in `site.yaml` |
| Light theme | Dark only / add a light token set | Build default: dark only at launch |
| Third publication (in development) | Show / hide until submitted | Recommend hide (`hidden: true`) |
| Analytics | None / privacy-friendly counter such as GoatCounter | Recommend none at launch |

---

## 12. Content schemas

Each collection is defined in `src/content.config.ts` with a Zod schema. Per-file problems (a missing field, a wrong type, an image that doesn't exist) fail the build through Astro's own validation. Problems that span files (a misspelled slug in `site.yaml`, a preset key that isn't a heading on its page) are caught by `src/lib/validate.ts`, which runs once during every build.

### 12.1 Collections and loaders

| Collection | Source | Entry id |
|---|---|---|
| `research`, `projects`, `interests`, `volunteer`, `pages` | `glob()` loader, pattern `<collection>/*/index.md` | Folder name (custom `generateId`, since the default id for `x/index.md` is not just `x`) |
| `home`, `cv` | `home/index.md`, `cv/index.md` | Fixed |
| `researchIntro` | `research-intro.md` | Fixed |
| `site` | `site.yaml` as one entry | `site` |
| `talks`, `publications` | YAML lists | Position in the list |

Astro's `file()` loader expects every list item to carry an `id`, and treats a top-level YAML object as one entry per key. Neither fits a hand-edited file, so `src/lib/loaders.ts` holds two small custom loaders: `singleYaml(path)` loads `site.yaml` as a single entry, and `yamlList(path)` assigns ids by position so talk and publication entries need no `id` field. The build agent should confirm current `file()` behaviour before writing these; if it has changed, use it directly.

### 12.2 Fields

**Research** (`content/research/<slug>/index.md`)

| Field | Type | Required | Rule |
|---|---|---|---|
| `title` | string | yes | |
| `short_title` | string | yes | 24 characters or fewer |
| `summary` | string | yes | 300 characters or fewer; used on the index and in link previews |
| `role`, `institution`, `dates` | string | yes | `dates` is display text, such as "April to August 2026" |
| `date_start` | `YYYY-MM` | yes | Sorting only |
| `date_end` | `YYYY-MM` or null | no | |
| `supervisors` | string list | no | Default empty |
| `glyph` | enum | yes | `planet`, `contrail`, `wave`, `meteor`, `satellite` |
| `draft` | boolean | no | Default false |
| `redirect_from` | string list | no | Default empty |
| `tile.caption` | string | yes | 60 characters or fewer |
| `tile.result` | string or null | no | Null shows the sim's live counter |
| `tile.sim` | sim name or null | no | Must exist in the registry |
| `tile.sim_options` | object | no | Unknown keys warn |
| `tile.fallback_image` | image (relative path) | yes | Must exist; also used when the sim can't run |
| `tile.alt` | string | yes | Describes the still image |
| `page_sim.sim` | sim name | when `page_sim` is present | |
| `page_sim.controls` | option keys | no | Each must be a control in the sim's `meta.ts` |
| `page_sim.presets` | heading to preset map | no | Keys must be H2 headings on the page; values must be presets of the sim |

The body needs at least one H2. Body images without alt text produce a warning.

The five glyphs are custom 24 px stroke icons stored in `src/components/glyphs/`, drawn for this site rather than taken from an icon library: planet (circle with an orbit ring), contrail (two parallel diagonal lines thinning into dots), wave (two concentric arcs), meteor (a streak with a bright head), satellite (a small box with two panels). Adding a glyph means adding one SVG file and one enum value.

**Projects** (`content/projects/<slug>/index.md`)

| Field | Type | Required | Rule |
|---|---|---|---|
| `title` | string | yes | |
| `one_line` | string | yes | 120 characters or fewer |
| `context`, `role`, `dates` | string | yes | |
| `date_start` | `YYYY-MM` | yes | |
| `tags` | string list | no | 6 or fewer |
| `thumbnail`, `thumbnail_alt` | image, string | yes | |
| `media.type` | `image`, `gallery`, `video` | yes | |
| `media.src`, `media.alt` | file, string | for image and video | |
| `media.items` | list of `{src, alt}` | for gallery | 1 to 4 items |
| `media.poster` | image | for video | Shown under reduced motion |
| `preview` | video file or null | no | Muted loop in the projects list |
| `links.code`, `links.demo`, `links.paper` | URL or null | no | |
| `draft`, `redirect_from` | as above | no | |

**Interests** (`content/interests/<slug>/index.md`): `title`, `one_line` (100 characters or fewer), `photo` (image, required), `photo_alt` (required), `photo_caption` (string or null), `link.label`, `link.url` (URL or null), `draft`, `redirect_from`.

**Volunteer** (`content/volunteer/<slug>/index.md`): every interest field, plus `organization` (required), `role.title`, `role.dates`, and `role.responsibilities` (2 to 4 strings).

**Generic pages**: `title`, optional `subtitle`, `draft`, `redirect_from`. A page slug may not be `research`, `projects`, `cv`, `interests`, `volunteer`, `og`, or `404`.

**Home**: `hero_image`, `hero_alt`, `hero_caption`, `currently` (120 characters or fewer). **CV**: `pdf` (path under `/cv/`), `last_updated` (`YYYY-MM`). **Research intro**: body only.

**Talks**: `event` (required), `location`, `year` (required integer), `month` (1 to 12, optional, orders talks within a year), `related` (slug or null), `award` (string or null), `url` (URL or null).

**Publications**: `authors` (string), `title` (string, quoted if it contains a colon), `venue` (string or null), `status` (enum listed in section 3.2), `year`, `doi`, `url` (each optional), `related` (slug or null), `hidden` (boolean, default false). The name in `highlight_name` is bolded wherever it appears in `authors`.

**Site**: every key shown in section 2.2. `home_grid_count` is an integer from 0 to 8 (default 4); `tile_motion` is `featured_only`, `all`, or `none` (default `featured_only`); `home_sections` values come from `about`, `research_grid`, `projects`, `interests`, `volunteer`.

### 12.3 Cross-file checks (`src/lib/validate.ts`)

Errors stop the build; warnings print and continue.

| Check | Result |
|---|---|
| Every slug in `research_order`, `projects_order`, `interests_order`, `volunteer_order`, `home_projects`, `featured_research`, and `nav` exists | Error, with the closest matching slug suggested |
| No slug repeats within one list | Error |
| Research and project slugs are unique across both collections (so `related:` is unambiguous) | Error |
| Every `related` in talks and publications names an existing research page or project | Error |
| Every `page_sim.presets` key is an H2 heading on that page, matched exactly | Error, listing the headings found |
| Every preset name, control key, and sim name exists in the sim's `meta.ts` | Error, listing the valid names |
| A generic page slug collides with a built-in route | Error |
| `sim_options` key unknown to the sim | Warning, listing the sim's options |
| `featured_research` is a draft | Warning; the first non-draft page in `research_order` is featured instead |
| A body image has no alt text | Warning |

Headings come from Astro's `render(entry)`, which returns each page's heading list. Messages name the file, the field, and the fix:

```
Content error in research/contrails/index.md
page_sim.presets: "What I Built" is not a section heading on this page.
Headings on this page: "The question", "What I built", "Result".
Headings must match exactly, including capital letters.
```

### 12.4 Rule for sim modules
`meta.ts` files are imported during the build in Node, so they must not touch `window`, `document`, or any canvas at import time. All browser code lives in `sim.ts`.

---

## 13. Ordering, drafts, and generated pages

### 13.1 How every list is built
One function, `ordered(collection, orderList, fallback)` in `src/lib/ordering.ts`, produces every list on the site:
1. Remove drafts (production builds only).
2. Take the slugs in `orderList`, in that order.
3. Append everything not listed, sorted by the fallback: newest `date_start` first for research and projects (ties broken by title), alphabetical by title for interests and volunteer entries.

The research list feeds the research index, glyph sub-nav, prev/next links, and home grid. The home grid is the research list without the featured page, cut to `home_grid_count`. Home project rows come from `home_projects`; if that list is empty, the first three projects in order are used.

### 13.2 Prev and next
Prev/next links follow the same list and do not wrap around: the first page has no "previous" link and the last has no "next". Labels show the neighbour's `short_title`, such as "Next: Contrail winds".

### 13.3 Drafts
Drafts are left out of production builds, the sitemap, and every list. In `npm run dev` they render with a "Draft" banner and appear at the end of their lists, so unfinished pages can be previewed in place.

### 13.4 Routes

| URL | Source |
|---|---|
| `/` | `home/index.md` and `site.yaml` |
| `/research`, `/research/<slug>` | Research collection, talks, publications |
| `/projects`, `/projects/<slug>` | Projects collection |
| `/interests/<slug>`, `/volunteer/<slug>` | Interests and volunteer collections |
| `/cv` | `cv/index.md` and the PDF |
| `/<slug>` | Generic pages |
| Old slugs from `redirect_from` | Generated redirect pages (meta refresh plus a canonical link) |
| `/404` | Not-found page (copy in section 17.10) |
| `/sitemap-index.xml`, `/robots.txt` | Generated |

---

## 14. Sim engine implementation

### 14.1 Progressive enhancement
`SimHost.astro` renders a `<sim-host>` custom element that contains an optimized `<img>` of the page's still image with its alt text. That image is the no-JavaScript state, the reduced-data state, and the failure state. When the engine loads a sim, it swaps the image for a canvas of the same size. Attributes: `data-sim`, `data-mode` (`tile` or `page`), `data-options` (JSON), and on research pages `data-presets` (JSON map from section id to preset name). No UI framework is used; the engine is plain TypeScript.

### 14.2 Loading policy
- Featured tile and research page sim: load during browser idle time after first paint (`requestIdleCallback` with a one-second timeout) when within one screen of the viewport.
- Small tiles with `tile_motion: featured_only`: load on first hover, focus, or touch. With `all`, load when within one screen of the viewport.
- `navigator.connection.saveData` set: every sim stays a still image until the visitor interacts.

### 14.3 Animation loop
- One `requestAnimationFrame` loop drives every active sim.
- Frame time is clamped to 50 ms, so returning to a background tab never produces a jump; sims that integrate motion take up to four substeps per frame.
- A sim pauses when it leaves the viewport (`IntersectionObserver`) or the tab is hidden.
- Adaptive quality: if a tile averages over 20 ms per frame for two seconds, the engine halves its pixel ratio, then drops it to 30 frames per second.
- `?sim-debug` in the URL shows frame time, pixel ratio, current preset, and sync state on each sim, for tuning.

### 14.4 Sizing and theme
- Containers set the aspect ratio in CSS (tiles 4:3, featured tile 16:10, page sim 4:3 on desktop and 16:10 on mobile), so loading a sim never shifts the layout.
- A `ResizeObserver` sizes the canvas backing store to its CSS size times the pixel ratio, capped at 1.5 for tiles and 2 on research pages.
- The theme object (`bg`, `surface`, `text`, `muted`, `accent`, `data`, `rule`) is read from CSS variables at init.

### 14.5 Preset transitions
`applyPreset(name)` is performed by the engine for every sim. Over 500 ms with an ease-in-out cubic curve, numeric options are interpolated and passed to `setOptions` each frame; booleans and strings switch at the start so the change is visible while numbers ease; overlays switch at the start. Under reduced motion the duration is zero.

### 14.6 Scroll sync (desktop, 960 px and wider)
The sim has two states: **following** (presets follow sections) and **visitor** (the visitor has taken over).
1. On scroll (passive listener, throttled to one check per frame), the active section is the last H2 whose top is above one third of the viewport height. With fewer than ten headings per page, this is cheaper and more predictable than observer bookkeeping.
2. Following, and the active section changes to one with a preset: apply it.
3. Any pointer-down on the canvas or input on a control switches to visitor, remembering the active section.
4. Visitor, and the active section becomes a different one: return to following and apply that section's preset.
5. "Reset view" returns to following and applies the active section's preset.
6. Sections without a preset leave the sim unchanged.
7. While a meteor game is in progress or a contrail is being drawn, the sim stays in the visitor state whatever the scrolling, so a game is never interrupted.

A status line under the sim shows "Showing: Survey" (the preset's label) or "Your view" with the Reset button. It has `aria-live="polite"` and only changes on preset changes, so screen readers are told without chatter.

### 14.7 Mobile (below 960 px)
No scroll sync. A row of chips sits under the sim, one per section with a preset, labelled with the section heading. Chips are buttons with `aria-pressed`; the first is active on load.

### 14.8 Controls and readouts
`SimControls.astro` renders each control from `meta.ts` as a labelled native input (`range`, `checkbox`, or `select`) at build time. The engine listens for `input` events, calls `setOptions`, and switches to the visitor state. Readouts declared in `meta.readouts` render as `<output>` elements in fixed-width boxes; the engine fills them from `readouts()` four times per second.

### 14.9 Pointer and touch
- Pointer events only (`pointerdown`, `pointermove`, `pointerup`, `pointerleave`), normalized to 0 to 1.
- Every sim canvas uses `touch-action: pan-y`, so vertical swipes always scroll. Tile interactions are hover, tap, or horizontal movement; anything else is done through page controls.
- Interactions that need a precise point use taps instead of drags on touch: two taps to draw a contrail, tap then adjust then confirm for the meteor game.

### 14.10 Accessibility
- Page canvases have `role="img"` and an `aria-label` from `meta.describe(opts)`, updated after each preset change.
- Tile canvases are `aria-hidden`; the tile's link text (title and caption) carries the meaning.
- Every interaction possible with the pointer on a research page also exists as a native control or keyboard path: "Next approach" and Tab for asteroids, "Add a contrail" for drawing, and arrow keys with Enter for the meteor game. Tile pointer effects are decorative and have no keyboard equivalent by design.
- Text drawn inside a canvas (warning-time tags, readouts) sits on a filled pill in the surface color for contrast.
- Reduced motion: `drawStill()` everywhere; controls still work and redraw the still.

### 14.11 Failure handling
If the sim module fails to load or Canvas2D is unavailable, the still image simply stays. Errors go to the console only.

---

## 15. Sim models and parameters

Shared conventions: options are plain numbers, booleans, or strings; controls refer to option keys; every sim seeds its random generator (mulberry32) from a fixed seed, so stills and link previews are reproducible; units appear in control labels.

### 15.1 Planetary defence (`pha`)

**Data.** A Python script, `scripts/pha_data.py`, run by hand with its output committed, writes `src/sims/pha/data/approaches-2025.json`. It queries JPL's Close Approach Data API for Earth approaches during 2025 within 20 lunar distances (LD), then the Small-Body Database API for each object's orbital elements and first observation date. Responses are cached locally so reruns don't refetch. The script prints counts per cutoff, so the display default can be set to keep roughly one to three approaches on screen at a time.

Fields per object, written as compact arrays: designation, closest-approach time, nominal miss distance (from the Close Approach Database), relative speed, H, orbit class, first observation date, and six path coefficients (below).

**Warning time** is

$$W = t_{\text{CA}} - t_{\text{disc}}\quad\text{(days)}$$

Here $t_{\text{disc}}$ is the first observation date from the Small-Body Database. Negative values mean the asteroid was first observed after its closest approach.

**Paths.** In the script, each orbit is propagated with a two-body model and positions are sampled daily for 30 days on either side of closest approach. Positions are taken in a geocentric ecliptic frame that rotates so the Sun stays in a fixed direction. A quadratic in time is fitted per axis:

$$\mathbf r(t) = \mathbf r_0 + \mathbf v\,(t - t_{\text{CA}}) + \tfrac12\,\mathbf a\,(t - t_{\text{CA}})^2$$

$\mathbf r_0$ is then rescaled so its length equals the catalogued miss distance. The browser only evaluates six numbers per object per frame. Paths are drawn in the ecliptic plane, so an object passing above or below Earth can appear to cross it; the card always shows the true 3D distance.

**Size estimate** shown on the card, as a range over albedos 0.05 to 0.25:

$$D = \frac{1329\ \text{km}}{\sqrt{p_V}}\;10^{-H/5}$$

For example, H = 22 at albedo 0.14 gives about 140 m.

**Display and time.** The year loops in about three minutes (2 days per second by default), with the date shown under the canvas. An asteroid appears when it enters the view radius and leaves a fading trail behind it. When the loop restarts, the field fades out and in. A shaded wedge marks sky within 60 degrees of the Sun, labelled as too close to the Sun to observe.

**Selecting.** The pointer highlights the nearest dot within 12 px, and time slows to a quarter speed while a dot is highlighted. Clicking selects it. The selected path is drawn in full (past solid, future dotted, closest approach marked), and the card opens in a panel beside the canvas on desktop or below it on mobile, never on top of moving content.

The card lists: warning time ("Found 12 days before closest approach" or "Found 3 days after it passed"), name, first observation date, closest-approach date, a live countdown until closest approach, miss distance in LD and km, relative speed, estimated size, and orbit class. After closest approach, the countdown becomes "Passed at 2.4 LD on 14 March". Escape or the close button dismisses the card.

| Option | Default | Range | Control |
|---|---|---|---|
| `playing` | true | | Toggle, "Play" |
| `time_speed` | 2 days per second | 0.5 to 8 | Slider, "Speed" |
| `max_miss_ld` | 5 tile, 10 page | 1 to 20 | Slider, "Show passes closer than (LD)" |
| `view_radius_ld` | 40 | 10 to 100 | Slider, "View radius (LD)" |
| `show_glare` | false | | Toggle, "Show solar glare region" |

| Preset | Options | Overlays |
|---|---|---|
| `year` (The question) | `show_glare: false` | `trails` |
| `discovery` (What I'm building) | `show_glare: true` | `trails`, `discovery_state` |
| `warning` (Result) | `show_glare: true` | `trails`, `discovery_state`, `warning_colors`, `counters` |

Under `warning_colors`, trails get brighter in the Wind colour as warning time shortens, and objects found after closest approach are drawn in Sodium. Readouts: current date, approaches so far this loop, found before closest approach, found after.

**Keyboard.** A "Next approach" button selects the next asteroid to reach closest approach and opens its card; Tab and Shift+Tab step through the asteroids currently on screen.

**Tests.** Each fitted path at $t_{\text{CA}}$ has length equal to the catalogued miss distance within 1%; the warning time sign is correct for an object found after closest approach; the loop restarts without duplicating objects; the size formula gives about 140 m for H = 22 at albedo 0.14.

### 15.2 Contrail winds (`contrails`)

**Domain.** The canvas represents 200 km by 125 km at cruise altitude. Time runs at 180 sim-seconds per real second.

**True wind (steady).** Constant in time, with gentle variation across the patch and zero divergence, since $u$ depends only on $y$ and $v$ only on $x$:

$$u_T = 12 + 4\sin\frac{2\pi y}{L_y},\qquad v_T = 3 + 3\sin\frac{2\pi x}{L_x}\qquad\text{(m/s)},\quad L_x = 200\ \text{km},\ L_y = 125\ \text{km}$$

**Model wind (steady)** is the true wind minus a smooth bias, with an RMS error of about 3.2 m/s, similar in size to real ERA5 errors:

$$\mathbf u_M = \mathbf u_T - \mathbf b,\qquad \mathbf b = \Big(2.5 + 1.5\cos\frac{2\pi x}{L_x},\ \ -1.5 + 1.2\sin\frac{2\pi y}{L_y}\Big)$$

**Contrails.** A drawn contrail is a straight segment from 10 to 120 km long, sampled at 24 points. Each point moves with the true wind (midpoint step), while a dashed copy moves with the current model field. Contrails last 25 real seconds and fade over the last 5. Up to 12 are visible; older ones fade early to make room. Two seeded contrails start at about 25 and 115 degrees, one in each half of the canvas.

**Observations.** A contrail's motion along its own length is invisible, so only the wind across it can be measured. After 4 real seconds of tracking, each contrail yields one observation: its mean displacement along the normal $\hat{\mathbf n}$, divided by elapsed time, plus noise with $\sigma_n$ = 0.5 m/s. The GP uses the residual against the model:

$$y_i = \bar v_{\perp,i}^{\text{obs}} - \frac1M\sum_{m=1}^{M}\hat{\mathbf n}_i\cdot\mathbf u_M(\mathbf x_{im})$$

with $M$ = 8 points per contrail at their positions when drawn.

**Correction (real math).** The bias field's two components are independent Gaussian processes sharing the Matérn 5/2 kernel, with $\sigma_f$ = 3 m/s and $\ell$ = 60 km. Each observation is a path average of the crosswind component, so

$$\operatorname{Cov}(y_i, y_j) = \frac{\hat{\mathbf n}_i\cdot\hat{\mathbf n}_j}{M^2}\sum_{m=1}^{M}\sum_{l=1}^{M}k\big(|\mathbf x_{im} - \mathbf x_{jl}|\big) + \sigma_n^2\,\delta_{ij}$$

$$\hat{\mathbf b}(\mathbf g) = \sum_j \mathbf c_j(\mathbf g)\,\alpha_j,\qquad \mathbf c_j(\mathbf g) = \frac{\hat{\mathbf n}_j}{M}\sum_{l=1}^{M}k\big(|\mathbf g - \mathbf x_{jl}|\big),\qquad \boldsymbol\alpha = C^{-1}\mathbf y$$

where $C$ is the covariance matrix above. The corrected field $\mathbf u_M + \hat{\mathbf b}$ is evaluated on a 32 by 20 grid and eased in over 600 ms after each new observation. Observations persist until reset, capped at 40 (oldest dropped).

**Display.** Arrows show the corrected model field in Haze. Error shading shows $|\mathbf u_M + \hat{\mathbf b} - \mathbf u_T|$ as a translucent Sodium wash that fades where contrails have corrected it. True-wind arrows in Wind are hidden unless toggled. Readouts: contrails observed, and "Model error in this simulation" as an RMS over the grid (starting near 3.2 m/s). The real result (2.50 to 1.84 m/s) stays in the page's Result text, never beside the sim's own number.

**Drawing.** Mouse: press, drag, release. Touch: tap the start point, then the end point, so drawing never fights scrolling. A caption under the canvas reads: "Draw a contrail across the sky. Each one only shows the wind blowing across it, so try a few different angles."

| Option | Default | Range | Control |
|---|---|---|---|
| `correction` | true | | Toggle, "Correct the model" |
| `show_truth` | false | | Toggle, "Show true wind" |
| `show_error` | true | | Toggle, "Show model error" |
| `time_scale` | 180 | 60 to 360 | |
| `max_contrails` | 12 | 4 to 20 | |

Buttons: "Add a contrail" and "Reset".

| Preset | Options | Overlays |
|---|---|---|
| `model` (The question) | `correction: false` | `drift_pair` |
| `observe` (What I built) | `correction: true` | `drift_pair`, `error_shading` |
| `corrected` (Result) | `correction: true`, adds 8 contrails at varied angles over 4 seconds | `error_shading`, `readouts` |

**Tile.** Same sim at small size with correction and error shading on; drawing works the same way.

**Tests.** Numerical divergence of the true field is near zero; one observation reduces error mainly in the crosswind component near its contrail; two perpendicular contrails at the same place recover a uniform bias within the noise.

### 15.3 Faint meteors (`meteors`)

Sub-pixel picking is the point of this sim. The head's true position falls between pixel centres, and the visitor has to judge it from how its light spreads across neighbouring pixels, which is the same problem the pipeline solves.

**Sensor and plate scale.** A 128 by 80 pixel crop of the camera sensor. Plate scale: 80 m per pixel at the meteor's distance, so every miss is reported in metres as well as pixels. Every position (truth, clicks, fitted estimates) is stored as a floating-point sensor coordinate and never rounded.

**Rendering (real math).** The head is a Gaussian (σ from 0.7 to 1.0 px, varied per round), integrated over each pixel's area instead of sampled at its centre:

$$I_{ij} = A\left[\Phi\!\left(\frac{i+1-x_0}{\sigma}\right) - \Phi\!\left(\frac{i-x_0}{\sigma}\right)\right]\left[\Phi\!\left(\frac{j+1-y_0}{\sigma}\right) - \Phi\!\left(\frac{j-y_0}{\sigma}\right)\right]$$

Here $\Phi$ is the standard normal CDF (computed with erf), pixel $i$ spans $i$ to $i+1$, and $(x_0, y_0)$ is the head's true position. This is what makes the share of light in neighbouring pixels encode the sub-pixel position.

The fractional parts of $x_0$ and $y_0$ are drawn uniformly from 0 to 1 each round, so clicking pixel centres earns no advantage. The wake fades along the track behind the head (exponential over 3 to 6 px) and is pixel-integrated the same way. Motion during the exposure stretches the head along the track, and the truth is the head's centroid at mid-exposure. Noise (gamma-distributed speckle plus Gaussian read noise) is added after integration.

Pixels are always drawn as hard-edged blocks (nearest-neighbour scaling, image smoothing off), because any smoothing would hide the information the visitor needs.

**Round.** Noise frames play, a meteor crosses for 0.4 to 0.8 seconds, and the frame freezes at a random point along its track. The view then zooms over 400 ms to a 24 by 15 pixel window containing the head, with a small inset of the whole frame. The window is placed with a random offset so its centre is never the answer. Head peak signal-to-noise ratio runs from 10 in round 1 down to 3 in round 5.

**Aiming precision**

| | Desktop | Touch | Keyboard |
|---|---|---|---|
| Zoomed view | 30 or more screen px per sensor px | 14 or more | Same as desktop |
| Fine aiming | A 4x magnifier follows the cursor (about 120 screen px per sensor px), with a 1 px crosshair and an optional grid at 0.1 px | Tap to place the crosshair, then drag to nudge it with finger movement scaled 1:4; the magnifier sits above the finger; press "Confirm" | Arrow keys move 0.05 px, Shift with an arrow moves 0.5 px, Enter confirms |
| Resolution | About 0.01 px | About 0.02 px | 0.05 px |

Clicks convert from screen to sensor coordinates through the exact zoom transform, including CSS scaling and device pixel ratio, and a unit test holds that mapping to within 0.01 px.

**Scoring.** For a miss of $e$ pixels:

$$e_{\text{m}} = 80\,e\ \ \text{(metres)},\qquad \text{points} = \operatorname{round}\!\left[100\,\exp\!\left(-\frac{e^2}{2\,(0.25\ \text{px})^2}\right)\right]$$

| Miss | 0 px | 0.1 px (8 m) | 0.25 px (20 m) | 0.4 px (32 m) | 0.5 px (40 m) | 1 px (80 m) |
|---|---|---|---|---|---|---|
| Points | 100 | 92 | 61 | 28 | 14 | 0 |

Clicking the centre of the brightest pixel misses by about 0.38 px (31 m) on average, even at high signal, because the true position is spread uniformly within the pixel. Pixel-level picking therefore scores around 30 points a round, and only sub-pixel judgement scores well.

**Reveal.** Shows the true head, the visitor's mark, and the error line, with the miss in pixels and metres. With comparisons on, it also shows:
- the brightest-pixel answer, which is what pixel-level picking gives;
- a Gaussian fit on the same noisy frame: a least-squares fit of the pixel-integrated model over a 7 by 7 window, using Gauss-Newton started from the brightest pixel.

The fit illustrates the pipeline's approach but is not its code. A caption gives the real result: the automated pipeline improved spatial accuracy by a factor of 4 over manual reduction.

**Game.** Five rounds. The final screen shows the visitor's total out of 500 beside the brightest-pixel total and the fit's total on the same rounds. The visitor's best score is kept in `localStorage`, wrapped in try/catch.

| Option | Default | Range | Control |
|---|---|---|---|
| `noise_level` | 1.0 | 0.5 to 2.0 | Slider, "Noise level" |
| `show_comparison` | true | | Toggle, "Show comparisons" |
| `show_subpixel_grid` | false | | Toggle, "Show sub-pixel grid" |
| `meteor_rate` | 0.5 per s | 0.1 to 2 | |
| `auto_detect` | false | | |
| `game` | false | | Button, "Start game" |

| Preset | Options | Overlays |
|---|---|---|
| `raw` (The question) | `auto_detect: false`, `game: false` | none |
| `pipeline` (What I built) | `auto_detect: true` | `boxes`, `fits`, `head_estimates` (from the same Gaussian fit) |
| `game` (Result) | `game: true` | `score` |

**Tile.** Single rounds that zoom to a 16 by 10 pixel window filling the tile (about 18 screen px per sensor px), without the magnifier. The result shows as a tag such as "0.12 px (10 m) off, 89 points".

**Tests.**
- Points are 100, 92, 61, 28, and 14 at 0, 0.1, 0.25, 0.4, and 0.5 px.
- The pixel-integrated head sums to its amplitude, and its noiseless centroid recovers the true position within 0.001 px.
- The Gaussian fit recovers the truth within 0.05 px at a signal-to-noise ratio of 50.
- Screen-to-sensor mapping is accurate within 0.01 px at several zoom levels and pixel ratios.

### 15.4 Quantum subradiance (`subradiance`)

**Model.** A classical analogy: $N$ point emitters on a line with spacing $d$ (in wavelengths), each with phase $j\,\Delta\varphi$. The display is a 2D slice of their spherical waves, softened near each source:

$$E(\mathbf r, t) = \sum_{j=0}^{N-1}\frac{\cos\!\big(k\rho_j - \omega t + j\,\Delta\varphi\big)}{k\rho_j + 1},\qquad \rho_j = |\mathbf r - \mathbf r_j|,\ \ k = \frac{2\pi}{\lambda}$$

Distances $k\rho_j$ are precomputed per emitter whenever spacing or count changes, on a grid of 160 by 100 (pages) or 96 by 60 (tiles).

**Glow meter (exact for isotropic emitters).** Total radiated power relative to the same emitters radiating independently:

$$\frac{P}{P_{\text{indep}}} = 1 + \frac{2}{N}\sum_{m=1}^{N-1}(N - m)\,\frac{\sin(mkd)}{mkd}\,\cos(m\,\Delta\varphi)$$

This gives $N$ for in-phase emitters packed closely (superradiant), tends to 0 for an even number of closely packed emitters in antiphase (subradiant), and equals exactly 1 at a spacing of half a wavelength, where the effect disappears. That last point is worth a caption: collective effects need emitters closer than a wavelength. Reference values for 4 emitters at 0.15 wavelengths: 2.85 in phase, 0.16 in antiphase. The meter uses a log scale from 0.05 to $N$ with a mark at 1, labelled "independent emitters".

| Option | Default | Range | Control |
|---|---|---|---|
| `emitter_count` | 4 | 2 to 8 | Slider, "Emitters" |
| `spacing` | 0.15 wavelengths | 0.05 to 1.0, step 0.05 | Slider, "Spacing (wavelengths)" |
| `phase_deg` | 0 | 0 to 180, step 5 | Slider, "Phase difference" |
| `sweep` | false | | |

| Preset | Options | Overlays |
|---|---|---|
| `in-phase` (The question) | `phase_deg: 0` | `glow_meter` |
| `phase-sweep` (What I built) | `sweep: true` | `glow_meter` |
| `subradiant` (Result) | `phase_deg: 180`, `spacing: 0.15` | `glow_meter`, `caption` |

With `sweep` on, the phase follows $\Delta\varphi(t) = 90^\circ\big(1 - \cos(2\pi t / 8\,\text{s})\big)$.

**Honesty label** (always visible on the page): "Classical analogy. In the experiment, subradiance is a collective quantum effect among molecules in a gas; this picture shows only the classical idea that emitters out of phase can cancel."

**Tile.** Horizontal pointer position sets the phase difference, from 0 at the left edge to 180 degrees at the right.

**Tests.** The power formula returns $N$ at $\Delta\varphi = 0$ with $d \to 0$, 0 at $\Delta\varphi = 180^\circ$ with $d \to 0$ and even $N$, and 1 at $d = \lambda/2$.

### 15.5 CubeSat orbits (`cubesat`)

**Map.** A north polar azimuthal equidistant projection centred on the pole, reaching down to 40 degrees north:

$$\rho = R_{\text{map}}\,\frac{90^\circ - \phi}{90^\circ - 40^\circ},\qquad x = \rho\sin\lambda,\ \ y = \rho\cos\lambda$$

with Greenwich at the bottom of the map. Coastlines come from Natural Earth 1:110m land polygons (public domain), clipped at 40 degrees north and simplified to 15 KB or less in `data/coast.json`.

**Orbit.** Circular, no J2 precession or drag:

$$a = R_E + h,\qquad n = \sqrt{\mu / a^3},\qquad u = u_0 + n\,t$$

$$\phi = \arcsin(\sin i\,\sin u),\qquad \lambda = \Omega_0 + \operatorname{atan2}(\cos i\,\sin u,\ \cos u) - \omega_\oplus t$$

with $R_E$ = 6371 km, $\mu$ = 398600.4418 km³/s², and $\omega_\oplus$ = 7.2921 × 10⁻⁵ rad/s.

**Footprint.** The Earth central angle covered at minimum elevation $\varepsilon_{\min}$:

$$\lambda_{\max} = \arccos\!\left(\frac{R_E}{R_E + h}\cos\varepsilon_{\min}\right) - \varepsilon_{\min}$$

A station is covered when its great-circle angle from the sub-satellite point is at most $\lambda_{\max}$. The footprint is drawn as a projected small circle from 72 points. Reference values for tests: at 500 km and 10 degrees, $\lambda_{\max}$ = 14.06 degrees (a ground radius of about 1,560 km) and the period is 94.5 minutes.

**Reach limit.** With $i' = \min(i,\ 180^\circ - i)$, no station north of $i' + \lambda_{\max}$ is ever covered. The `reach_circle` overlay draws that latitude, which shows at a glance why low inclinations miss the high Arctic.

**Coverage.** The share of stations passed at least once since the last reset. Time warp runs one orbit per real second; normal speed is 30 sim-seconds per real second.

**Stations.** `data/stations.json` holds latitude and longitude for about 1,000 points: real MOTUS stations if their use is cleared **[CONFIRM]**, otherwise synthetic points between 55 and 83 degrees north, weighted toward coastlines.

| Option | Default | Range | Control |
|---|---|---|---|
| `inclination_deg` | 97.5 | 0 to 110, step 0.5 | Slider, "Inclination" |
| `altitude_km` | 500 | 300 to 800, step 10 | Slider, "Altitude (km)" |
| `min_elevation_deg` | 10 | 0 to 30, step 1 | Slider, "Minimum elevation" |
| `time_warp` | false | | Toggle, "Time warp" |
| `station_set` | synthetic | real, synthetic | |
| `show_sat` | true | | |

Defaults are generic for a 500 km sun-synchronous-style orbit until the Skylark's planned orbit is confirmed (section 9).

| Preset | Options | Overlays |
|---|---|---|
| `stations` (The question) | `show_sat: false` | none |
| `orbit` (What I built) | `show_sat: true`, `time_warp: false` | `footprint` |
| `coverage` (Result) | `show_sat: true`, `time_warp: true` | `footprint`, `reach_circle`, `coverage_readout` |

**Tile.** Horizontal pointer position sets inclination from 40 to 110 degrees.

**Tests.** The footprint and period reference values above; a 45 degree orbit never covers a station at 75 degrees north with a 14 degree footprint.

---

## 16. Quality budgets, testing, and CI

### 16.1 Budgets

| Item | Budget |
|---|---|
| Home page JavaScript (engine plus planetary defence sim) | 35 KB gzipped or less |
| Planetary defence data (one year, loaded after first paint) | 80 KB gzipped or less |
| Research page JavaScript (engine plus one sim) | 40 KB gzipped or less |
| Featured tile frame time, mid-range laptop at pixel ratio 1.5 | 4 ms or less |
| Research page sim frame time | 8 ms or less |
| Hero image at 1440 px wide | 200 KB or less |
| Layout shift from sims or images | None (fixed aspect ratios) |
| Lighthouse, mobile | Performance 90+, Accessibility 100, Best Practices 95+, SEO 100 |

### 16.2 Tests
- **Unit (Vitest):** the sim math tests listed in section 15, `ordered()`, and each check in `validate.ts`.
- **Content fixtures:** one valid content set plus several broken files (missing field, bad slug, wrong preset key, missing image), each expected to fail with its specific message. This automates most of section 1.4.
- **Smoke (Playwright, about eight tests):** the home page upgrades the featured still to a canvas; clicking an asteroid opens its card; drawing a contrail adds an observation; a meteor game round produces a score; a click on the zoomed frame lands at the expected sensor coordinate within 0.01 px; scrolling a research page changes the active preset; the mobile viewport shows chips and no pinned sim; reduced motion shows stills; no console errors on any page.
- **Accessibility:** axe checks on the home page, one research page, one project page, and one small page.
- **Lighthouse CI** on the home page and one research page, failing below the budgets.
- **Link check:** a weekly scheduled run over the built site that opens a GitHub issue if any external link breaks.

### 16.3 CI workflow
On every push to `main`: install, `astro check`, Vitest, `astro build`, Playwright against the built preview, then deploy to GitHub Pages. Pull requests run everything except the deploy. The weekly link check runs on its own schedule. If the repository is not `<username>.github.io` and no custom domain is set yet, Astro's `base` option must be set to the repository name, or every link breaks.

---

## 17. Content drafts

First drafts, written from your records in the project's usual voice: first person, measured, plain language. **[ADD]** marks information only you can supply; pages containing it stay `draft: true` until it is filled. Summaries, captions, and results go in frontmatter; the rest is body text.

### 17.1 Research intro (`research-intro.md`)
I work on things that move through the sky and the tools that measure them: faint meteors, near-Earth asteroids, contrails, and a small satellite, with one detour into quantum optics in the lab.

### 17.2 Tile and summary fields

| Page | `summary` | `tile.caption` | `tile.result` | `glyph` |
|---|---|---|---|---|
| Planetary defence | Measuring how much warning we get before newly discovered near-Earth asteroids make their closest approach. | How much warning do we get? | null (live date and counters) | planet |
| Contrail winds | Using camera observations of drifting contrails to correct the reanalysis winds that climate and flight models rely on. | Draw a contrail, correct the wind | RMSE 2.50 to 1.84 m/s | contrail |
| Quantum subradiance | Building an experiment to test whether a room-temperature gas can collectively radiate less than its molecules would alone. | Can a gas glow less together? | PhUnC 2026, 2nd place | wave |
| Faint meteors | Automating the measurement of very faint meteors recorded by EMCCD cameras, with better accuracy than reduction by hand. | Can you find the meteor's head? | 4x accuracy, 200,000 trajectories | meteor |
| CubeSat orbits | Designing and testing the orbit for a CSA-funded CubeSat meant to reach about 1,000 Arctic wildlife-tracking stations. | Which orbit reaches the Arctic? | 7 CSA tests passed | satellite |

### 17.3 Planetary defence

**The question.** Most near-Earth asteroids are found by surveys scanning the night sky, which leaves a blind spot toward the Sun. I'm measuring how much warning we actually get before newly discovered asteroids make their closest approach to Earth, and how that warning depends on where in the sky they come from.

**What I'm building.** Earlier studies simulated synthetic asteroid populations. This project works from the real record instead: the Minor Planet Center's catalogue of near-Earth asteroids and JPL's Close Approach Database. For each recent close approach I compare the discovery date with the date of closest approach, map where the asteroid sat in the sky relative to the Sun, and look at how size, miss distance, speed, and orbit class change the picture.

The next step is to propagate orbits backwards to estimate when each asteroid first became plausibly visible to a survey (for example, brighter than magnitude 21 and more than 60 degrees from the Sun) and compare that with when it was actually found.

**Result.** In progress. Results will appear here as the analysis comes together.

**Progress log.**
- September 2026: Started the project with Prof. Paul Wiegert and defined the data sources and research questions.
- **[ADD]** later milestones.

### 17.4 Contrail winds

**The question.** Weather reanalyses like ERA5 supply the winds that climate and flight models depend on, but at cruise altitude they can be off by a few metres per second. Contrails drift with the wind, so a camera watching them is in effect measuring it. Can those observations correct the reanalysis?

**What I built.** At TU Delft's NEOSAT Lab I installed a contrail detection camera, then built the tools that turn its footage into wind measurements: tracking contrails between frames, robust line fitting, and projecting camera pixels onto latitude and longitude.

The correction is a Gaussian process model. It treats the error in ERA5's winds as a smooth unknown field across space, altitude, and time, and estimates that field from Global Meteor Network contrail observations, each of which averages the wind along a contrail's length.

**Result.** In walk-forward validation the corrected winds had an RMSE of 1.84 m/s, compared with 2.50 m/s for ERA5, removing about 60% of the error above the measurement noise floor. Mean bias fell from +0.65 to +0.10 m/s.

### 17.5 Quantum subradiance

**The question.** When many molecules emit together, their emission can interfere so that the group radiates less than the same molecules would on their own. Houde and Rajabi (2025) proposed that this suppression, steady-state subradiance, could appear in an ordinary room-temperature gas. Can it be seen in the lab?

**What I built.** I designed and assembled the precision optics for the experiment and wrote custom tools to analyse its measurements. Along the way the target gas changed from carbon monoxide (CO) to methyl cyanide (CH3CN), observed near 331 GHz. **[CONFIRM before adding:** "We have since detected thermal emission from the gas; the next step is the measurement with the beam on."**]**

**Result.** The work won 2nd place at the Physics Undergraduate Research Conference (PhUnC) 2026 and 3rd place at the Western Student Research Conference 2026.

### 17.6 Faint meteors

**The question.** Electron-multiplying CCD (EMCCD) cameras record meteors far too faint to see with the eye, in the hundreds of thousands. Measuring each one by hand is slow and imprecise. Can the measurement be automated without losing accuracy?

**What I built.** An automated reduction pipeline that finds faint meteors in EMCCD frames and measures their positions frame by frame, combining computer vision (OpenCV), particle swarm optimization, and numerical fitting.

**Result.** Compared with manual reduction, the pipeline improved spatial accuracy by a factor of 4 and cut measurement uncertainty by a factor of 3, opening about 200,000 faint-meteor trajectories to analysis.

### 17.7 CubeSat orbits

**The question.** The Western Skylark is a 3U CubeSat funded by the Canadian Space Agency, meant to connect about 1,000 isolated MOTUS wildlife-tracking stations across the Arctic. Which orbit reaches those stations while passing the agency's safety requirements?

**What I built.** As orbital dynamics team lead, I designed and completed seven CSA-mandated tests covering conjunction risk, de-orbit timing, and debris, using Ansys STK and NASA's Debris Assessment Software. I was the youngest team lead on a team of more than 60 students.

**Result.** The analysis supported an orbit able to reach about 1,000 Arctic stations for the $350,000 CSA-funded mission.

### 17.8 Projects

**Quantum portfolio optimization**
- Overview: A Western Quantum Computing Club project testing whether quantum optimization can help choose an ETF portfolio.
- What I did: I formulated portfolio selection as quadratic unconstrained binary optimization (QUBO) problems and solved them with D-Wave's Ocean SDK and IBM's Qiskit. I then benchmarked the quantum approaches against classical solvers on historical market data, comparing performance and statistical robustness.
- Outcome: **[ADD]** what the benchmark showed. **[CONFIRM]** presented at the Western Quantum Innovation Showcase 2025.

**Hackathons** (`draft: true` until filled)
- Overview: Weekend builds with teams at four hackathons.
- Subsections: Western Automotive AI Challenge 2025, **[CONFIRM]** 2nd or 3rd place, **[ADD]** what the team built. QAI Ventures GenQ Quantum Hackathon, Calgary, **[CONFIRM]** year, 5th place, **[ADD]** what the team built. HackWestern 2026, **[ADD]** project and outcome. NASA Space Apps Challenge 2026, **[ADD]** project and outcome.

**SX-70 remote timer** (`draft: true` until filled)
- Overview: A homemade remote shutter timer for the Polaroid SX-70.
- What I did: **[ADD]** circuit approach, parts, how it triggers the shutter.
- Outcome: **[ADD]** whether it works in the field and what you shot with it.

**justindtphoto.com** (`draft: true` until filled)
- Overview: My film photography portfolio, built with the foto static site generator and hosted on GitHub Pages.
- What I did: **[ADD]** setup, scanning workflow, customizations.
- Outcome: Live at justindtphoto.com.

**This website**
- Overview: The site you're reading: Astro, markdown content, and hand-written Canvas2D simulations of each research project.
- What I did: Designed the content system so every page is a folder of markdown and images, and wrote a small engine that runs every simulation, from the home page tiles to the research pages.
- Outcome: **[ADD]** launch date.

### 17.9 Interests and volunteer pages

**Film photography.** I shoot 35mm and large format film and make my own prints in the darkroom, especially black-and-white. My portfolio lives at justindtphoto.com.

**Portaging.** Whenever I can, I head into the backcountry on portaging trips, paddling between lakes and carrying the canoe across the land in between. **[ADD]** favourite parks or routes, and a trip photo.

**Science Soph.** Sophs are upper-year volunteers who welcome first-year students to Western during Orientation Week and help them settle in academically and socially. Science Sophs are easy to spot in their tie-dye lab coats and neon green hats. **[ADD]** one sentence on why you joined.
- Role: Science Soph, May 2026 to present (responsibilities as in the volunteer template, section 3.5).

**CAISA Fashion Show.** The CAISA Fashion Show is one of the largest student-run charity fashion shows in Canada. Over 28 years it has raised more than $440,000 for Children's Health Foundation, supporting healthcare research for children and youth. **[ADD]** one sentence on why you joined.
- Role: Director of Photography, September 2025 to present (Photography Executive in 2025-26).
- Lead a five-person photography team and direct the show's creative imagery.
- Plan and run photoshoots with the stage design and graphics teams.
- Run workshops and mentor members of the photo team.
- Shoot alongside the team at shoots and on show day.

**Vietnamese Students' Association.** **[ADD]** one to two sentences on what the association does and why you joined.
- Role: **[CONFIRM]** VP or Co-VP External Affairs, September 2025 to present (External Affairs Executive in 2025-26).
- Find and secure sponsorships for the association's events.
- Manage relationships with sponsors through the year.

**Western Peer Leaders.** **[ADD]** one to two sentences on the program.
- Role: Scholars Electives Mentor, **[CONFIRM]** start month 2025 to present.
- **[ADD]** two to four responsibilities.

### 17.10 Other page copy
- **CV page body:** Education: Honours BSc in Physics with a major in Scientific Computing, Western University, expected 2028; Scholar's Electives Program; Dean's Honour List in 2024-25 and 2025-26. Research positions: the five research pages, with dates. Awards: Rogers Family Award (2026), Western Scholarship of Distinction (2024), International Learning Award (2025), PhUnC 2026 2nd place, Western Student Research Conference 2026 3rd place, and Mitacs Globalink **[CONFIRM]** whether listed as an award.
- **404 page:** "This page doesn't exist. It may have moved when the site was reorganized." Links: "Go to the home page" and "Browse research".
- **Footer:** the "Last updated" month comes from the build date, so it never needs editing.

---

## 18. Handoff brief for the build agent

**Goal.** Build phases 1 and 2 of section 10: the full content system with every page type, then the shared sim engine and the planetary defence sim, deployed to GitHub Pages. Stop after phase 2 for Justin's review.

**Read in this order.** Sections 0 and 1 (decisions and maintainability rules), this section, 2 and 3 (structure and page formats), 12 and 13 (schemas and ordering), 14 (engine), 15.1 (planetary defence sim), 7 (design), 16 (budgets and tests). Use section 17 for page text.

**Ground rules**
- All visible text lives in `src/content/`, never in components (rule 1).
- Code style: tabs for indentation in all code; YAML is the only exception, because it requires spaces. Comments go on the line before the code, or as a short trailing comment; never column-aligned comments.
- No em dashes in any user-facing text.
- Never invent facts. Anything marked **[CONFIRM]** or **[ADD]** stays as a placeholder, and pages containing **[ADD]** ship with `draft: true`.
- Decisions in section 0 are settled. Raise any reason to deviate with Justin instead of changing course silently.

**Phase 1: content skeleton (definition of done)**
- [ ] Astro 6 project, TypeScript strict, Node 22.12 or newer, deploying through GitHub Actions.
- [ ] `content.config.ts` with every schema in section 12.2, the custom loaders in 12.1, and `validate.ts` covering every check in 12.3.
- [ ] `ordered()` and the routes in section 13, including drafts, redirects, the 404 page, and the sitemap.
- [ ] All layouts rendering the section 17 drafts, with still images where sims will go.
- [ ] Tokens, fonts, and type scale from section 7; responsive to 360 px; visible keyboard focus.
- [ ] Every acceptance test in section 1.4 passes, plus the content fixtures in 16.2.
- [ ] `EDITING.md` drafted from section 8.

**Phase 2: engine and vertical slice (definition of done)**
- [ ] `engine.ts`, `types.ts`, the registry, `SimHost`, and `SimControls` as specified in sections 5.1 and 14.
- [ ] Progressive enhancement, loading policy, adaptive quality, and failure handling (14.1 to 14.3, 14.11).
- [ ] Preset transitions, desktop scroll sync, and mobile chips (14.5 to 14.7).
- [ ] The planetary defence sim exactly as in section 15.1, in the featured tile and on its research page, with its unit tests, plus `scripts/pha_data.py` (Python) exporting the year of close approaches.
- [ ] Reduced motion, accessibility, and performance budgets met (14.10, 16.1), with the Playwright smoke tests passing.

**Known gotchas**
- Images referenced from frontmatter must go through Astro's `image()` schema helper to be validated and optimized; files under `public/` are not processed.
- `meta.ts` must stay free of browser APIs (section 12.4).
- YAML titles containing a colon must be quoted.
- Fonts need the `latin-ext` subset.
- Set Astro's `base` option if deploying to a project page without a custom domain (section 16.3).
- Verify the `file()` loader's current behaviour before writing custom loaders (section 12.1).

**Report back at the end of phase 2:** the repository link, the deployed URL, any deviations from this plan and why, and a list of open questions for Justin.

---

## 19. Multi-session build protocol

The build will be split across sessions, credit limits, and different agents. This section keeps the work resumable: any agent can pick up from the status table without having seen earlier sessions.

### 19.1 Session protocol
1. **Orient.** Read the "Start here" block, the status table (19.4), the latest session log entry (19.5), and the open questions (19.6).
2. **Pick one work package.** Take the first package in 19.3 whose dependencies are done, unless Justin names one. Small packages can be combined if context allows.
3. **Read narrowly.** Read only the plan sections the package lists, plus sections 0, 1, and 18 if this is your first session on the project.
4. **State the plan.** Before writing code, write a short list of the steps you will take.
5. **Work on a branch** named `wp<NN>-<short-name>`. Merge to `main` only when the package's "done when" is met and CI passes.
6. **Checkpoint often.** After each finished sub-task, commit and update the package's row in 19.4. An abrupt cutoff should lose at most one sub-task.
7. **Stop cleanly.** When the session has read many large files, has run long, or credits are close to the limit, start no new sub-task. Finish or revert the current one, commit, set the package's state, and write a session log entry. Never leave uncommitted work.
8. **Deviations.** If the plan must change, edit the relevant section, add a line under a new "Changes in v9.x" heading at the top, and note it in the session log. Decisions in section 0 change only with Justin's approval.
9. **Questions.** Anything only Justin can answer goes in 19.6. Never guess facts; the **[CONFIRM]** and **[ADD]** rules in section 18 apply.
10. **Style.** Tabs for indentation in all code (YAML is the only exception); comments on the line before the code or short trailing comments, never column-aligned; no em dashes in user-facing text; Python for scripts.

### 19.2 Agent instruction files
WP01 creates `CLAUDE.md` at the repository root, which Claude Code reads at the start of every session. It also creates an identical `AGENTS.md` for other tools.

```markdown
# Personal website: agent instructions

The full plan is `docs/website-plan.md`. It is the source of truth.

At the start of every session:
1. Read the "Start here" block at the top of the plan.
2. Read section 19 (build protocol), the status table in 19.4, and the latest entry in 19.5.
3. Take the next open work package in 19.3, or the one Justin names, and read only the sections it lists.

While working:
- Branch per package (`wp<NN>-<short-name>`); merge when "done when" is met and CI passes.
- Commit and update 19.4 after every finished sub-task.
- Tabs for indentation in all code except YAML; comments on their own line or short trailing; never column-aligned comments.
- All visible site text lives in `src/content/`; never invent facts; leave **[CONFIRM]** and **[ADD]** placeholders in place.
- Decisions in section 0 of the plan change only with Justin's approval.

Before stopping:
- Commit everything, update the package's row in 19.4, and add a session log entry in 19.5.
- Put questions for Justin in 19.6.
```

### 19.3 Work packages

| ID | Package | Plan sections | Depends on | Done when |
|---|---|---|---|---|
| WP01 | Repository scaffold: Astro 6, TypeScript strict, `.editorconfig` (tabs, YAML spaces), formatter set to tabs, GitHub Actions deploy, placeholder `site` and `base`, plan committed to `docs/`, `CLAUDE.md` and `AGENTS.md` | 10, 16.3, 18, 19.2 | none | A placeholder page deploys to GitHub Pages from `main` |
| WP02 | Content config, custom loaders, and schemas with a small fixture content set | 2, 12.1, 12.2 | WP01 | Every collection loads; a bad field fails the build |
| WP03 | Cross-file checks and content fixture tests | 12.3, 12.4, 16.2 | WP02 | Every check in 12.3 has a passing fixture test |
| WP04 | Ordering, drafts, routes, redirects, 404, sitemap | 13 | WP02 | Unlisted, draft, and redirected pages behave as specified |
| WP05 | Tokens, fonts, type scale, top bar, footer, base layout | 7 | WP01 | Pages render in the design system at 360 px and up, with visible focus |
| WP06 | Research page layout (still image in the sim slot), glyph sub-nav, prev/next, outputs, research index | 3.1, 3.2 | WP04, WP05 | Research pages and the index render from content |
| WP07 | Project page and list, small pages, generic page, CV page, home page | 3.3 to 3.6, 6 | WP04, WP05 | Every page type renders from content |
| WP08 | Content entry from section 17, placeholder images, `EDITING.md`, acceptance tests | 1.4, 8, 17 | WP06, WP07 | Every acceptance test in 1.4 passes on the deployed site |
| WP09 | Sim types, registry, engine core, `SimHost` (loop, sizing, theme, loading policy, progressive enhancement, failure handling) | 5.1, 14.1 to 14.4, 14.11 | WP06 | A test sim upgrades a still image to a canvas and pauses offscreen |
| WP10 | `SimControls`, readouts, preset transitions, scroll sync, mobile chips, `?sim-debug` | 14.5 to 14.10 | WP09 | A test sim follows sections on desktop and chips on mobile |
| WP11 | `scripts/pha_data.py` and the exported 2025 data | 15.1 | WP01 | The JSON is committed with counts printed per cutoff, within the data budget |
| WP12 | Planetary defence sim with tests, in the featured tile and on its page | 15.1, 16.1 | WP10, WP11 | Section 18's phase 2 checklist is met. **Stop here for Justin's review.** |
| WP13 | Contrail winds sim | 15.2 | WP12 | Spec and tests in 15.2 met |
| WP14 | Faint meteor game | 15.3 | WP12 | Spec and tests in 15.3 met, including the 0.01 px mapping test |
| WP15 | Quantum subradiance sim | 15.4 | WP12 | Spec and tests in 15.4 met |
| WP16 | CubeSat sim, coastline and station data | 15.5 | WP12 | Spec and tests in 15.5 met |
| WP17 | Link-preview images, Lighthouse CI, axe checks, weekly link check | 7, 16 | WP12 | Budgets in 16.1 enforced in CI |
| WP18 | Content pass with Justin's answers to 19.6, figures, real photos, final CV PDF | 9, 17 | WP08 | No **[ADD]** markers remain on published pages |
| WP19 | Launch: domain, mobile and reduced-motion pass, section 9 checklist, `EDITING.md` review | 9, 10, 11 | WP13 to WP18 | Site live on its domain, linked from email signature and LinkedIn |

### 19.4 Build status
States: todo, in progress, blocked, review, done.

| ID | State | Branch or PR | Last updated | Notes |
|---|---|---|---|---|
| WP00 | done | | 2026-11-19 | Planning, plan v1 to v9 |
| WP01 | todo | | | |
| WP02 | todo | | | |
| WP03 | todo | | | |
| WP04 | todo | | | |
| WP05 | todo | | | |
| WP06 | todo | | | |
| WP07 | todo | | | |
| WP08 | todo | | | |
| WP09 | todo | | | |
| WP10 | todo | | | |
| WP11 | todo | | | |
| WP12 | todo | | | |
| WP13 | todo | | | |
| WP14 | todo | | | |
| WP15 | todo | | | |
| WP16 | todo | | | |
| WP17 | todo | | | |
| WP18 | todo | | | |
| WP19 | todo | | | |

### 19.5 Session log
Newest entry first. Template:

```
YYYY-MM-DD | agent or tool | packages touched
Done: what was completed and merged
State: where unfinished work stands, and on which branch
Next: the first concrete step for the next session
Deviations: plan changes made, or "none"
```

```
2026-11-19 | Claude (chat) | WP00
Done: plan v1 to v9, including schemas, engine and sim specs, content drafts, and this protocol
State: no repository yet
Next: WP01, create the repository and commit this plan to docs/website-plan.md
Deviations: none
```

### 19.6 Open questions for Justin
- Domain (section 11). Needed only for WP19.
- Repository name, and whether the agent may create the GitHub repository itself or Justin creates an empty one first. Needed for WP01.
- The **[CONFIRM]** items in section 9. Needed by WP18.
- The **[ADD]** items in section 17. Needed by WP18.

### 19.7 Prompts to paste
**First session:**

> I'm starting the build of my personal website. The complete plan is attached as `website-plan.md`. Read the "Start here" block at the top and follow the session protocol in section 19. This is the first session, so begin with WP01: set up the repository, commit the plan to `docs/website-plan.md`, and add `CLAUDE.md` and `AGENTS.md` from section 19.2. Continue through the work packages in order until your context or credits run low, then stop cleanly as section 19.1 describes. Don't change decisions in section 0 or invent facts; put questions for me in section 19.6.

**Later sessions:**

> Continue building my personal website. The plan is `docs/website-plan.md` in the repository (attached if you can't see it). Start with the "Start here" block, then follow section 19: check the status table in 19.4 and the latest log entry, and take the next open work package. Stop cleanly before your context or credits run low.

To target one package, add "Work on WPxx" to either prompt.