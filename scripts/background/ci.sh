#!/usr/bin/env bash
set -euo pipefail

echo "[ci] Bootstrapping environment"
DIR=$(cd "$(dirname "$0")" && pwd)
"$DIR/setup.sh"

echo "[ci] Linting"
npm run lint

echo "[ci] Type checking"
npm run type-check

echo "[ci] Running unit tests"
npm test -- --ci --passWithNoTests

if command -v figma-sites >/dev/null 2>&1; then
  echo "[ci] Building project"
  npm run build
else
  echo "[ci] Skipping build (figma-sites not installed)"
fi

echo "[ci] Done."
