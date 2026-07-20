# NURC Design Tokens

Single source of truth: `src/styles/theme.css` (the only active `@theme` block).
`default_shadcn_theme.css` was an unused Figma-export leftover and has been removed.

## Brand colors (CSS vars in `theme.css`)

| Token | Value | Use |
|-------|-------|-----|
| `--nurc-navy` | `#0A2540` | Primary text, dark surfaces, primary buttons |
| `--nurc-teal` | `#006D7A` | Accents, links, secondary CTAs |
| `--nurc-gold` | `#C8B39E` | Highlights, dividers, editorial accents |
| `--nurc-sage` | `#E0E7E3` | Soft tinted backgrounds |

Prefer the semantic Tailwind tokens (`bg-background`, `text-foreground`, `border-border`,
`bg-card`, `text-muted-foreground`) over raw hexes where possible.

## Elevation / shadows

Three levels only. Utilities are generated from `theme.css`:

| Utility | Value | Use |
|---------|-------|-----|
| `shadow-elevation-1` | `0 4px 16px rgba(10,37,64,.06)` | Resting cards, subtle lift |
| `shadow-elevation-2` | `0 8px 24px rgba(10,37,64,.08)` | Card hover, popovers |
| `shadow-elevation-3` | `0 16px 40px rgba(10,37,64,.12)` | Featured cards, modals, hero image |

Replace ad-hoc inline `boxShadow` values with the nearest level. Do NOT introduce new
one-off shadow values.

## Border radius

Two/three sizes mapped to component type:

| Component | Class |
|-----------|-------|
| Buttons, inputs, selects, small controls | `rounded-xl` |
| Cards, panels, modals | `rounded-2xl` |
| Pills / fully-round | `rounded-full` |

Avoid mixing `rounded-lg` / `rounded-3xl` / `rounded-[12px]` ad hoc.

## Spacing / vertical rhythm

Major page sections use a consistent vertical rhythm:

| Context | Class |
|---------|-------|
| Major page section | `py-16 md:py-20` |
| Sub-section / band | `py-12` |
| Card interior padding | `p-6` (compact) / `p-8` (roomy) |

Resolve the previous `py-12` / `py-16` / `py-20` mix toward `py-16 md:py-20` for top-level
sections during the inline-style sweep (Phase 6b).

## Reading comfort modes (Reader)

Keys `default` / `night` / `dark` render, and are labelled/iconed, as:

| Key | Label | Icon | Background |
|-----|-------|------|------------|
| `default` | Light | Sun | `#FAF9F6` |
| `night` | Sepia | BookOpen | `#F4EAD7` |
| `dark` | Dark | Moon | `#111111` |

(Icons, labels and rendered colors now agree — the previous Night/Moon-on-sepia and
Monitor-on-dark mismatches are fixed.)
