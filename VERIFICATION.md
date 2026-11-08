# Verification evidence

2026-11-08. The backend owns API/data checks; this repo owns public-site and dashboard checks.

- `npm run check`: script syntax for the dashboard and public-site interactions.
- `npm test`: same-origin dashboard integration contract, public/private route separation, labeled screenshot, and command search/category/empty-state behavior.
- GitHub Actions builds the complete container from the pinned backend. A smoke check boots it with a root-owned ephemeral `/data` mount, verifies HTTP health and both public/dashboard pages, and checks that the database file is owned by the unprivileged node user.
- Manual browser checks use disposable QA data, not a production Discord server. The dashboard's staff report update was submitted and its resolved status observed. All dashboard screens loaded. A 320px viewport check found horizontal overflow; the grid minimum-width fix removed page overflow (document scroll width equaled client width, 305 CSS pixels excluding the scrollbar).
- The product screenshot is captured from that actual QA dashboard and explicitly identified as test data in the public page.
- Public-site browser checks: community filter plus `support` search showed only `/ticket`; an unmatched search showed the empty state; the FAQ answer expanded; Open dashboard reached `/dashboard` and displayed the existing management app. The final homepage was visually inspected and captured. A later public-page viewport override did not change the measured width, so narrow-screen visual verification of the final landing page remains unconfirmed; the earlier dashboard mobile check is separate evidence.

Still unverified: live Discord OAuth and API actions, production volume backup/restore, cloud deployment secrets/TLS/proxy configuration, and a full assistive-technology audit. GitHub CI completion and the final public-page browser results should be checked against the current commit rather than inferred from this checklist.

## Vercel static deployment repair

2026-11-08: the deployed public URL returned HTTP 500 `FUNCTION_INVOCATION_FAILED`, while Vercel showed the latest commit as Ready with the Container preset. Deployment/runtime log access was denied by the connected Vercel account, so the exact container exception was not verified. The root Dockerfile starts a production bot/API/SQLite process with mandatory runtime settings; it is not a standalone static website deployment.

The explicit Vercel profile selects Other/static, builds `dist`, bundles Bootstrap locally, rewrites `/dashboard`, and serves a nonauthenticated website-only status at `/api/me`. Regression checks execute the build with a dummy runtime secret, verify output/assets/routes, and execute the dashboard script against that status to confirm the backend-disconnected explanation and absence of staff API calls. Docker and its full-app smoke test remain separate coverage. No Discord credentials, ephemeral production database, weakened startup validation or fake connected state were added to make the website load.

## React redesign verification · 2026-11-08

The public site is prerendered React with a manual Embla product carousel, a reversible sample-report flow, a sample-period selector, integration category/search/empty states and native setup dialogs. All seven website regression tests pass. Syntax checks pass. The Docker build now compiles the same React assets and pins backend 36eb0bbd9400f06b1ea1d9d792958dd2f0a25f00, whose 20 tests pass. Dependency installs reported zero known vulnerabilities. Runtime assets are local, with notices shipped under /licenses.

Browser checks against the built local site verified report resolution without a Discord call, carousel selection, 7/30-day sample updates, Twitch discovery and its host-credential instructions, dialog focus, mobile menu open/close, animation pause and preference persistence across reload. No warning/error console entries were captured. At 390px, client and scroll widths were both 375px. At 320px, both were 305px. The viewport override was reset after checks. The oversized ocean SVG was clipped within the art region to fix page overflow. Base color contrast calculations: ink/background 17.7:1, muted/surface 8.75:1, primary button text/fill 10.4:1. These checks do not establish full WCAG compliance.

Public-feed read-only checks successfully parsed GitHub, YouTube, Steam, WordPress and Reddit responses. Integration credentials and Discord actions were tested with fixtures; no production connections were created. Twitch live posting, real webhook receivers and the authenticated Discord dashboard need a configured backend and test server. System reduced-motion CSS is tested in source, but changing the OS motion setting and a full screen-reader audit were not performed.
