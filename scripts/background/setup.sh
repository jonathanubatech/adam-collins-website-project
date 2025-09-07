#!/usr/bin/env bash
set -euo pipefail

echo "[setup] Installing Node dependencies"
if [ -f package-lock.json ]; then
  npm ci
else
  npm install --no-audit --no-fund
fi

echo "[setup] Ensuring Playwright browsers and OS deps are installed"
npx playwright install --with-deps chromium

echo "[setup] Environment ready."
