

## Current State

The entire site uses a single blue hue (`217 91% 60%`) for everything — primary buttons, gradients, gold tokens, accents. Even the `--gold` variable is mapped to blue. This creates a flat, monotone feel that lacks the premium automotive character expected for a car wrapping brand.

## Color Palette Options

Here are three distinct palettes that would elevate the brand:

### Option A: **Amber Gold + Charcoal** (Premium Luxury)
- Primary accent: warm amber/gold (`45 90% 55%`) — evokes luxury wraps, premium finishes
- Dark surfaces stay deep charcoal
- Gradients shift from gold to warm amber
- Best for: high-end, exclusive feel

### Option B: **Emerald Green + Warm Grey** (Kenyan Identity)
- Primary accent: rich emerald green (`160 60% 40%`) — subtle nod to Kenyan flag
- Warm grey tones for surfaces
- Gradients from emerald to teal
- Best for: local authenticity with sophistication

### Option C: **Burnt Orange + Deep Navy** (Bold Automotive)
- Primary accent: burnt orange/copper (`25 85% 55%`) — energetic, stands out
- Deep navy dark surfaces
- Gradients from orange to warm copper
- Best for: bold, sporty, attention-grabbing

## Implementation Plan

Once a palette is chosen:

1. **Update CSS variables** in `src/index.css` — change `--primary`, `--gold`, `--gold-light`, `--gold-dark`, gradient definitions, and ring/accent colors
2. **Update gradient utilities** — `.text-gradient-gold`, `.text-gradient-primary`, `.african-pattern` SVG fill colors
3. **Update dark mode** variables to complement the new accent
4. **Verify component consistency** — buttons, borders, glows, and simulator UI all reference CSS variables so they update automatically

All changes are centralized in `src/index.css` and the gradient utility classes — no component-level edits needed.

