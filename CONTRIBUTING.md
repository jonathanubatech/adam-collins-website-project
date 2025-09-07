Contributing Guide
==================

This project follows conventional commits, small focused pull requests, and an automated quality gate.

Branches
- feature/<short-desc> for new functionality
- fix/<short-desc> for bug fixes
- chore/<short-desc> for maintenance and tooling

Conventional Commits
- feat(scope): summary — user‑visible feature
- fix(scope): summary — bug fix
- docs(scope): summary — documentation only
- chore(scope): summary — tooling, deps, CI, refactors without user impact
- perf(scope): summary — performance improvements
- test(scope): summary — tests only

Pull Request Checklist
- Update or add docs for user‑facing or tooling changes
- Include links to related issues
- Pass lint, type‑check, tests, and build locally
- Keep diffs focused and well‑scoped

Local Quality Gate
- Lint: `npm run lint`
- Types: `npm run type-check`
- Tests: `npm test`
- Build: `npm run build`

Background Agents
- Runtime: `background.Dockerfile`
- Setup: `scripts/background/setup.sh`
- CI: `scripts/background/ci.sh`
- Cleanup (low disk/memory): `scripts/background/docker-clean.sh`

