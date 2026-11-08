# Manta design manifest

## React overhaul · 2026-11-08

Purpose: help Discord server owners assess Manta, inspect real workflows and find the right setup path. The public genre remains Minimal Product; the management application remains an operational dashboard. The audit found repeated slogans, decorative text symbols, a static hero and shallow feature blocks. The redesign uses direct copy, an articulated ray, a manual product carousel, meaningful sample state, the actual labeled dashboard screenshot, and a searchable integration directory. No customer counts, testimonials or live connection claims are invented.

The public page now uses React 19.3.1, React DOM 19.3.1, Embla Carousel React 8.6.0, Phosphor React 2.1.10 and Simple Icons 16.37.0. Manrope variable 5.3.0 is served locally. esbuild 0.28.2 prerenders HTML and compiles a hashed production module. Only used icons ship; the measured JS artifact is about 333 KB uncompressed. The source lockfile pins exact package versions. Notices are under public/licenses. Brand logos do not imply endorsement. Original supplied PNG remains in the source assets; the header/favicon use a small static companion SVG built from the animated paths; the animated vector is a code-native companion based on its silhouette, not an unrelated generated mascot.

Tokens: navy #070f19; surface #0d1825; ink #f1f6fb; muted #a8b7c8; ice blue #a9cee5; border #263546. Main text contrasts exceed AA in the checked base combinations. Manrope has a restrained heading weight and a single type hierarchy. Cards are used for the integration directory, where items share the same operation. The product tour, ownership information, command rows and FAQ each use different structures for their content.

Motion exception: the user explicitly requested a fully animated manta. Separate CSS wing, body, glide and tail cycles add the brand motion; a persistent pause control and reduced-motion CSS provide a still alternative. The carousel is manual, with buttons and swipe; inactive slides are inert. Native dialog provides focus containment, Escape dismissal and focus restoration. The static HTML remains readable before React loads. No external scripts or inline handlers are required by the build.

Standing copy preference: run the Humanizer skill in embedded mode for UI and typography changes. Preserve real requirements, remove generic slogans and rhetorical triads, and keep labels concrete. This preference is also recorded in AGENTS.md and the local Manta project note.

## Policy pages · 2026-11-08

Privacy and Terms use a quiet, single-column reading layout with the existing Manrope, navy and ice-blue tokens. They are standalone HTML at /privacy.html and /terms.html so the static and Docker profiles serve the same documents without extra routing or JavaScript. The public support contact is hi@fai1th.com, supplied by the owner. Both site and dashboard link to the policies. Copy distinguishes the currently disconnected Vercel website from a deployed bot, explains transcript exports and retention exceptions, and preserves MIT rights. No additional dependencies or data collection.
