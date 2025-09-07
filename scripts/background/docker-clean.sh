#!/usr/bin/env bash
set -euo pipefail

# Simple, safe(ish) Docker cleanup to reclaim space and reduce memory pressure.
# Usage:
#   bash scripts/background/docker-clean.sh          # safe defaults (older than 7 days)
#   bash scripts/background/docker-clean.sh -y       # non-interactive
#   bash scripts/background/docker-clean.sh --aggressive  # remove almost everything unused

CONFIRM=false
AGGRESSIVE=false
AGE="168h" # 7 days

for arg in "$@"; do
  case "$arg" in
    -y|--yes) CONFIRM=true ;;
    --aggressive) AGGRESSIVE=true ;;
    --age=*) AGE="${arg#*=}" ;;
  esac
done

if ! command -v docker >/dev/null 2>&1; then
  echo "Docker not found. Install Docker Desktop or Docker Engine first." >&2
  exit 1
fi

echo "[info] Current Docker disk usage:"
docker system df -v || true

if [ "$AGGRESSIVE" = true ]; then
  echo "[warn] Aggressive prune will remove unused images, containers, networks, build cache, and volumes."
  $CONFIRM || read -r -p "Proceed with aggressive prune? [y/N] " ans; ans=${ans:-N}
  if [[ "$CONFIRM" = true || "$ans" =~ ^[Yy]$ ]]; then
    docker system prune -a --volumes -f
  else
    echo "Canceled."; exit 0
  fi
else
  echo "[clean] Removing stopped containers older than $AGE"
  docker container prune -f --filter "until=$AGE" || true

  echo "[clean] Removing dangling images"
  docker image prune -f || true

  echo "[clean] Removing unused images older than $AGE"
  docker image prune -a -f --filter "until=$AGE" || true

  echo "[clean] Removing dangling volumes"
  docker volume prune -f || true

  echo "[clean] Removing build cache"
  docker builder prune -f || true
fi

echo "[done] Cleanup complete. New usage:"
docker system df -v || true

