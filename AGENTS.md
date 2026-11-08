# Manta Website project instructions

The public product site is `/`; the staff/member management application is `/dashboard`. Preserve both routes and the same-origin API/OAuth design. The backend is `Fai1th/Manta`, pinned to a full commit in the Dockerfile.

Vercel uses the explicit static profile in `vercel.json`, built with `npm run build:vercel`. It serves the public site and an honest backend-disconnected dashboard screen; it must not start the Docker bot, create database sessions, or expose Discord secrets. Docker remains the full bot/API deployment. Test both profiles when changing deployment behavior.

- Verify source with `npm run check` and `npm test`. GitHub CI builds and smoke-tests the complete container, including root-mounted volume ownership and the two website routes.
- Keep the supplied ray artwork, Manta name, navy/ice-blue brand, accessible forms and truthful product claims. Test data must be labeled. Do not copy third-party assets, claims or testimonials from a visual reference.
- Daily management belongs in the dashboard. Do not expose bot credentials in frontend files or turn hidden buttons into the only authorization check.
- The user requests committing and immediately pushing completed work. Keep the backend pin paired with tested source.

## Design references and optional local memory

For design work, start with `D:/03 - Documents and Notes/Web Design Library/AGENT START.md`, then core rules and the selected genre/security notes. Use `DESIGN.md` and `VERIFICATION.md` as this project's manifest and evidence log.

When available, read `D:/Obsidian/CS-Notes/Codex/Projects/Manta.md` and only its relevant linked decisions. Current source and checks take priority over remembered facts. Update the brief with actual commit/check evidence after authorized work, without secrets or production data. If the vault is unavailable, continue from repository evidence and report that limitation.
