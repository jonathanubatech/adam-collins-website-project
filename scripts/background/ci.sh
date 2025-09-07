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
npm test -- --ci

echo "[ci] Building project"
npm run build

echo "[ci] Done."

