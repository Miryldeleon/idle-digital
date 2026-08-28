# IDLE DIGITAL — POLISH CURRENT HERO TRANSITION

Do NOT redesign the hero or website.

The current implementation is almost correct.

Keep:

* current GSAP ScrollTrigger setup
* pinned hero
* single CSS-variable sky gradient
* vertical moon movement
* sunrise
* stars
* task timestamps
* hero headline
* overall layout

Only refine:

1. the moon appearance
2. the night → day color transition
3. the copy progression

---

# 1. REPLACE CURRENT MOON DESIGN

The current moon is too flat and minimal.

It currently looks like:

white crescent
+
dark circular cutout.

Replace it with a more dimensional illustrated crescent inspired by premium animated Day/Night toggle UI.

Reference style:

https://dribbble.com/shots/16564394-Animated-toggle-button-Day-Night-UI

Do NOT copy the artwork exactly.

Use the reference only for:

* dimensional crescent treatment
* subtle crater details
* warm glow
* layered shading

---

# MOON APPEARANCE

Create a warm graphic crescent.

Base:

#FFE28A

Secondary shading:

#F6B843

Small deep-orange accent where appropriate:

#ED4E00

Add:

2–3 subtle circular crater / highlight shapes

soft internal shadow

soft outer glow

The crescent should feel dimensional but still clean and graphic.

Do not create realistic photographic moon texture.

Do not make the moon pure white.

Do not use a completely flat silhouette.

---

# MOON GLOW

Add a very soft glow around the crescent.

Example:

box-shadow / filter:

0 0 25px rgba(255,226,138,0.22)

0 0 60px rgba(255,190,80,0.10)

Keep the glow restrained.

---

# 2. REMOVE THE BLACK TRANSITION

There must be NO black stage between night and daytime.

The current sky contains an extremely dark value:

#000010

This is visually reading as a black section.

Remove near-black values from the main transition.

Night should still be dark, but visibly BLUE.

---

# NEW SKY COLOR PROGRESSION

Use four continuous states.

## NIGHT

--sky-top:
#05052F

--sky-mid:
#000051

--sky-bottom:
#0C0B64

This should feel like a rich deep-blue night.

Not black.

---

## PREDAWN

--sky-top:
#0B0B58

--sky-mid:
#16116F

--sky-bottom:
#27209A

The sky should slowly become more violet / blue.

This transition should begin EARLIER.

Do not keep the screen dark for too long.

---

## DAWN

--sky-top:
#171579

--sky-mid:
#2421B8

--sky-bottom:
#5B47D8

Then add a SEPARATE subtle orange glow along the lower edge.

Do not make orange one of the entire gradient stops.

This prevents the bottom of the hero from suddenly turning orange.

---

## MORNING

--sky-top:
#1612D3

--sky-mid:
#252CE8

--sky-bottom:
#3C55F5

Electric blue should clearly dominate.

---

# IMPORTANT TRANSITION RULE

There should never be a moment where the whole hero appears:

black

near-black

empty

or visually disconnected.

The transformation should continuously feel like:

DEEP BLUE NIGHT

↓

BLUE-VIOLET

↓

COBALT DAWN

↓

ELECTRIC BLUE MORNING

---

# 3. START DAWN EARLIER

The current transition keeps night visually dominant for too long.

Move the beginning of predawn earlier in the GSAP timeline.

Recommended timeline:

night:
0

lateNight:
1.7

predawn:
3.0

dawn:
4.5

morning:
7.2

end:
10

Sky color interpolation remains continuous across the full timeline.

Do not stop between labels.

---

# 4. SUNRISE GLOW

Keep the orange sunrise glow.

However:

start it earlier and more gradually.

Around 35–40% scroll:

very faint orange begins at the bottom.

Around 50–60%:

orange becomes visible.

Around 75%:

orange reduces again as electric-blue morning takes over.

Use:

#ED4E00

at low opacity.

The orange should feel like natural light entering the blue scene.

---

# 5. MOON MOVEMENT

Keep vertical movement.

Night:

moon high.

Late night:

moon begins descending slowly.

Predawn:

moon is lower.

Dawn:

moon approaches the bottom of the viewport.

Morning:

moon disappears.

Do NOT make the moon suddenly fade before it has visually descended.

Its physical movement should communicate time passing.

---

# 6. SUN MOVEMENT

Keep the existing sun-rising concept.

Begin the sun below the viewport.

At predawn:

sun is still invisible.

At dawn:

a glow becomes visible first.

Then the solid sun appears and rises.

Morning:

sun sits above the lower horizon.

Make the movement smoother and slower.

---

# 7. COPY STORY — ADD MORE CONTINUITY

Keep the main headline:

PUT YOUR DIGITAL
WORK ON
IDLE.

Do NOT replace it during the scroll.

Change only the supporting messages.

---

## NIGHT COPY

YOU CAN SWITCH OFF.

---

## LATE NIGHT COPY

WE'RE STILL ON.

Show this shortly after the first task begins.

---

## PREDAWN COPY

YOUR DIGITAL WORK
KEEPS MOVING.

---

## DAWN COPY

WHILE YOU WERE AWAY,
THINGS GOT DONE.

---

## MORNING COPY

WAKE UP TO PROGRESS.

Then show:

A subscription-based digital partner that quietly handles your website, content and email—so you can focus on everything else.

CTA:

VIEW PLANS →

SEE HOW IT WORKS ↓

---

# COPY TRANSITION STYLE

Do NOT hard-cut between messages.

Each copy should:

move upward approximately 12–18px

while fading out

and the next message should:

begin slightly lower

then move into position.

Allow slight overlap.

Example:

old message opacity:
1 → 0

new message opacity:
0 → 1

with approximately 20–30% overlap.

This will make the storytelling feel continuous.

---

# 8. TASK TIMESTAMPS

Keep:

11:42 PM
WEBSITE UPDATE
IN PROGRESS

01:16 AM
SOCIAL CONTENT
READY ✓

03:48 AM
NEWSLETTER
SENT ✓

But coordinate these with the copy.

Suggested:

11:42 PM
+
YOU CAN SWITCH OFF.

↓

01:16 AM
+
WE'RE STILL ON.

↓

03:48 AM
+
YOUR DIGITAL WORK KEEPS MOVING.

↓

dawn
+
WHILE YOU WERE AWAY, THINGS GOT DONE.

↓

morning
+
WAKE UP TO PROGRESS.

This creates one narrative rather than disconnected UI elements.

---

# 9. DO NOT CHANGE THE LOADING SCREEN

Do not modify the loading-page pill toggle in this update.

This prompt applies only to the HERO transition.

---

# FINAL TARGET

The hero should feel like one continuous time-lapse.

Not:

NIGHT

↓

BLACK

↓

DAY

Instead:

DARK BLUE NIGHT

↓

VIOLET PREDAWN

↓

BLUE DAWN + SUBTLE ORANGE LIGHT

↓

BRIGHT ELECTRIC-BLUE MORNING

And the crescent moon should have the warm, dimensional character of the supplied Day/Night toggle reference rather than the current flat white crescent.
