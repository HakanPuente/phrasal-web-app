# Design System Document

## 1. Overview & Creative North Star: "The Playful Curated Path"

This design system moves away from the clinical, repetitive grids found in traditional education apps. Instead, we embrace **The Playful Curated Path**. The goal is to make learning phrasal verbs feel like an editorial exploration—a series of tactile, physical layers that guide Turkish speakers through the nuances of English in a way that feels intentional and premium.

We break the "standard PWA" look by utilizing **intentional asymmetry**, **exaggerated corner radii**, and **tonal depth**. By abandoning rigid dividers in favor of soft, nested containers, we create an environment that feels less like a database and more like a high-end, gamified learning journal.

---

## 2. Colors & Surface Architecture

Our palette is vibrant and energetic, designed to keep learners engaged without causing visual fatigue.

### Tonal Tokens
- **Primary (Action/Growth):** `#406900` | **Container:** `#85cd1e` (The "Go" color for progress)
- **Secondary (Energy/Urgency):** `#b5260a` | **Container:** `#fc5939` (Phrasal verb focus)
- **Tertiary (Clarity/Support):** `#006590` | **Container:** `#63c3ff` (Grammar & Tips)
- **Background:** `#fff8f6` (A warm, paper-like foundation)

### The "No-Line" Rule
To maintain a high-end feel, **1px solid borders are strictly prohibited for sectioning.** Boundaries must be defined through:
1.  **Background Shifts:** Placing a `surface-container-lowest` card on a `surface-container-low` background.
2.  **Tonal Transitions:** Using subtle variations in the surface tier to imply separation.

### Surface Hierarchy & Nesting
Treat the UI as stacked sheets of organic material.
- **Base Level:** `surface` (`#fff8f6`)
- **Section Level:** `surface-container-low` (`#fff1ed`)
- **Interactive Level (Cards):** `surface-container-lowest` (`#ffffff`)
- **Pop-overs/Modals:** `surface-bright` (`#fff8f6`)

### The "Glass & Gradient" Rule
For floating elements (like a "Daily Streak" tracker), use **Glassmorphism**:
- **Background:** `surface-container-lowest` at 80% opacity.
- **Effect:** 20px Backdrop-blur.
- **CTAs:** Apply a subtle linear gradient from `primary` to `primary_container` (Top-Left to Bottom-Right) to provide "visual soul" and depth.

---

## 3. Typography: The Editorial Voice

We utilize **Plus Jakarta Sans** (an evolution of the Mona Sans aesthetic) to provide a modern, geometric, yet friendly feel.

- **Display (3.5rem - 2.25rem):** Reserved for major milestones and celebration screens. Use `display-md` for high-impact numbers (e.g., "50 Verbs Mastered").
- **Headline (2rem - 1.5rem):** Used for lesson titles. Headlines should feel bold and authoritative.
- **Title (1.375rem - 1rem):** Used for card headers. These act as the primary navigational anchors.
- **Body (1rem - 0.75rem):** For phrasal verb definitions and Turkish translations. Ensure high contrast using `on_surface`.
- **Label (0.75rem - 0.6875rem):** Used for micro-copy, like "Verb Tense" or "Difficulty Level."

**Visual Hierarchy Note:** Contrast the large, playful headlines with generous whitespace to ensure the typography "breathes." Never crowd the text; the layout should feel like a premium magazine.

---

## 4. Elevation & Depth

### The Layering Principle
Forget drop shadows for every card. Achieve depth by stacking surface tiers. A `surface-container-highest` button on a `surface-container-lowest` card provides enough contrast to signal interactivity without visual clutter.

### Ambient Shadows
When an element must "float" (e.g., a celebratory pop-up), use **Ambient Shadows**:
- **Blur:** 40px - 60px.
- **Color:** `on_surface` (`#2b1610`) at 5% opacity.
- **Logic:** This mimics soft, natural light rather than a harsh digital shadow.

### The "Ghost Border" Fallback
If accessibility requires a container boundary, use a **Ghost Border**:
- **Stroke:** `outline-variant` (`#c1cab1`) at 15% opacity.

---

## 5. Components

### Cards & Exercise Layouts
- **Rule:** Absolute prohibition of divider lines. 
- **Separation:** Use `spacing-lg` (2rem) between content blocks or shift the background of the "Example Sentence" block to `surface-container-high`.
- **Radius:** Always use `xl` (3rem) for main cards and `md` (1.5rem) for nested exercise chips.

### Buttons (The "Bounce" Aesthetic)
- **Primary:** Gradient from `primary` to `primary_container`. `xl` roundedness. Large padding (1.5rem 2.5rem).
- **Secondary:** `secondary_container` background with `on_secondary_container` text.
- **Tertiary:** No background; text-only with a `ghost-border` on hover.

### Phrasal Verb "Match" Chips
- **States:**
    - **Default:** `surface-container-lowest` with `md` radius.
    - **Selected:** `tertiary_container` with a soft `tertiary` ambient shadow.
    - **Success:** `primary_container` background.
    - **Error:** `secondary_container` background with a subtle shake animation.

### Input Fields
- **Style:** Large, pill-shaped (`full` radius) inputs using `surface-container-low`.
- **Focus:** Transition background to `surface-container-lowest` and add a `primary` ghost border.

### Progress Tunnels
Instead of a thin line, use a thick, `lg` rounded track (`surface-container-high`) with a `primary` fill that has a subtle "shine" gradient.

---

## 6. Do's and Don'ts

### Do
- **Do** use asymmetrical margins (e.g., 2rem left, 1.5rem right) on decorative elements to create a custom, high-end feel.
- **Do** layer text over subtle, colorful "blob" shapes using `primary_fixed` or `secondary_fixed` at low opacity to guide the eye.
- **Do** use Turkish-specific typographic nuances—ensure line heights are generous for translations.

### Don't
- **Don't** use 100% black text. Always use `on_surface` (`#2b1610`) for a softer, premium look.
- **Don't** use standard "Material Design" shadows. Keep them diffused and tinted.
- **Don't** use sharp corners. If a corner isn't at least `sm` (0.5rem), it doesn't belong in this system.