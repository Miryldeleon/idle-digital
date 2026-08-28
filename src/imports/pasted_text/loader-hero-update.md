# IDLE DIGITAL — FIX CURRENT LOADER + STRENGTHEN DAY/NIGHT HERO

Do NOT redesign the website.

The current direction is almost correct.

Keep the existing page structure, hero typography, landscape concept, GSAP setup, ScrollTrigger structure, task timestamps, navigation, and brand colors.

This update is specifically to FIX TWO THINGS:

1. The loading screen is not visibly appearing in the Figma Make preview.
2. The hero technically transitions from night to day, but the transformation is currently too subtle and does not visually feel like a real day/night time-lapse.

---

# 1. FIX THE LOADING SCREEN VISIBILITY

The LoadingScreen component already exists.

DO NOT remove it.

The current problem is that the GSAP loader timeline begins immediately and finishes after roughly 2.6 seconds.

In Figma Make, the preview may still be loading while this animation is playing, so the user often sees the website only after the loader has already completed.

Change the loader behavior.

---

# LOADER MUST START ONLY WHEN THE PAGE IS ACTUALLY VISIBLE

Do not immediately run the GSAP timeline on component mount.

Start the loader only after:

* the document is visible
* the page has completed its initial render
* at least two requestAnimationFrame cycles have completed

Use:

document.visibilityState

and:

visibilitychange

if needed.

The animation should only begin once:

document.visibilityState === "visible"

This ensures the Figma preview actually shows the loader.

---

# MINIMUM VISIBLE LOADER TIME

The loading screen must remain visibly present for a minimum of approximately:

2.2–2.8 seconds

AFTER the page becomes visible.

Do not allow the loader animation to complete in the background before the user sees it.

---

# LOADER FIRST-VISIT BEHAVIOR

For the prototype:

show the loader every time the homepage is hard-refreshed.

Do not show it repeatedly when navigating internally between:

How It Works

About

Contact

Quiz

It should feel like a website-entry experience.

---

# 2. MAKE THE LOADER MORE OBVIOUS

Keep the miniature DAY/NIGHT world concept.

But make the transformation more visible.

DAY state:

* bright electric blue sky
* clear sun
* visible white clouds
* light horizon

NIGHT state:

* obvious deep navy sky
* clear Idle crescent moon
* visible stars
* darker landscape

Currently the clouds and landscape are too subtle.

Increase their visual presence while keeping the design premium.

Do not make them cartoonish.

---

# LOADER TRANSITION

The Day → Night transformation should clearly show:

SUN MOVES DOWN

↓

CLOUDS MOVE

↓

SKY DARKENS

↓

STARS APPEAR

↓

MOON RISES

This should be visually obvious.

Do not only change the sky color.

---

# LOADER COPY

Keep:

YOU CAN SWITCH OFF.

IDLE DOESN'T.

The second line may use full white or an orange accent rather than extremely low opacity.

It currently feels too faint.

Make the message readable.

---

# LOADER → HERO

Keep the idea where the mini world expands into the hero.

However, make this transition visibly continuous.

The pill should scale up.

Its night sky should expand.

The moon should remain visually present.

The landscape should scale with it.

The loader UI disappears.

The hero night environment takes over.

There should NOT be a flash to plain blue or black between states.

---

# 3. STRENGTHEN THE HERO DAY/NIGHT TRANSFORMATION

The current hero technically contains:

* night sky
* day sky
* stars
* moon
* clouds
* dawn glow
* sun
* horizons

Keep these layers.

Do not rebuild the hero from scratch.

Instead, improve the current GSAP timeline so the day/night change is MUCH MORE VISUAL.

---

# CURRENT ISSUE

The current implementation mainly crossfades:

.sky-night

and

.sky-day

This feels like one background fading into another rather than time actually changing.

Replace the two-background crossfade as the PRIMARY transition.

Instead animate a continuous sky gradient using CSS variables.

---

# USE CSS VARIABLES FOR SKY COLOR

Create variables on the hero scene such as:

--sky-top

--sky-middle

--sky-bottom

Use them inside one gradient:

background:
linear-gradient(
180deg,
var(--sky-top) 0%,
var(--sky-middle) 55%,
var(--sky-bottom) 100%
)

Start at NIGHT:

--sky-top: #000010
--sky-middle: #000030
--sky-bottom: #000051

Then animate through multiple stages.

---

# TIME STATE 01 — NIGHT

0–25%

Sky:

#000010
#000030
#000051

Stars clearly visible.

Moon high in the sky.

Landscape very dark.

Clouds faint but visible.

Copy:

YOU CAN SWITCH OFF.

Task:

11:42 PM
WEBSITE UPDATE
IN PROGRESS

---

# TIME STATE 02 — PRE-DAWN

25–45%

Do not immediately become electric blue.

Introduce a richer pre-dawn gradient.

Example:

--sky-top: #07072f
--sky-middle: #10106e
--sky-bottom: #231177

Stars begin fading slowly.

Moon continues moving downward.

Clouds become slightly more visible.

Landscape begins changing color.

Reveal:

01:16 AM
SOCIAL CONTENT
READY ✓

---

# TIME STATE 03 — DAWN

45–70%

This state needs to be visually obvious.

Sky transition:

top:
#11167a

middle:
#3634d5

bottom:
a warm blue-orange transition

Add a stronger orange glow at the BOTTOM horizon.

Use:

#ED4E00

sparingly but visibly.

The horizon should visibly brighten.

Moon reaches the horizon and disappears.

Sun begins rising from BELOW the horizon.

Clouds brighten.

Stars fade to zero.

Display:

WHILE YOU WERE AWAY,
THINGS KEPT MOVING.

---

# TIME STATE 04 — MORNING

70–100%

Main Idle electric blue becomes dominant:

#1612D3

Use a slightly lighter blue near the top.

Sun should now be clearly visible.

Landscape should have changed from almost-black navy to brighter blue silhouettes.

Task states resolve:

WEBSITE UPDATE
HANDLED ✓

SOCIAL CONTENT
HANDLED ✓

NEWSLETTER
HANDLED ✓

Reveal:

WAKE UP TO PROGRESS.

Then show CTA.

---

# 4. ANIMATE THE LANDSCAPE COLORS TOO

This is important.

Currently the horizon stays nearly the same dark color.

Animate the SVG fills.

Night:

horizon back:
#000030

horizon front:
#00001A

Dawn:

horizon back:
#111172

horizon front:
#08084A

Morning:

horizon back:
#2D2CE8

horizon front:
#0F0C9A

Use GSAP:

gsap.to(".horizon-back path", {
attr: { fill: "..." }
})

and similarly for the foreground.

This makes the whole scene change with the sky.

---

# 5. MAKE THE SUNRISE STRONGER

The current sun is too blurred and visually weak.

Keep a soft glow but add a defined inner orb.

Use:

outer glow
+
solid circular core

The core may be:

#ED4E00

or a warm light orange.

The sun should begin COMPLETELY below the horizon.

As the user scrolls down:

the sun rises vertically upward.

Its vertical travel should be substantial.

Example:

from:
yPercent: 130

to:
yPercent: -60

The movement should feel like an actual sunrise.

---

# 6. MOON MOVEMENT

Keep the Idle crescent as the moon.

Start it clearly high in the sky.

As the user scrolls down:

the moon moves vertically downward.

Do not move it sideways significantly.

By approximately 60% progress:

the moon should disappear below / behind the horizon.

When user scrolls back upward:

the moon naturally rises again.

---

# 7. SUN / MOON HANDOFF

Create a stronger handoff.

Night:

moon dominates.

Dawn:

moon disappears into horizon.

Shortly after:

sun rises from the same general horizon region.

This creates the visual feeling of time passing.

Do not simply fade one object while another randomly appears somewhere else.

---

# 8. CLOUDS NEED TO CHANGE WITH TIME

Current clouds are too low-opacity to notice.

Increase night visibility slightly.

Night:
cool dark clouds.

Dawn:
clouds gain light blue / subtle warm edge.

Morning:
clouds become brighter white-blue.

Also use vertical parallax.

Back clouds:
move slowly upward.

Front clouds:
move slightly faster upward.

Keep motion restrained.

---

# 9. IMPROVE STARS

Stars should not immediately disappear.

Use three stages:

Night:
100%

Pre-dawn:
60%

Dawn:
20%

Morning:
0%

Allow subtle upward star drift.

This creates a more believable time-lapse.

---

# 10. USE GSAP LABELS FOR THE TIMELINE

Organize the hero timeline into clear conceptual states.

Example:

tl.addLabel("night", 0)

tl.addLabel("predawn", 2.5)

tl.addLabel("dawn", 4.5)

tl.addLabel("morning", 7.5)

Then coordinate:

sky colors

moon position

stars

clouds

sun position

horizon fills

copy

tasks

around those labels.

This will make the timing easier to control and visually coherent.

---

# 11. SCROLL MUST FEEL VERTICAL

Continue using:

ScrollTrigger

pin: true

scrub: true

But prioritize vertical Y movement.

Major vertical motions:

moon ↓

sun ↑

stars ↑ slightly

clouds ↑

horizon ↑ slightly

headline ↑ slightly

task labels ↑ when entering/leaving

Do not emphasize X movement.

---

# 12. INCREASE SCROLL LENGTH SLIGHTLY

Desktop:

approximately +=350%

Mobile:

approximately +=240%

The current transition feels too compressed.

Give the visitor enough scroll distance to actually experience:

night

pre-dawn

dawn

morning

as distinct visual moments.

---

# 13. DO NOT HIDE THE HEADLINE

Keep:

PUT YOUR DIGITAL
WORK ON
IDLE.

visible through most of the timeline.

The headline may:

move upward

slightly scale

change contrast

but should remain the anchor.

Only supporting copy and tasks should change significantly.

---

# 14. HERO FINAL STATE

At morning state:

electric blue is dominant.

Show:

WAKE UP TO PROGRESS.

Supporting copy:

A subscription-based digital partner that quietly handles your website, content and email—so you can focus on everything else.

CTA:

VIEW PLANS →

SEE HOW IT WORKS ↓

Then release the pinned hero smoothly into the next section.

---

# 15. IMPORTANT DEBUG REQUIREMENT

After making these changes:

verify the loader visually appears on hard refresh.

Verify the day/night animation is visible when scrolling slowly.

Verify scrolling upward reverses the exact transformation.

Verify no part of the hero becomes a blank blue screen.

Verify the headline remains visible.

Verify ScrollTrigger.refresh() is called after the loader completes if necessary.

The loader changing/removing fixed content may alter page measurements.

After onDone:

call ScrollTrigger.refresh()

so the hero pin and scroll distances are recalculated correctly.

---

# FINAL RESULT

The existing design is close.

Do NOT replace it with a new visual style.

The required improvement is:

CURRENT:

night background

→ crossfade

→ blue background

TARGET:

NIGHT

↓

MOON SETS

↓

PRE-DAWN

↓

LANDSCAPE BRIGHTENS

↓

ORANGE HORIZON

↓

SUN RISES

↓

ELECTRIC BLUE MORNING

The visitor should clearly FEEL time passing as they scroll.
