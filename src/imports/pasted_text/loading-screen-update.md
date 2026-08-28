# IDLE DIGITAL — MATCH DAY/NIGHT REFERENCE MORE CLOSELY + REMOVE BLACK BREAK

Do NOT redesign the website.

Do NOT change the website architecture, typography system, content, navigation, services, plans, About page or Contact page.

The current implementation is close.

This update must ONLY fix:

1. the visual accuracy of the LOADING SCREEN day/night toggle
2. the visual style of the HERO moon
3. the unwanted BLACK transition/break around the hero
4. continuity from hero morning into the next homepage section

---

# REFERENCE IMAGES — IMPORTANT

The supplied Day/Night toggle screenshots should be treated as the PRIMARY visual reference for the loading-screen elements.

Study the reference carefully.

The reference contains:

DAY STATE:

* glossy blue capsule
* large yellow circular thumb on RIGHT
* orange/yellow sun inside the environment
* layered fluffy white clouds
* layered curved blue background shapes

NIGHT STATE:

* large white circular moon/thumb on LEFT
* soft crater/crescent details inside the white thumb
* chunky golden crescent inside the environment
* small colored stars
* dark layered navy/purple internal background

The current implementation is still too flat and simplified.

Match the ELEMENT LANGUAGE more closely.

Do not copy the exact illustration pixel-for-pixel, but reproduce its structure, layering, depth and visual character.

---

# 1. FIX TOGGLE DIRECTION

The current implementation is backwards.

CURRENT:

DAY:
thumb LEFT

NIGHT:
thumb RIGHT

CHANGE TO:

DAY:
large yellow thumb on RIGHT

NIGHT:
large white moon thumb on LEFT

This matches the supplied reference.

DAY → NIGHT:

thumb travels:

RIGHT → LEFT

NIGHT → DAY:

thumb travels:

LEFT → RIGHT

---

# 2. DAY LOADING PILL

Create a richer DAY state.

Capsule:

bright medium blue / electric blue.

Use multiple internal layered shapes.

Base:

#1612D3

Supporting lighter blues may include:

#2D68D8
#4B9FE8
#78C4F2

Do not replace Idle blue with generic sky blue everywhere.

Use lighter blues only inside the illustration.

---

# DAY BACKGROUND LAYERS

Inside the capsule create approximately 3 layered curved shapes.

Example:

back layer:
medium blue

middle layer:
slightly darker cobalt

foreground wave:
lighter blue

These shapes should curve across the capsule like the reference.

They create depth.

Do NOT use one flat rectangle as the background.

---

# DAY SUN

Create a bright orange/yellow sun inside the environment on the LEFT / CENTER-LEFT.

Sun base:

#FFC83D

inner glow:

#FFB527

optional Idle accent:

#ED4E00

Add simple short rays around the sun.

Do not use a realistic sun.

The style should resemble a polished vector motion-graphic illustration.

---

# DAY CLOUDS

Replace current ellipse-only clouds.

Create proper puffy clouds using grouped overlapping circles / rounded vector shapes.

Use approximately:

3 cloud groups.

One cloud partially overlaps the sun.

Use:

white
#FFFFFF

with subtle lower shading:

#DDF4FF
#CBE9FF

Add a very small soft glow around the clouds.

The clouds should feel dimensional like the supplied reference.

Not flat oval pills.

---

# DAY THUMB

On the RIGHT side create a large yellow circular toggle thumb.

Size should be approximately 80–90% of the capsule height.

Color:

#FFE36A

or slightly warmer:

#FFD95A

Keep it visually simple.

Add very subtle internal shading.

The large yellow thumb is separate from the smaller sun in the environment.

---

# 3. NIGHT LOADING PILL

When transitioning to NIGHT:

the large circular thumb moves:

RIGHT → LEFT.

The capsule darkens smoothly.

Use:

#000051

#12125F

#202070

Do not use near-black.

---

# NIGHT LARGE THUMB

The large thumb on the LEFT should become a WHITE MOON DISC.

Use:

#FFFFFF

or:

#F7F7F4

Add approximately 3 crater / crescent-style surface details.

These should look similar to the reference:

soft curved crater impressions

not normal gray circles.

Use very pale blue-gray:

#DCE7E8

at low opacity.

Do not make the moon dirty or realistic.

It should remain polished and graphic.

---

# NIGHT GOLD CRESCENT

Inside the NIGHT environment, create a separate golden crescent.

This is NOT the toggle thumb.

Position it toward:

center-right.

This crescent should closely resemble the supplied reference.

Important characteristics:

* thick crescent
* rounded tips
* chunky lower body
* slightly tilted orientation
* warm yellow/gold base
* orange internal patches
* subtle highlight

Suggested colors:

main:
#FFE259

secondary:
#FFC53D

shadow:
#EFA523

small accent:
#ED4E00

Add approximately:

2–3 circular / curved surface patches.

Do not use a simple flat crescent mask.

The object should have visible internal shading like the supplied reference.

---

# NIGHT STARS

Use more expressive stars like the reference.

Mix:

tiny white glowing dots

small four-point stars

small five-point stars

Colors may include:

white

#A9E8FF

#5FC4FF

#FFE266

very small amount of:
#ED7955

Do not make all stars identical white circles.

Keep the number restrained.

Approximately 8–12 visible stars.

---

# NIGHT INTERNAL BACKGROUND

Use multiple curved navy/purple layers inside the capsule.

Example:

base:
#000051

middle:
#121268

front:
#292672

Create glossy depth.

The visual should resemble the reference's overlapping wave shapes.

---

# 4. LOADER GLOSS / DEPTH

Add subtle polished highlights to the pill.

Possible:

thin blue-white bottom highlight

soft inner shadow at top

soft specular highlight shape near the upper-left

very subtle outer glow

Do not make it skeuomorphic.

Do not use heavy glassmorphism.

The goal is:

POLISHED MOTION GRAPHIC UI.

---

# 5. HERO MOON — CHANGE VISUAL STYLE

Do NOT use the large white toggle thumb as the hero moon.

The HERO moon should instead resemble the GOLD CRESCENT inside the supplied night reference.

Replace the current hero moon.

Current hero crescent is too thin / vertical / mask-like.

Create a thicker illustrated crescent.

Characteristics:

* chunky crescent
* wider bottom
* rounded tips
* slightly tilted
* warm yellow
* orange shaded patches
* subtle glow
* 2–3 circular surface details

The hero moon should visually feel like an enlarged version of the golden crescent from the loading pill.

This creates consistency.

---

# HERO MOON COLORS

Main:

#FFE259

Highlight:

#FFF0A0

Midtone:

#FFC53D

Shadow:

#E5A21B

Small Idle orange accent:

#ED4E00

Keep orange subtle.

---

# HERO MOON GLOW

Add:

soft yellow-white glow

approximately:

0 0 18px rgba(255,226,89,0.25)

0 0 50px rgba(255,197,61,0.12)

Do not over-glow.

---

# 6. REMOVE ALL BLACK FROM THE OPENING EXPERIENCE

There must be NO black visual state from:

Loader

↓

Hero Night

↓

Predawn

↓

Dawn

↓

Morning

↓

Next Section

Currently black / near-black is still being introduced in two places.

---

# FIX LOADER EXIT GRADIENT

Current loader exit uses:

#000010

REMOVE IT.

Change loader Night gradient to match hero Night exactly.

Use:

top:
#05052F

middle:
#000051

bottom:
#0C0B64

The loader and hero must share the exact same NIGHT gradient.

This prevents a black flash during handoff.

---

# 7. REMOVE BLACK MARQUEE DIRECTLY AFTER HERO

The current homepage immediately renders a DARK/BLACK marquee after HeroScene.

This interrupts the day/night story.

Current structure:

Hero morning

↓

BLACK marquee

↓

White section

Change this.

The black marquee must NOT immediately follow the hero.

Preferred solution:

Hero morning

↓

ELECTRIC BLUE marquee

↓

WHITE Problem / Relief section

Change marquee styling so it continues the MORNING environment.

Suggested marquee:

background:
#1612D3

text:
#FFFFFF

optional small orange accents.

OR:

move the marquee lower in the page.

But there must not be a black section immediately after the hero.

---

# 8. HERO → NEXT SECTION TRANSITION

The hero should end in electric blue morning.

Then smoothly move into either:

electric blue marquee

or directly into white Problem / Relief.

If transitioning to white:

add a gradual lower-edge lightening.

Example:

final 10–15% of hero scroll:

sky-bottom:

#3C55F5

↓

#AFC8FF

↓

#FFFFFF

while:

sky-top remains electric blue longer.

This creates a natural bright morning transition.

Do NOT hard-cut:

blue → black → white.

---

# 9. SKY CONTINUITY

Keep one continuous sky.

Night:

#05052F
#000051
#0C0B64

Predawn:

#0B0B58
#16116F
#27209A

Dawn:

#171579
#2421B8
#5B47D8

Morning:

#1612D3
#252CE8
#3C55F5

Optional final daylight transition:

#252CE8
#4A63F7
#DCE8FF

No step may use:

#000

#000010

or visually pure black.

---

# 10. DO NOT ALTER THE MAIN HERO HEADLINE

Keep:

PUT YOUR DIGITAL
WORK ON
IDLE.

Keep the existing copy progression and task timestamps.

This update is visual only.

---

# FINAL CHECK

Before finishing, manually verify the entire opening by scrolling slowly.

It must appear as:

LOADER — DAY

yellow thumb RIGHT
sun + clouds

↓

LOADER — NIGHT

white moon thumb LEFT
gold crescent + stars

↓

HERO — NIGHT

gold crescent
deep blue sky

↓

PREDAWN

violet blue

↓

DAWN

brighter cobalt + subtle orange light

↓

MORNING

electric blue

↓

ELECTRIC BLUE MARQUEE OR WHITE CONTENT

There must be NO BLACK FRAME or BLACK SECTION between any of these states.

The visual elements in the loader must closely match the supplied reference in:

structure

layering

shape language

depth

celestial-object treatment

and animation direction.
