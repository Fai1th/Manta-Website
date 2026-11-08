# Manta Website

Manta's web control panel, built around the supplied manta-ray mark and navy/blue/white identity. The [Manta backend](https://github.com/Fai1th/Manta) powers its real Discord actions and persistent records. No fake statistics or token-entry forms are shipped.

## Deploy without running anything on your computer

1. Connect **this repository** to a cloud host that supports a continuously running Docker web service and a persistent volume. Choose Docker deployment using the included `Dockerfile`.
2. Mount the persistent volume at `/data`. Run exactly **one** replica and disable sleeping. Let the host terminate HTTPS and forward traffic to the service port.
3. Add the environment variables listed in the [backend configuration guide](https://github.com/Fai1th/Manta#cloud-configuration): Discord application ID, client secret, bot token, guild ID, random session secret, external HTTPS URL, and proxy hop count. Set `NODE_ENV=production` and `DATA_DIR=/data`. Keep credentials in the host's secret store.
4. Set the application's OAuth2 redirect to `https://YOUR_DOMAIN/auth/callback`, enable the needed intents, and install the bot with the documented permissions and scopes.
5. Deploy and open the resulting URL. Sign in with Discord. Configure staff logging, support roles, tracking exclusions, onboarding and scheduled digests through the dashboard.

The container downloads an exact public backend commit, installs locked dependencies and adds this website. Everything shares one HTTPS origin: static files, login and the bot-control API. There is no browser-stored bot token, separate API credential, local tunnel, or local server needed in production. The cloud host is still a computer running your code and can charge for that service.

When updating the backend, first test and push Manta. Then update the full backend SHA in this Dockerfile, test the website against it, commit and push this repo. This explicit pin prevents an unreviewed backend update silently changing a deployment. A host connected only to this repository won't redeploy solely because the Manta repo changes.

For source checks: `npm run check` and `npm test`. To preview during development with sibling checkouts, run Manta with `WEB_DIR` set to this repo's absolute `public` path. Development preview is optional and not needed by server staff.

## Dashboard

Overview, moderation cases, reports and appeals, private tickets, activity analytics, security review and incident restoration, roles/onboarding, scheduled announcements, weekly digest, retention/exclusions, and member self-service. Native semantic HTML and Bootstrap 5.3.8 (served by the pinned backend) provide the forms and table foundation. The brand image is user-supplied; there are no external fonts, analytics scripts or CDN dependencies.

Statistics and records begin when the connected bot observes events. See the backend README for data retention, privilege checks, transcript limits, restart behavior and Discord's built-in AutoMod setup.

## Verification limits

Automated checks cover script syntax and the static integration contract. Backend tests cover the protected API and persistence. Real Discord OAuth, live moderation/role changes, Docker builds, cloud TLS/proxy configuration and full screen-reader auditing require a configured deployment and test Discord server. Do not describe an undeployed repository as a live bot.
