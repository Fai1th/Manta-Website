# Manta design and validation manifest

Purpose: a server-owner and staff workspace for Discord management, with a separate member self-service view. Primary task: review the server, take a permitted action, and see its recorded result.

Selected library references: `AGENT START.md`, `01 Foundations/Core Design Rules.md`, `02 Genres/Enterprise Dashboard.md`, `06 Quality/Accessibility Rules.md`, `06 Quality/Professional Release Checklist.md`, and feature-matched controls in `05 Security/` (authorization, sessions/CSRF, queries/output, APIs, secrets/dependencies, headers and verification). The genre is Enterprise Dashboard; the frontend is native HTML/JS, not React. Bootstrap 5.3.8 provides the form/table foundation through Manta's locked package manifest.

Tokens: Segoe UI/system sans; navy `#061427`, ink `#142c45`, blue `#295f91`, muted `#4b6178`, canvas `#f2f5f9`, border `#d6e0eb`, white surfaces; 5–7px radii; 16–24px component spacing; 44px form/button targets. Semantic status badges supplement color with text. The supplied image is used directly at `/assets/manta.png`; no claim of original logo authorship is made.

Structure: sidebar, account header, task title, relevant actions, data tables/details. On mobile the navigation becomes a horizontal strip, columns stack, and tables scroll within their containers. Loading, empty, success, disabled, error/retry and confirmation states are implemented. Destructive confirmation uses native `dialog`; forms have visible labels and focus styles; no animation is required. Status messages use a live region. No invented activity is included in production.

Security: same-origin cookies, backend permission enforcement, no client secrets, escaped untrusted HTML, CSRF and origin checks, no inline event handlers and no external scripts. UI visibility is not an access control. Staff transcripts are protected downloads.

Validated decisions and limitations belong in the repository's verification notes; screenshots of fixture data must be explicitly labeled and must not be represented as real server results. Automated checks and manual QA do not imply full accessibility or security certification.
