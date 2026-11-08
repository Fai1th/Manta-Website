# Manta Website

Manta's web control panel, built around the supplied manta-ray mark and navy/blue/white identity. The [Manta backend](https://github.com/Fai1th/Manta) powers its real Discord actions and persistent records. No fake statistics or token-entry forms are shipped.

## Free and open source

The website and dashboard are licensed under [MIT](LICENSE), as is the Manta backend. Every included feature is available without a Manta subscription, license key or premium tier. The source can be used, modified and redistributed, including commercially, with its license and copyright notice retained. Dependencies keep their own licenses. The `private: true` package field only prevents accidental npm publication.

Hosting is independent of the license. You can run Manta on compatible infrastructure you already control; no particular paid provider is required. Hosting, storage and domain costs may still apply, and this project does not promise a permanently free cloud host.

The public product site lives at `/`; the management application lives at `/dashboard`. Discord login returns to `/dashboard`. The landing page takes broad composition cues from the user-provided bleed.bot reference, with original Manta copy, the supplied ray mark, navy/ice-blue colors, real product evidence, searchable commands and native FAQ disclosures. No Bleed assets, copy, testimonials or user counts are copied.

## Deploy the public website on Vercel

Import this repository and deploy `main`. The checked-in `vercel.json` selects the Other/static preset, runs `npm run build:vercel`, and publishes `dist`. No Discord token, OAuth secret, session secret or database is needed for this website-only deployment. `/` serves the public site; `/dashboard` explains that the management backend is not connected. The static `/api/me` response contains only that deployment status, never a user session or credentials.

The repository's Dockerfile starts the full bot/API/database app. Letting Vercel auto-detect that Dockerfile selects the Container preset instead of the static website. A successful image build does not establish that its runtime is configured or its data will persist. The explicit static configuration keeps the public site independent of the bot's runtime requirements.

This Vercel mode does **not** run the bot, Discord login or management API. Use the full app's URL for management after deploying its backend. Connecting a separately hosted backend to the Vercel domain requires an explicit proxy/origin configuration; no arbitrary backend destination is configured automatically.

## Deploy the full app without running anything on your computer

GitHub Actions tests each update and publishes the complete Linux amd64 container to `ghcr.io/fai1th/manta-website` after a successful push to `main`. Use the full Git commit SHA as the image tag for a fixed version; `latest` follows the last successful publication. The [published package](https://github.com/Fai1th/Manta-Website/pkgs/container/manta-website) is public and can be pulled without credentials. If you fork this repository, check your own package's visibility before connecting a host. The image contains the public source and dependencies; configure Discord credentials only in the host, never during the image build. The registry stores the image; it does not run the bot.

1. Connect **this repository** to a cloud host that supports a continuously running Docker web service and a persistent volume. Choose Docker deployment using the included `Dockerfile`.
2. Mount the persistent volume at `/data`. Run exactly **one** replica and disable sleeping. Let the host terminate HTTPS and forward traffic to the service port.
3. Add the environment variables listed in the [backend configuration guide](https://github.com/Fai1th/Manta#cloud-configuration): Discord application ID, client secret, bot token, guild ID, random session secret, external HTTPS URL, and proxy hop count. Set `NODE_ENV=production` and `DATA_DIR=/data`. Keep credentials in the host's secret store.
4. Set the application's OAuth2 redirect to `https://YOUR_DOMAIN/auth/callback`, enable the needed intents, and install the bot with the documented permissions and scopes.
5. Deploy and open the resulting URL. Sign in with Discord. Configure staff logging, support roles, tracking exclusions, onboarding and scheduled digests through the dashboard.

Optional paid-host example: Railway. This is not required to use Manta. Connect this repository as a Docker service, use one replica, leave Serverless/sleeping disabled, mount `/data`, and set the healthcheck path to `/healthz`. Set `RAILWAY_RUN_UID=0` so the entrypoint can initialize Railway's root-mounted volume; it then drops to the unprivileged `node` user before starting Manta. Keep the default image start command. Generate the HTTPS domain, use that origin as `PUBLIC_URL`, and configure the same origin in Discord's OAuth redirect. Set host usage alerts/limits appropriate to your budget. See [Railway volumes](https://docs.railway.com/volumes) and [service behavior](https://docs.railway.com/overview/advanced-concepts).

The container downloads an exact public backend commit, installs locked dependencies and adds this website. Everything shares one HTTPS origin: static files, login and the bot-control API. There is no browser-stored bot token, separate API credential, local tunnel, or local server needed in production. The cloud host is still a computer running your code and can charge for that service.

Railway also has a $0 Free plan with $1 monthly resource credit and up to 0.5 GB of volume storage. CPU, memory, storage and traffic consume that credit; it is not a promise of a full month of uptime. New-account trial credit is a separate, temporary allowance. A Limited Trial can restrict outbound connections needed by Discord. Check eligibility, credit exhaustion and volume-retention rules before relying on it for server records. See [current plans](https://docs.railway.com/pricing/plans) and [trial restrictions](https://docs.railway.com/pricing/free-trial).

When updating the backend, first test and push Manta. Then update the full backend SHA in this Dockerfile, test the website against it, commit and push this repo. This explicit pin prevents an unreviewed backend update silently changing a deployment. A host connected only to this repository won't redeploy solely because the Manta repo changes.

For source checks, first run `npm ci --ignore-scripts`, then `npm run check` and `npm test`. `npm run build:vercel` creates the static output. To preview the full app during development with sibling checkouts, run Manta with `WEB_DIR` set to this repo's absolute `dist` path after building the website. Development preview is optional and not needed by server staff.

## Dashboard

Overview, moderation cases, reports and appeals, private tickets, activity analytics, security review and incident restoration, roles/onboarding, scheduled announcements, weekly digest, retention/exclusions, and member self-service. Native semantic HTML and Bootstrap 5.3.8 (served by the pinned backend) provide the forms and table foundation. The brand image is user-supplied; there are no external fonts, analytics scripts or CDN dependencies.

Statistics and records begin when the connected bot observes events. See the backend README for data retention, privilege checks, transcript limits, restart behavior and Discord's built-in AutoMod setup.

## Verification limits

Automated checks cover script syntax and the static integration contract. Backend tests cover the protected API and persistence. Real Discord OAuth, live moderation/role changes, Docker builds, cloud TLS/proxy configuration and full screen-reader auditing require a configured deployment and test Discord server. Do not describe an undeployed repository as a live bot.

## Website development

The public page is now a prerendered React application. `src/Site.jsx` holds the product tour, integration directory, command finder and FAQs; `src/MantaRay.jsx` articulates a vector companion to the supplied ray mark. Embla handles swipe and carousel selection. Phosphor supplies interface icons and Simple Icons supplies platform marks. Manrope is bundled locally, including its font license. See `public/licenses` for notices; platform marks identify integrations without implying endorsement.

Run `npm ci --ignore-scripts`, `npm run check`, `npm test`, then `npm run build:vercel`. Preview `dist`, not the `public` template directory. For a full backend preview, point `WEB_DIR` at the absolute `dist` directory. The Docker multi-stage build compiles the same React assets before copying them into the pinned backend. The Vercel profile still serves an anonymous disconnected dashboard until a full bot backend is deployed.

The product tour has manual swipe/button navigation, a reversible sample report and a sample-period selector. Its sample data is labeled and cannot perform moderation. Integration search, category filters and detail dialogs explain each provider's requirements; actual connections are created in the authenticated dashboard. Current adapters cover GitHub, YouTube, Twitch, Reddit, Steam, WordPress, Medium, Mastodon, RSS/Atom, Zapier, Make and HTTPS webhooks/n8n. Setup and limitations are in the [backend integration guide](https://github.com/Fai1th/Manta#integrations).

The animated ray has separate wing, body and tail motion. The pause control persists the visitor's preference, and the CSS honors system reduced-motion settings. The carousel does not autoplay. No third-party scripts, external fonts or tracking pixels are loaded at runtime.
