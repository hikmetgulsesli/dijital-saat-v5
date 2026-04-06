# Design System Document: The Nocturnal Chronometer

## 1. Overview & Creative North Star
**Creative North Star: "The Ethereal Precision"**
This design system moves away from the utility-first aesthetic of standard clock applications toward a high-end, editorial experience. It treats time not just as data, but as a centerpiece. By leveraging **Space Grotesk** for its architectural rigidity and **Manrope** for its humanist clarity, we create a "Digital Curator" vibe. 

The layout breaks the traditional centered grid through **intentional asymmetry**: large-scale display typography is offset against expansive negative space, creating a sense of luxury and breathing room. Elements should feel like they are floating in a deep, atmospheric void (the `slate-950` / `surface` environment), utilizing depth and tonal shifts rather than structural lines to define boundaries.

---

## 2. Colors & Surface Philosophy
The palette is rooted in the depth of `surface` (#070d1f), using the "Cyan" accent (`primary`: #3adffa) as a high-energy pulse against the stillness of the dark background.

### The "No-Line" Rule
To maintain a premium, seamless feel, **1px solid borders are strictly prohibited** for sectioning content. Boundaries must be defined through:
- **Tonal Shifts:** Placing a `surface_container_low` card on a `surface` background.
- **Negative Space:** Using the spacing scale to create groupings.

### Surface Hierarchy & Nesting
Treat the UI as a series of physical layers of polished obsidian.
- **Base Layer:** `surface` (#070d1f) for the main application background.
- **Secondary Tier:** `surface_container_low` (#0c1326) for subtle content groupings like settings categories.
- **Interaction Tier:** `surface_container_high` (#171f36) for active elements or elevated cards.

### The "Glass & Gradient" Rule
Floating elements (like time-pickers or modal overlays) should utilize **Glassmorphism**:
- Use `surface_container` at 60% opacity with a `backdrop-filter: blur(24px)`.
- **Signature Texture:** Primary CTAs should use a linear gradient from `primary` (#3adffa) to `primary_container` (#00cbe6) at a 135-degree angle to add "soul" and dimension.

---

## 3. Typography
The typography is the soul of this system. It balances the brutalist geometry of Space Grotesk with the technical precision of Manrope.

- **Display (Space Grotesk):** Used for the primary time display. The exaggerated x-height and geometric forms convey modern precision. `display-lg` (3.5rem) should be used for the hours/minutes, often with reduced letter-spacing (-0.02em) for a tighter, editorial look.
- **Headlines (Space Grotesk):** Used for section titles in settings (e.g., "Alarm Ayarları").
- **Body & Labels (Manrope):** Used for all functional text and Turkish localization strings. Manrope’s wide apertures ensure readability even at the smallest `label-sm` sizes for "AM/PM" or "Saniye" indicators.

*Note: For Turkish support, ensure the 'Lowercase Dotless I' (ı) and 'Uppercase I with Dot' (İ) are properly kerned in Space Grotesk.*

---

## 4. Elevation & Depth
We eschew traditional Material shadows for **Tonal Layering**.

- **The Layering Principle:** To lift a card, do not add a shadow; instead, move from `surface_dim` to `surface_bright`.
- **Ambient Shadows:** Only use shadows for high-importance floating modals. Use a blur of 40px and 4% opacity, tinted with `primary` (#3adffa) to simulate the glow of the clock digits on the surface below.
- **The "Ghost Border" Fallback:** If a divider is required for accessibility in complex lists, use `outline_variant` at 15% opacity. It should be felt, not seen.

---

## 5. Components

### The Analog Clock (SVG)
The analog face is not a circle with numbers, but a minimalist sculpture. 
- **Hands:** The hour hand uses `secondary`, the minute hand uses `on_surface`, and the second hand is a 1px stroke of `primary`.
- **Center Point:** A `surface_container_highest` circle to anchor the hands.

### Buttons
- **Primary:** Gradient-filled (`primary` to `primary_container`) with `on_primary_fixed` text. Roundedness: `full`.
- **Ghost (Tertiary):** No background. `primary` text. Used for "Vazgeç" (Cancel) actions.

### Input Fields & Toggles
- **Inputs:** Use `surface_container_lowest` for the field background. No border. On focus, a subtle glow using `surface_tint` at 20% opacity.
- **Toggles:** The "track" should be `surface_container_high`. The "thumb" should be `primary` when active, creating a striking cyan pop in the dark UI.

### Cards & Lists
- **Rule:** Forbid divider lines.
- **Implementation:** In the "Alarmlar" (Alarms) list, separate items by alternating between `surface` and `surface_container_low`, or simply by 16px of vertical whitespace.

---

## 6. Do's and Don'ts

### Do
- **Do** lean into asymmetry. Place the digital clock in the upper-left quadrant to allow the "void" of the `slate-950` background to feel intentional.
- **Do** use `primary` sparingly. It is a "signal" color. If everything is cyan, nothing is important.
- **Do** ensure Turkish characters (ş, ğ, ç) are tested for vertical alignment in the `display-lg` scale.

### Don't
- **Don't** use pure white (#FFFFFF) for body text. Use `on_surface_variant` (#a5aac2) to reduce eye strain in dark environments.
- **Don't** use standard `0.25rem` corners for large cards. Use `xl` (0.75rem) to soften the "Brutalist" typography and make the app feel approachable.
- **Don't** use "Drop Shadows" on text. If readability is an issue, increase the contrast between `surface` and `on_surface`.