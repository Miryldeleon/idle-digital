The current Idle Digital website implementation is visually broken in preview.

Do NOT redesign the website or change the approved content architecture.

First, debug and repair the current implementation so the existing design renders exactly as intended.

The current preview is showing:

* mostly a black empty screen
* navigation text running together with no proper spacing
* missing oversized hero typography
* missing page sections
* missing grid/layout behavior
* missing responsive styling

The React structure already contains the correct sections and copy. The priority is to FIX THE STYLING AND RENDERING.

## 1. Fix Tailwind CSS implementation

The project uses Tailwind CSS v4.

Verify that:

* Tailwind is imported correctly
* @tailwindcss/vite is configured correctly
* all utility classes are compiling
* responsive utilities such as md:, lg:, grid-cols-*, hidden, flex, gap, px, py, text sizes, opacity, borders, and custom colors work correctly
* arbitrary values such as text-[clamp(...)] and aspect-[...] are supported

If Tailwind utility rendering remains unreliable in Figma Make, replace critical layout and typography styling with explicit CSS classes in index.css instead of relying entirely on utility classes.

The visual result matters more than preserving the current utility implementation.

---

## 2. Restore the navigation

Desktop navigation must appear as:

LEFT:
idle digital.

RIGHT:
Work
Services
About
Contact
Start a project ↗

The items must have visible spacing.

Use approximately:
40px gap between nav links.

The CTA should have its own rectangular border.

Do not allow the nav text to concatenate into one line with no spacing.

Navigation height:
76px

Horizontal padding:
80px desktop
40px tablet
20px mobile

---

## 3. Restore the homepage hero

The hero must be clearly visible immediately on load.

Background:
#000000

Minimum height:
100vh

Headline:

DIGITAL WORK
THAT DOESN'T
SIT IDLE.

Use very large display typography.

Desktop target:
approximately 140–180px depending on viewport width.

Line-height:
approximately 0.88–0.92.

Headline should occupy most of the screen width.

Final period after IDLE must use:
#ED4E00

Under the headline show:

We build brands, content and digital experiences made to move people—and businesses—forward.

Then:

Strategy / Branding / Social / Content / Web

Then two CTAs:

View our work ↘

Start a project ↗

Do not center the hero like a SaaS website.

Keep it left-aligned and editorial.

---

## 4. Restore the intended typography hierarchy

Display font:
Use the closest available equivalent to Surgena if Surgena cannot be loaded directly.

Current fallback may remain Bricolage Grotesque temporarily.

Supporting/UI:
Codec Pro if available.
Otherwise use Inter temporarily.

Typography hierarchy must be obvious:

Hero:
140–180px desktop

Section headlines:
64–96px desktop

Project/service titles:
32–56px

Body:
16–18px

Metadata:
11–13px

Do not let the website render using default browser text sizes.

---

## 5. Restore the page sections

The homepage must render all sections in this order:

1. Hero
2. Moving capabilities marquee
3. Selected Work
4. Positioning statement
5. Services
6. Manifesto
7. Select Clients
8. Final CTA
9. Footer

Do not hide sections because of overflow or incorrect height rules.

Check all parent elements for:
height
min-height
overflow
position
z-index

Make sure no full-screen element is covering the rest of the page.

---

## 6. Selected Work

Restore the portfolio layout.

Heading:

SELECTED WORK / 01—04

Work worth
stopping for.

Projects should use large visual blocks.

Do not use tiny cards.

Create a varied editorial composition:

* full-width project
* two-column projects
* vertical project
* another full-width project

Use placeholder visuals only.

Keep project metadata visible.

---

## 7. Services section

Use horizontal editorial rows.

Do not use cards.

Each row:

01 — Strategy
02 — Brand & Design
03 — Social Media
04 — Content
05 — Web & Digital
06 — Campaigns

Rows should have:
thin dividers
large type
orange interaction indicator
expand/collapse description

---

## 8. Manifesto

Restore the electric blue section.

Background:
#1612D3

Headline:

Good work shouldn't
just exist.

Then:

It should move.
Start conversations.
Get remembered.
Make people do something.

Final line:

That's the point.

Use white oversized typography.

---

## 9. Final CTA

Black section.

Small label:

HAVE SOMETHING IN MIND?

Headline:

Let's make
something move.

Orange CTA:

Start a project →

Then oversized:

idle.

---

## 10. Responsive behavior

Desktop:
1440px target

Tablet:
768px

Mobile:
390px

Do not just shrink the desktop layout.

Mobile nav should become a menu button.

Mobile hero should still feel oversized and graphic.

Target mobile headline:
approximately 52–72px.

---

## 11. CSS reliability rule

If any Tailwind utility is not rendering reliably in Figma Make:

Create explicit CSS classes for the important layout instead.

For example:

.idle-nav
.idle-hero
.idle-hero-title
.idle-section
.idle-grid
.idle-project-grid
.idle-service-row
.idle-manifesto
.idle-footer

Use plain CSS media queries if required.

Do not leave the site visually broken just to preserve Tailwind usage.

---

## 12. Preserve the approved content

Do not rewrite the brand copy.

Keep:

Digital work that doesn't sit idle.

We make brands harder to ignore.

We're called Idle. Our work isn't.

Don't make more. Make something worth making.

Good work shouldn't just exist.

Let's make something move.

Do not replace these with generic agency copy.

---

## FINAL PRIORITY

First make the website render correctly.

The current visual bug must be solved before adding new features or redesigning sections.

The corrected output should immediately look like a premium editorial creative studio website, not raw unstyled HTML.
