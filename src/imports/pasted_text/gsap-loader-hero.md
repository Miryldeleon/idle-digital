# IDLE DIGITAL — REBUILD LOADER + HERO USING GSAP DAY/NIGHT ANIMATION

Rebuild the current Idle Digital loading screen and homepage hero.

Do NOT make small modifications to the existing implementation.

The existing loader and hero animation system is not producing the intended result.

Replace the current implementation.

Do not change the rest of the homepage or website architecture.

---

# IMPORTANT TECHNICAL CHANGE

The current project does not use GSAP.

Install and use:

gsap

and:

GSAP ScrollTrigger

Register ScrollTrigger correctly.

Use GSAP timelines for the loading screen and hero instead of manually managing animation through many React setTimeout calls and window.scrollY calculations.

The production website is intended to use GSAP, so this prototype should use the same animation philosophy.

If MorphSVGPlugin is available and works reliably, it may be used for the sun/moon transformation.

If MorphSVGPlugin is unavailable or unreliable, use separate SVG sun and moon layers with masking, scaling and crossfade instead.

Do not allow an optional plugin to break the experience.

---

# CORE CONCEPT

The main visual concept is:

THE CLIENT CAN SWITCH OFF.

IDLE DIGITAL DOESN'T.

Visualize this through a continuous DAY / NIGHT cycle.

The loading screen and hero should feel like ONE CONNECTED ANIMATION.

Sequence:

DAY

↓

NIGHT

↓

CLIENT SWITCHES OFF

↓

IDLE CONTINUES WORKING

↓

OVERNIGHT TASKS COMPLETE

↓

DAWN

↓

MORNING

↓

CLIENT WAKES UP TO PROGRESS

---

# REFERENCE FOR DAY / NIGHT MOTION

Use the visual idea of animated Day/Night UI toggles:

a mini environment transforms between:

sun

clouds

bright sky

and:

moon

stars

dark sky

Do not merely slide a white knob left and right.

The environment itself must animate.

---

# PART 01 — LOADING SCREEN

Completely replace the current LoadingScreen animation.

The loading screen should begin with a large DAY / NIGHT pill toggle centered in the viewport.

The toggle is a MINIATURE DAY/NIGHT WORLD.

Recommended size:

Desktop:
approximately 300–360px wide
70–90px high

Mobile:
approximately 260–300px wide

---

# DAY TOGGLE STATE

Inside the pill:

electric-blue sky

#1612D3

small sun

2–3 simple cloud shapes

subtle light horizon / abstract landscape

DAY label

The sun should be part of the scene.

Do not use emoji icons.

Use simple SVG/vector shapes.

---

# NIGHT TOGGLE STATE

When the toggle moves to NIGHT:

sky becomes:

#000051

Sun transitions out.

Idle crescent / moon transitions in.

Stars appear.

Clouds shift and darken / disappear.

Horizon becomes darker.

NIGHT label becomes active.

The entire pill should visually transform.

Do NOT only move the knob.

---

# LOADER GSAP TIMELINE

Create one GSAP timeline.

Suggested sequence:

0.00
loader background appears

0.15
Idle logo reveals

0.35
day/night toggle rises slightly into view

0.55
DAY state is clearly visible

0.85
toggle begins transforming into NIGHT

During transition:

sky color changes

sun moves downward

moon / Idle crescent rises

clouds drift

stars appear

1.50
Night state completes

Show:

YOU CAN SWITCH OFF.

1.75

Show:

IDLE DOESN'T.

2.00

Loading progress reaches completion.

2.20

Begin transition into the hero.

Do not wait unnecessarily longer than approximately 2–2.5 seconds.

---

# LOADING PROGRESS

Do not use a fake timer that is completely independent from the animation.

The loading progress can visually follow the GSAP timeline.

Use either:

00 → 100

or

a thin orange progress line.

Orange:

#ED4E00

Keep this subtle.

---

# TOGGLE INTERACTION

The toggle should also be clickable.

Clicking DAY:

preview the day state.

Clicking NIGHT:

preview the night state.

However:

user interaction must NOT stop or break loading.

The site must still automatically proceed.

Use an actual accessible button element.

Do not implement the toggle as a non-clickable div.

---

# LOADER → HERO TRANSITION

This is VERY IMPORTANT.

Do not fade the loader to black and then suddenly reveal an unrelated hero.

The loader's NIGHT state should visually TRANSFORM INTO the hero night environment.

Suggested transition:

The day/night pill begins scaling up.

Its dark navy sky expands beyond the pill.

Border radius gradually reduces.

The pill eventually fills the entire viewport.

The moon / crescent stays visually continuous.

Stars expand outward.

The loading UI fades away.

The resulting full-screen state becomes the HERO.

This should feel like zooming into the tiny world inside the toggle.

---

# PART 02 — HERO

Completely replace the current hero visual system.

The hero should be a full-screen animated DAY / NIGHT ENVIRONMENT.

It must NOT look like:

a SaaS dashboard

a cybersecurity interface

a set of orbit rings

a radial technology glow

Use an illustrated / graphic landscape environment instead.

---

# HERO SCENE LAYERS

Create separate layers:

.sky

.stars

.clouds-back

.clouds-front

.moon

.sun

.dawn-glow

.horizon-back

.horizon-front

.idle-mark

.hero-title

.task-website

.task-social

.task-email

.hero-copy-night

.hero-copy-day

.hero-cta

Keep each layer independently animatable.

---

# LANDSCAPE STYLE

The scene does not need realistic mountains.

Use abstract graphic horizon layers inspired by Idle Digital.

Possible shapes:

smooth digital hills

curved blue waves

layered abstract forms

minimal geometric silhouettes

Use the Idle blue visual language.

Avoid cartoon landscapes.

Avoid detailed realistic scenery.

The goal is:

premium editorial animation

not children's illustration.

---

# MAIN HERO HEADLINE

Keep:

PUT YOUR DIGITAL

WORK ON

IDLE.

Use oversized display typography.

Keep the orange period.

The typography should remain a dominant element.

The animated sky should support the headline rather than overpower it.

---

# VERTICAL SCROLL MOTION

This is the most important change.

The current animation feels too horizontal.

The new experience should emphasize UP / DOWN movement tied to scroll.

Use GSAP ScrollTrigger:

pin: true

scrub: true

Recommended scroll distance:

approximately 250–350vh

The scene should remain pinned while the user moves through time.

---

# SCROLL DIRECTION

When user scrolls DOWN:

time moves forward.

NIGHT

↓

MIDNIGHT

↓

DAWN

↓

MORNING

When user scrolls UP:

the exact sequence reverses naturally.

MORNING

↓

DAWN

↓

MIDNIGHT

↓

NIGHT

Do not use one-time animations.

Every major state must be reversible from scroll position.

---

# NIGHT STATE — 0% SCROLL

Sky:

deep navy / near-black.

Gradient suggestion:

#000020
→
#000051

Stars visible.

Idle crescent / moon positioned high in the scene.

Headline visible:

PUT YOUR DIGITAL

WORK ON

IDLE.

Supporting line:

YOU CAN SWITCH OFF.

Add:

11:42 PM

WEBSITE UPDATE

IN PROGRESS

---

# NIGHT MOVEMENT — 0–35%

As user scrolls downward:

moon moves DOWN vertically.

Stars drift slightly upward.

Cloud layers move vertically at different speeds.

Foreground horizon moves slightly upward.

Headline shifts upward very subtly.

Task activity continues.

Reveal:

01:16 AM

SOCIAL CONTENT

READY ✓

Then:

03:48 AM

NEWSLETTER

SENT ✓

Use orange only for active/completed status accents.

---

# DAWN — 35–70%

Moon approaches / disappears below the horizon.

Stars gradually disappear.

Orange dawn glow appears from the BOTTOM of the viewport.

Sky smoothly changes:

#000051

→ darker cobalt

→ #1612D3

Do not simply crossfade between two backgrounds.

Animate CSS color variables or layered gradients so the transition feels continuous.

Clouds become lighter.

Show:

WHILE YOU WERE AWAY,

THINGS KEPT MOVING.

---

# SUNRISE

Sun should begin BELOW the viewport / horizon.

As user continues scrolling:

sun rises UP vertically.

This is the main vertical motion.

Use orange:

#ED4E00

during sunrise.

As the sun rises higher, it may transition toward a lighter cream/white center while orange remains around it.

Do not turn the full page orange.

---

# SUN / MOON BRAND CONNECTION

Use the Idle crescent as the moon.

This is a key brand moment.

At night:

Idle crescent = moon.

During dawn:

the crescent may transform or resolve into a full circular sun.

If MorphSVG works reliably:

morph the crescent shape into the sun.

Otherwise:

crossfade/mask between moon and sun while preserving position and scale.

The transformation should feel like one celestial brand object.

---

# MORNING — 70–100%

Sky becomes the main Idle electric blue:

#1612D3

with a subtle brighter upper gradient.

The sun has risen.

Stars are gone.

Horizon becomes brighter.

Task states resolve:

WEBSITE UPDATE
HANDLED ✓

SOCIAL CONTENT
HANDLED ✓

NEWSLETTER
HANDLED ✓

Reveal:

WAKE UP TO PROGRESS.

Supporting copy:

A subscription-based digital partner that quietly handles your website, content and email—so you can focus on everything else.

CTA:

VIEW PLANS →

Secondary:

SEE HOW IT WORKS ↓

---

# HERO END TRANSITION

At 100% hero scroll:

release the pinned section smoothly.

Do not abruptly jump.

The lower horizon or blue sky may move upward and reveal the next white homepage section.

This creates a natural morning → website-content transition.

---

# GSAP IMPLEMENTATION PATTERN

Use a GSAP timeline connected to ScrollTrigger.

Conceptually similar to:

const heroTl = gsap.timeline({
scrollTrigger: {
trigger: ".hero-scene",
start: "top top",
end: "+=300%",
pin: true,
scrub: true
}
});

Animate several properties at the same timeline positions.

For example:

sky colors

moon Y position

sun Y position

horizon colors

cloud Y positions

star opacity

headline Y position

task status entrances

Do not animate only X positions.

Prioritize Y / vertical motion.

---

# SKY COLOR ANIMATION

The visual transformation should resemble:

night

deep navy

pre-dawn blue

electric blue morning

Use smooth gradient interpolation.

Consider animating CSS variables:

--sky-top

--sky-bottom

--horizon-color

rather than replacing the entire background abruptly.

---

# PARALLAX

Use restrained vertical parallax.

Example:

stars:
slow Y movement

back clouds:
medium Y movement

front clouds:
slightly faster Y movement

far horizon:
small Y movement

foreground:
larger Y movement

sun/moon:
strong deliberate Y motion

This creates depth.

Avoid excessive left/right movement.

---

# MOBILE

Keep the same day/night story.

Reduce to:

one cloud layer

fewer stars

two task statuses

simpler horizon

shorter pinned scroll duration

Do not remove the vertical sunrise concept.

---

# ACCESSIBILITY / PERFORMANCE

Respect prefers-reduced-motion.

For reduced motion:

show a static morning hero.

Do not trap scroll.

Keep animations transform/opacity based where possible.

Avoid huge raster video backgrounds.

Use SVG/CSS/vector layers.

---

# FINAL EXPERIENCE

The visitor should experience:

MINI DAY WORLD

↓

TOGGLE TO NIGHT

↓

YOU CAN SWITCH OFF.

↓

IDLE DOESN'T.

↓

THE NIGHT WORLD EXPANDS INTO THE HERO

↓

SCROLL DOWN

↓

MOON SINKS

↓

WORK CONTINUES OVERNIGHT

↓

DAWN APPEARS

↓

SUN RISES

↓

WAKE UP TO PROGRESS

This should feel like a handcrafted interactive website experience inspired by high-end GSAP sites, not like a generic hero with a background color transition.
