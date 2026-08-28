# IDLE DIGITAL — FIX BLACK HERO FRAME + REBUILD DAYLIGHT VISUAL STATE

Do NOT redesign the website.

Do NOT modify:

navigation

content architecture

services

process

plans

About

Contact

loading-screen concept

This update applies specifically to:

1. HERO rendering reliability
2. NIGHT → DAY transition
3. DAYLIGHT visual state

The current hero animation concept is correct.

The problem is the implementation.

---

# CRITICAL ISSUE 01 — BLACK FRAME

The current hero still shows a full black frame during scrolling.

This must be fixed at the structural level.

Do NOT try to fix this only by changing SKY_STAGES colors.

The SKY_STAGES no longer contain black.

The black is being exposed from behind the hero.

---

# CURRENT PROBLEM

The global body currently uses:

background: #000000;

The HeroScene root itself has no background.

Instead, the gradient exists only inside an absolutely positioned:

.sky-bg

element.

If that absolute layer briefly does not cover the pinned viewport during:

ScrollTrigger pinning

scrubbing

refresh

Figma Make rendering

or layout recalculation

the black body becomes visible.

This is what is creating the unwanted black viewport.

---

# FIX HERO ROOT BACKGROUND

Move the animated sky gradient onto the HERO ROOT itself.

Current concept:

.hero-scene
transparent

.sky-bg
absolute gradient

Change to:

.hero-scene
animated gradient background

The root element must ALWAYS contain the current sky color.

Example:

<div
  ref={sceneRef}
  className="hero-scene"
  style={{
    height: "100vh",
    position: "relative",
    overflow: "hidden",
    background:
      "linear-gradient(180deg, var(--sky-top), var(--sky-mid) 55%, var(--sky-bot))"
  }}
>

Animate CSS variables on:

sceneRef.current

NOT only on a child sky element.

---

# REMOVE TRANSPARENT HERO FALLBACK

The hero must never have a transparent background.

Before GSAP initializes, define the night colors directly.

Use CSS defaults:

.hero-scene {
--sky-top: #05052F;
--sky-mid: #000051;
--sky-bot: #0C0B64;

background:
linear-gradient(
180deg,
var(--sky-top) 0%,
var(--sky-mid) 55%,
var(--sky-bot) 100%
);
}

This guarantees a deep-blue frame BEFORE JavaScript runs.

---

# SKY-BG LAYER

Either:

REMOVE .sky-bg entirely

OR

keep it only for atmospheric overlays.

Do not make the primary background dependent on an absolutely positioned child.

---

# HERO WRAPPER FALLBACK

Wrap the hero in a dedicated shell.

Example:

<div className="hero-scroll-shell">
  <HeroScene />
</div>

Set:

.hero-scroll-shell {
background: #000051;
min-height: 100vh;
}

This ensures ScrollTrigger's pin spacing never exposes black.

---

# GSAP PIN SPACER

Make sure the ScrollTrigger-generated pin area cannot expose the black BODY.

If necessary, explicitly style the wrapper surrounding the pinned hero.

Do not rely on:

body background: black

as the fallback.

---

# BODY BACKGROUND DURING OPENING

Preferred:

change the global body fallback from pure black to:

#000051

or another deep Idle blue.

All later sections already declare their own explicit background colors, so a navy body fallback is safer.

At minimum:

body {
background: #000051;
}

This means even if a rendering gap occurs, the visitor sees Idle navy instead of a black flash.

---

# TEST THE BLACK BUG

Slowly scrub the hero from:

0%

to

100%

and back.

There must never be a viewport that displays:

pure black

only navigation on black

only cursor on black

or a blank dark spacer.

The hero environment must occupy the viewport throughout the complete pinned sequence.

---

# CRITICAL ISSUE 02 — DAYLIGHT DOES NOT MATCH THE REFERENCE

The current morning state is:

electric-blue gradient

tiny orange sun

no meaningful clouds

minimal haze

This does NOT visually resemble the supplied Day reference.

Use the supplied Day/Night toggle illustration as the visual reference for the DAYLIGHT ELEMENT LANGUAGE.

Do not put a pill in the hero.

Instead enlarge that visual language into a full-screen environment.

---

# TARGET DAYLIGHT FEEL

The DAY state should feel:

bright

soft

blue

airy

optimistic

layered

motion-graphic

The reference contains:

light blue sky

large warm sun

puffy white clouds

multiple blue atmospheric layers

soft depth

Use those same ideas in the full-screen hero.

---

# NEW MORNING SKY

Do NOT end the morning at a mostly solid:

#1612D3

background.

Idle electric blue should remain present, but daytime needs lighter sky tones.

Use approximately:

TOP:

#1612D3

↓

UPPER-MIDDLE:

#276FE1

↓

MIDDLE:

#42A0EB

↓

BOTTOM:

#78C9F2

This allows Idle blue to remain the brand anchor while creating an obvious DAY state.

Alternative supporting blues may include:

#2D68D8

#4B9FE8

#78C4F2

Do NOT switch the whole website to generic baby blue.

Electric blue remains dominant near the top.

---

# EXTEND SKY STAGES

The transition should now have FIVE states:

## NIGHT

top:
#05052F

mid:
#000051

bottom:
#0C0B64

↓

## PREDAWN

top:
#0B0B58

mid:
#16116F

bottom:
#27209A

↓

## DAWN

top:
#171579

mid:
#2421B8

bottom:
#5B47D8

↓

## EARLY MORNING

top:
#1612D3

mid:
#2D68D8

bottom:
#4B9FE8

↓

## DAYLIGHT

top:
#1612D3

mid:
#42A0EB

bottom:
#78C9F2

The transition must remain continuous.

---

# DO NOT HOLD ON DARKNESS

The current night period feels too long.

Rebalance timeline percentages.

Recommended scroll progression:

0–22%
NIGHT

22–40%
PREDAWN

40–58%
DAWN

58–76%
EARLY MORNING

76–100%
DAYLIGHT

The visitor should start seeing meaningful daylight before the final quarter.

---

# DAYLIGHT SUN

Replace the current tiny orange orb.

Current core is only approximately:

28–48px.

That is far too small.

The reference contains a prominent sun.

Create a large daytime sun approximately:

Desktop:

120–180px diameter

Tablet:

90–130px

Mobile:

70–100px

Use:

main:
#FFD95A

bright center:
#FFE77B

warm shadow:
#FFC13D

small orange support:
#ED4E00

Do NOT make the main sun orange-red.

Orange remains an accent.

---

# SUN POSITION

During DAWN:

sun begins below the viewport.

Then rises vertically.

During DAYLIGHT:

position it approximately:

right: 12–18vw

top: 14–24vh

or another visually balanced position away from important headline copy.

It should become a recognizable part of the composition.

---

# SUN RAYS

Take inspiration from the reference.

Add subtle short rays around the daylight sun.

Approximately:

8–12 rays.

Use simple rounded lines.

Keep them understated.

Do not make it cartoonish.

During sunrise:

rays may scale/fade in progressively.

---

# DAY CLOUDS — REQUIRED

The current HERO does not contain real daytime clouds.

Add approximately:

4–6 cloud groups.

These should resemble the soft grouped-cloud construction from the supplied reference.

Build each cloud from:

overlapping round forms

plus subtle lower shadow forms.

Use:

main:
#FFFFFF

shadow:
#DDF4FF

secondary shadow:
#CBE9FF

Use very subtle soft glow.

---

# CLOUD STYLE

Clouds should have volume.

Do NOT use:

single ellipse

simple pill

thin haze only

Use grouped puffy shapes.

Example cloud:

large center circle

smaller left circle

medium right circle

wide base shape

soft pale-blue lower shadow

---

# CLOUD POSITIONS

Use depth layers.

## BACK CLOUDS

smaller

lower opacity

slower movement

## MID CLOUDS

medium size

visible around sun

## FRONT CLOUDS

larger

may partially enter viewport edges

Do not obscure the main headline excessively.

---

# CLOUD SCROLL ANIMATION

Night:

clouds hidden or extremely subtle.

Predawn:

cloud opacity begins around 0.1–0.2.

Dawn:

clouds become visible.

Morning:

clouds become white-blue.

Daylight:

clouds fully visible.

Animate with vertical + slight horizontal drift.

Example:

back:
y -20px
x 15px

mid:
y -35px
x -20px

front:
y -50px
x 25px

Keep movement slow.

---

# CLOUD ENTRANCE

Do not make all clouds appear simultaneously.

Use staggered reveals.

As daylight arrives:

cloud 01

then cloud 02

then cloud 03

etc.

This creates the time-lapse feeling.

---

# DAY ATMOSPHERIC LAYERS

The reference uses multiple curved blue shapes inside the pill.

Translate this into subtle full-screen atmospheric bands.

Add approximately:

2–3 very large curved translucent blue shapes across the lower / side areas.

Examples:

light cyan curve

medium cobalt curve

soft translucent sky-blue wave

These are NOT hills.

They should feel like:

graphic atmosphere

soft cloud bands

abstract sky layers.

Keep them behind typography.

---

# DAYLIGHT COMPOSITION

At final DAY state the hero should visually contain:

Idle electric-blue sky at top

lighter cyan/blue atmosphere below

large yellow sun

white dimensional clouds

subtle curved blue atmospheric shapes

no stars

no moon

headline

completed task status

morning copy

CTA

This should be visibly and unmistakably DAY.

---

# HERO HEADLINE CONTRAST

Keep the white headline if it remains legible.

If the lower daylight becomes too light:

do NOT recolor the entire headline automatically.

Instead keep the headline over the darker upper/middle blue portion.

Adjust the gradient/composition around the type.

---

# NIGHT MOON

Keep the current gold illustrated crescent direction.

It is now closer to the intended reference.

Do not revert to:

flat white crescent

thin outline moon

or Idle logo mask.

The hero moon should retain:

yellow/gold body

orange shadow patches

rounded chunky silhouette

soft glow.

---

# REMOVE MOON CLEANLY

As dawn begins:

moon moves downward.

Do not simply fade it in place.

Its physical descent should complete before full daylight.

---

# NIGHT → DAY VISUAL TRANSFORMATION

The complete experience should now visibly be:

DEEP NAVY NIGHT

stars

gold moon

↓

VIOLET PREDAWN

moon descending

↓

COBALT DAWN

orange horizon light

↓

EARLY MORNING

sun rising

clouds arriving

↓

BRIGHT DAY

large yellow sun

puffy white clouds

light sky blue

There must be NO:

BLACK

blank frame

empty viewport

between any of these states.

---

# REMOVE OR REPLACE CURRENT HAZE

The current:

.haze-a

.haze-b

are nearly invisible.

They are not adding enough visual value.

Either:

remove them

OR

repurpose them as the new curved atmospheric daylight layers.

Do not rely on almost-transparent radial gradients as the primary daytime visuals.

---

# GSAP TIMELINE — RECOMMENDED STRUCTURE

Use:

night = 0

predawn = 2.2

dawn = 4.0

earlyMorning = 5.8

daylight = 7.6

end = 10

Animate:

sky variables

moon Y

star opacity

sun Y

sun scale

sun rays

cloud opacity

cloud X/Y

atmospheric shapes

copy

tasks

through these shared labels.

---

# SUN SHOULD NOT APPEAR AS AN ORANGE DOT

This is a specific correction.

The current screenshot shows a tiny glowing orange circle.

Remove that look.

The final sun must resemble the scale and warmth of the large yellow celestial objects in the supplied reference.

Think:

bright yellow / warm gold

not:

small orange LED.

---

# FINAL BLUE MARQUEE

Keep the marquee after Hero as BLUE.

Do not make it black again.

The final DAYLIGHT background and marquee should connect naturally.

If hero ends with:

#78C9F2

transition the lower edge back toward:

#1612D3

during the final 5–10% before release,

so the blue marquee feels connected.

---

# FINAL TEST CHECKLIST

Before finishing verify all of these manually:

1. Hard refresh.

2. Complete loader.

3. Enter hero night.

4. Slowly scroll.

5. No black frame appears.

6. Night changes to violet.

7. Violet changes to cobalt.

8. Orange dawn glow becomes visible.

9. Large sun rises.

10. White clouds appear.

11. Day sky becomes substantially lighter.

12. Final hero clearly resembles the supplied DAY reference in visual language.

13. Scroll upward.

14. Entire sequence reverses smoothly.

15. No black frame appears in reverse.

---

# MOST IMPORTANT VISUAL DISTINCTION

CURRENT DAY:

solid electric blue
+
tiny orange sun

TARGET DAY:

electric blue
→ sky blue gradient
+
large yellow sun
+
layered white clouds
+
soft blue atmospheric shapes

The final daylight state should feel like an enlarged, premium full-screen interpretation of the DAY half of the supplied Day/Night illustration.
