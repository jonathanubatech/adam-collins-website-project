Background Agents Setup
=======================

This project is prepped for Cursor Background Agents. Follow these steps once in Cursor (Settings → Background Agents):

1) Integrations
- GitHub: Connect the repository `jonathanubatech/adam-collins-website-project`.
- Slack (optional): Connect a workspace for notifications.

2) Runtime Configuration
- Choose “Dockerfile” and point to `background.Dockerfile` in the repo root.
- This image includes Node 20 and browser deps so tests and Lighthouse/Playwright tools work in headless mode.

3) Install/Bootstrap Commands
Use these as your default setup and CI commands for agents:

- Setup command:
  `bash scripts/background/setup.sh`

- CI command (lint, type-check, unit tests, build):
  `bash scripts/background/ci.sh`

4) Secrets
Add any needed secrets in the Background Agents settings UI:

- `GITHUB_TOKEN` (usually auto-provided by Cursor’s GitHub integration)
- `SLACK_WEBHOOK_URL` (only if you want Slack notifications)
- Any API keys your code calls during analysis or tests

5) Example Agents
- “Quality Gate on PR”: Trigger on every pull request. Command: `bash scripts/background/ci.sh`. Configure to post status back to the PR.
- “Nightly Audit” (optional): Schedule daily to run audits (you can extend `ci.sh` to start a server and run Lighthouse/axe if desired).

Notes
- The Dockerfile pre-installs Playwright browsers. If you add Firefox/WebKit later, re-run `npx playwright install --with-deps` in the setup script.
- If your tests require a running dev server, extend `ci.sh` to boot the app (e.g., `npm run dev` under `xvfb-run`), then hit it from your checks.

Resource Management (Low Memory/Disk)
- Cleanup before builds: `bash scripts/background/docker-clean.sh` (safe), `--aggressive` when necessary
- Limit resources when building/running:
  - Build: `docker build --memory=6g --cpus=2 -t acollins-bg -f background.Dockerfile .`
  - Run: `docker run --rm --memory=6g --cpus=2 --shm-size=1g -v "$(pwd)":/workspace -w /workspace acollins-bg bash scripts/background/ci.sh`
- Keep build context small: `.dockerignore` is configured to exclude `node_modules`, VCS data, and caches.
