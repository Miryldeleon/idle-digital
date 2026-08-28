# IDLE DIGITAL — LOADING SCREEN + DAY/NIGHT HERO REDESIGN

Redesign ONLY the Idle Digital loading experience and homepage hero.

Do not change the approved navigation, pages, business architecture, services, plans, About page, Contact page, or remaining homepage sections.

This update is specifically focused on creating a memorable opening experience built around the concept:

**THE CLIENT CAN LOG OFF. IDLE DIGITAL KEEPS WORKING.**

The hero should visually communicate that digital work continues even while the client is sleeping.

The final production website will later be implemented using GSAP and GSAP ScrollTrigger.

Design all motion-ready elements as independent layers.

---

# CORE CREATIVE IDEA

Create a scroll-controlled DAY → NIGHT → DAY time-lapse experience.

The concept should connect directly to the name:

IDLE.

The visitor should feel:

“I can stop thinking about the work. Idle keeps it moving.”

Use the mood of the existing Idle Digital pubmat:

* dark blue atmosphere
* night-sky feeling
* strong white branding
* moon/crescent visual
* cinematic calmness

However, keep the final design premium and editorial.

Avoid making it look like a literal astronomy or space website.

---

# BRAND COLOR HIERARCHY

Primary:

ELECTRIC BLUE
#1612D3

Night:

DEEP NAVY
#000051

Supporting:

BLACK
#000000

WHITE
#FFFFFF

Accent only:

ORANGE
#ED4E00

Orange should represent:

* sunrise
* active states
* important punctuation
* status changes
* interaction

Do not use orange as a large dominant background.

---

# PART 01 — LOADING SCREEN

Create a full-screen animated loader.

Background begins electric blue.

Place a large pill-shaped DAY / NIGHT toggle in the center.

Example:

DAY    ○────────●    NIGHT

or a minimal sun/moon version.

The toggle should feel like a physical switch rather than a standard form control.

Use:

thin borders

Codec Pro labels

large rounded pill

one circular sliding knob

---

# LOADING ANIMATION CONCEPT

The loading experience should automatically animate.

The visitor should NOT be required to interact to enter the website.

Sequence:

1. Electric-blue loading screen appears.

2. Idle logo appears subtly.

3. DAY / NIGHT pill toggle enters.

4. Toggle automatically moves from DAY toward NIGHT.

5. As it moves:

   * background becomes deep navy
   * stars gradually appear
   * crescent / Idle mark appears
   * typography changes

6. Display:

YOU'RE OFF.

Then:

WE'RE STILL ON.

7. Small loading indicator progresses:

00

25

50

75

100

or use a very thin horizontal loading line.

8. When loading reaches 100, the loading screen visually becomes the HERO NIGHT STATE.

Do not create a hard cut.

The loader and hero should feel like the same continuous environment.

Recommended loader duration:

approximately 1.5–2 seconds.

The toggle may be interactive while visible, but automatic loading must continue regardless.

---

# PART 02 — HERO STRUCTURE

Create a full-viewport hero designed to later be PINNED during scroll using GSAP ScrollTrigger.

The hero will remain visible while the visitor scrolls through a day/night time-lapse.

Design for approximately:

200–250vh worth of scroll-controlled progression.

Do NOT literally create a 250vh frame.

Instead create separate visual states / layer groups that can later be animated in code.

---

# MAIN HERO HEADLINE

Keep:

PUT YOUR DIGITAL
WORK ON
IDLE.

Use huge Surgena typography.

Headline should dominate approximately 55–65% of the composition.

Allow lines to approach or slightly crop against viewport edges.

Do not center everything.

Use an editorial asymmetric composition.

---

# SUPPORTING MESSAGE

Initial night state:

YOU LOG OFF.

WE KEEP IT MOVING.

Final morning state:

WAKE UP TO PROGRESS.

Supporting final copy:

A subscription-based digital partner that quietly handles your website, content and email—so you can focus on everything else.

Primary CTA:

VIEW PLANS →

Secondary:

SEE HOW IT WORKS ↓

---

# HERO STATE 01 — NIGHT

Scroll progress:

0–25%

Background:

deep navy / black gradient

#000051 → #000000

Use subtle star texture inspired by the provided Idle pubmat.

Do not make stars overly bright or decorative.

Add one large Idle crescent / moon-like brand graphic.

Place it partially outside the viewport.

Add one small task label:

11:42 PM

WEBSITE UPDATE

IN PROGRESS

Use Codec Pro.

Keep the label simple and graphic.

Do NOT make it look like a SaaS dashboard card.

---

# HERO STATE 02 — MIDNIGHT

Scroll progress:

25–50%

Headline shifts subtly upward.

Star field drifts slowly.

Introduce task updates one-by-one.

Example:

01:16 AM

SOCIAL CONTENT

READY ✓

03:48 AM

NEWSLETTER

SENT ✓

Use timestamps to communicate that work is continuing overnight.

Orange may appear as:

status dot

small check

tiny timestamp accent

Do not overuse orange.

---

# HERO STATE 03 — DAWN

Scroll progress:

50–75%

Begin visually transforming night into morning.

Gradient transitions from:

#000051

into:

#1612D3

Introduce a very small warm orange horizon glow using:

#ED4E00

Stars gradually fade.

Add one large blurred / graphic circular sunrise element rising from below the viewport.

Do not use a realistic photograph of the sun.

Use a clean graphic orb.

Supporting copy appears:

WHILE YOU WERE AWAY,

THINGS KEPT MOVING.

Allow task statuses to resolve to:

HANDLED ✓

---

# HERO STATE 04 — MORNING

Scroll progress:

75–100%

Environment becomes bright and optimistic.

Electric blue should dominate.

Possible gradient:

#1612D3

→ brighter cobalt

→ subtle white light

Do NOT eliminate blue completely.

Blue remains the primary brand color.

The star field disappears.

The orange sunrise becomes a small supporting accent.

Introduce:

WAKE UP TO PROGRESS.

Show final hero description and CTAs.

The hero then releases from its pinned state and transitions naturally into the next homepage section.

---

# GSAP-READY LAYER STRUCTURE

The final site will use GSAP.

Keep these objects separate:

hero-background-night

hero-background-day

stars

night-haze

sunrise-glow

sun-orb

idle-crescent

headline-line-01

headline-line-02

headline-line-03

night-message

morning-message

task-website

task-social

task-email

cta-primary

cta-secondary

loader-logo

loader-toggle

loader-progress

Do not flatten these elements.

Do not convert headline typography into images.

---

# FUTURE GSAP MOTION INTENT

Design the visual states so the coded implementation can use:

GSAP timeline

ScrollTrigger

pin

scrub

translate

scale

rotate

opacity

clip-path

CSS variable animation

The intended scroll behavior is:

scrolling forward = time moves from night toward morning

scrolling backward = time naturally returns toward night

The experience should therefore be fully reversible.

Avoid animation ideas that only work once.

---

# HERO MOTION DETAILS

Future animation should include:

Headline reveal:
line-by-line upward reveal.

Star movement:
very slow vertical or diagonal parallax.

Idle crescent:
slight rotation and translation.

Task labels:
enter at different scroll positions.

Sunrise:
rise from bottom of viewport.

Gradient:
smoothly interpolate between night and day.

Headline:
slightly reduce scale / move upward as morning arrives.

CTA:
reveal only near the end of the hero sequence.

Motion should feel smooth, crafted and controlled.

Take inspiration from the quality of interaction on Locomotive.

Do NOT copy Locomotive's branding, layouts, typography, or content.

---

# MOBILE BEHAVIOR

At 390px:

Keep the concept.

Simplify the motion.

Reduce star density.

Use fewer task labels.

Do not use aggressive cursor/parallax effects.

Allow hero headline to remain oversized.

The time-lapse should still transition:

night

→ dawn

→ morning

but with fewer simultaneous moving layers.

---

# LOADING SCREEN MOBILE

Use the same DAY / NIGHT pill toggle.

Keep it large enough for touch.

The automatic animation remains.

Do not require the user to click it.

---

# VISUAL FEEL

The experience should feel:

cinematic

calm

premium

graphic

dreamlike

digital

optimistic

controlled

Avoid:

cybersecurity visuals

generic SaaS dashboards

literal space illustrations

cartoon sunrise imagery

generic corporate stock photos

excessive glow

too many UI cards

The experience should communicate one simple idea:

**YOU CAN SWITCH OFF.**

**IDLE DOESN'T.**
