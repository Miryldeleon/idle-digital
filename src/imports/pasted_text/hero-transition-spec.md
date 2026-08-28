# IDLE DIGITAL — CORRECT HERO BACKGROUND TRANSITION + LOADING PILL

Do NOT redesign the website.

The current overall direction is correct.

There are two separate visual systems:

## HERO

The hero uses a FULL-SCREEN DAY/NIGHT BACKGROUND TRANSITION controlled by scroll.

## LOADING SCREEN

The loading screen uses an animated DAY/NIGHT PILL TOGGLE.

Do not mix these two concepts.

---

# PART 1 — HERO

The current hero concept is correct:

the FULL BACKGROUND changes from night to day as the user scrolls.

Keep this concept.

The problem is that the transition currently does not render smoothly and some of the environmental elements feel too illustrated / cartoon-like.

Refine the existing hero.

---

# REMOVE FROM HERO

Remove or heavily simplify:

* literal hills
* obvious mountains
* cartoon landscape shapes
* overly decorative clouds
* playful star illustrations
* large floating UI cards
* complicated scene objects
* anything that makes the hero look like an animated children's landscape

The hero should feel:

premium
cinematic
minimal
editorial
atmospheric

---

# HERO VISUAL SYSTEM

Use primarily:

SKY

LIGHT

STARS

SUBTLE CLOUD / HAZE

SUN / MOON

IDLE CRESCENT

TYPOGRAPHY

TASK TIMESTAMPS

The background itself is the animation.

---

# NIGHT STATE

At the top of the hero:

Use a smooth dark gradient.

Example:

top:
#000010

middle:
#000051

bottom:
#08084A

Add:

subtle stars

very soft atmospheric haze

Idle crescent used as the moon

The crescent should feel like part of the brand, not a generic moon illustration.

Keep the environment visually clean.

Headline:

PUT YOUR DIGITAL
WORK ON
IDLE.

Supporting copy:

YOU CAN SWITCH OFF.

---

# SMOOTH BACKGROUND TRANSITION

Do NOT use several full-screen backgrounds fading on top of each other.

Do NOT create:

night-background

predawn-background

day-background

with opacity crossfades.

Instead use ONE hero background whose colors change continuously.

Use CSS custom properties.

Example:

--sky-top
--sky-mid
--sky-bottom
--horizon-glow

Background:

linear-gradient(
180deg,
var(--sky-top),
var(--sky-mid) 55%,
var(--sky-bottom)
)

Animate these variables smoothly using GSAP ScrollTrigger.

---

# COLOR PROGRESSION

The visitor should scroll smoothly through:

## NIGHT

#000010
#000051
#08084A

↓

## PRE-DAWN

#08084A
#111172
#16128F

↓

## SUNRISE

#111172
#1612D3
subtle #ED4E00 at the bottom

↓

## MORNING

#1612D3
lighter cobalt blue
soft light toward the horizon

There should be NO visible jump between these states.

The user should feel like they are scrubbing through one continuous time-lapse.

---

# GSAP SCROLL BEHAVIOR

Use:

ScrollTrigger

pin: true

scrub: 1 or approximately 1–1.5

A small scrub delay is encouraged to make the transition feel smoother rather than directly snapping to scroll position.

Suggested:

scrollTrigger: {
trigger: ".hero",
start: "top top",
end: "+=300%",
pin: true,
scrub: 1.2
}

Adjust as needed for smoothness.

---

# MOON / IDLE CRESCENT

At NIGHT:

Idle crescent appears high in the composition.

It should be large enough to become part of the art direction.

Do not add detailed craters or cartoon shading.

Keep it graphic.

As the visitor scrolls:

crescent slowly moves DOWN.

Its opacity decreases as dawn arrives.

Keep movement primarily vertical.

---

# STARS

Use small minimal points.

Do not use colorful star illustrations.

Night:
visible.

Predawn:
gradually reduce.

Sunrise:
almost gone.

Morning:
invisible.

Use staggered opacity slightly so they do not all disappear at exactly the same moment.

---

# CLOUD / HAZE

Do not use obvious cloud illustrations.

Instead use:

soft blurred forms

very subtle transparent gradients

light atmospheric layers

They may drift slowly vertically.

Their purpose is depth, not decoration.

---

# SUNRISE

At approximately 55–60% of hero progress:

introduce a soft orange glow from the BOTTOM edge of the viewport.

Orange:

#ED4E00

Do not turn the entire screen orange.

It should look like sunrise light entering the blue environment.

Then introduce a simple sun orb.

The sun should be:

minimal

clean

graphic

not cartoon-style

Begin below the viewport / horizon.

As the visitor scrolls:

sun rises UP.

---

# MORNING

At the final hero state:

Electric blue:

#1612D3

should dominate.

Sunlight should make the scene feel brighter, but the page should remain recognizably Idle blue.

Reveal:

WAKE UP TO PROGRESS.

Supporting copy:

A subscription-based digital partner that quietly handles your website, content and email—so you can focus on everything else.

CTA:

VIEW PLANS →

Secondary:

SEE HOW IT WORKS ↓

---

# TASK STORY

Keep the overnight work concept.

Use typography rather than floating dashboard cards.

Example:

11:42 PM
WEBSITE UPDATE
IN PROGRESS

01:16 AM
SOCIAL CONTENT
READY ✓

03:48 AM
NEWSLETTER
SENT ✓

These may appear in different parts of the hero as time progresses.

Use Codec Pro.

Keep them subtle.

Orange can highlight:

time
status dot
check mark

---

# BACKWARD SCROLL

This is important.

Scrolling upward must smoothly reverse the time-lapse.

DAY

↓

SUNSET / DAWN

↓

PRE-DAWN

↓

NIGHT

Moon returns.

Stars return.

Sun disappears.

Colors reverse smoothly.

Do not trigger separate one-time animations.

Everything should be based on ScrollTrigger progress.

---

# PART 2 — LOADING SCREEN

The LOADING SCREEN is where the pill-shaped day/night toggle should be used.

Do NOT use the pill inside the main hero.

---

# LOADING PILL STYLE

Take inspiration from premium animated day/night toggle UI.

The pill can be more illustrative and playful than the hero.

It should clearly contain:

DAY state

and

NIGHT state.

---

# DAY PILL

Use:

electric-blue sky

large light sun / circular knob

soft white cloud shapes

subtle layered blue details

Keep it polished.

---

# NIGHT PILL

Use:

deep navy background

Idle crescent

small white / blue stars

dark blue internal layers

The pill can have more visual character than the hero because it is a small branded loading interaction.

---

# TOGGLE TRANSITION

The toggle should physically move:

DAY

LEFT

→

NIGHT

RIGHT

while the environment changes.

Animate together:

celestial thumb

sky

clouds

stars

background layers

crescent

This is where the reference animation should influence the interaction.

---

# LOADING COPY

Below or around the pill:

YOU CAN SWITCH OFF.

then:

IDLE DOESN'T.

Add subtle loading progress.

Example:

00 — 100

or a thin orange progress line.

---

# LOADER → HERO

After the toggle reaches NIGHT:

do NOT enlarge the pill into the hero if that transition causes rendering problems.

Instead use a simpler premium transition.

Recommended:

Night pill completes.

↓

Loading copy fades/moves upward.

↓

Entire loading screen background gradually becomes the hero's exact NIGHT gradient.

↓

Pill scales down / fades.

↓

Hero headline reveals.

This should feel seamless without requiring complicated scaling of the pill.

Reliability and smooth rendering are more important than a gimmicky transition.

---

# IMPORTANT PERFORMANCE RULE

Prefer GPU-friendly properties:

transform

opacity

CSS variables

Avoid repeatedly changing large DOM layouts.

Use:

will-change: transform, opacity

only on elements that actually animate.

Do not create dozens of large blur filters.

Keep the hero smooth at 60fps where possible.

---

# HERO VS LOADER — FINAL DISTINCTION

HERO:

full viewport

background transition

cinematic

minimal

night → morning

scroll driven

vertical movement

LOADER:

small pill

animated toggle

playful

day ↔ night

automatic + clickable

horizontal movement

Do not confuse the two visual systems.

---

# FINAL GOAL

The hero should feel like:

the entire environment is slowly moving through time.

NOT:

an illustrated landscape switching states.

The loading screen should feel like:

a beautiful animated day/night switch.

Together they communicate:

YOU CAN SWITCH OFF.

IDLE KEEPS MOVING.
