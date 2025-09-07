#!/usr/bin/env bash
set -euo pipefail

echo "[setup] Installing Node dependencies with npm ci"
npm ci

echo "[setup] Ensuring Playwright browsers are installed"
npx playwright install --with-deps chromium

echo "[setup] Environment ready."

