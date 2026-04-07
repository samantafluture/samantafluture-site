#!/bin/sh
set -eu

# Deploy samantafluture-site on VPS (runs entirely on VPS, no local toolchain needed)
# Called by the MCP blog_deploy tool or manually via SSH.

PROJECT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
VOLUME="samantafluture_web"
DEST="/usr/share/nginx/samantafluture"

cd "$PROJECT_DIR"

echo "==> Pulling latest changes..."
git fetch origin main && git reset --hard origin/main

echo "==> Building site in Docker..."
HOST_UID="$(id -u)"
HOST_GID="$(id -g)"
docker run --rm \
  --user "${HOST_UID}:${HOST_GID}" \
  -v "$PROJECT_DIR":/app \
  -v "${VOLUME}:/dest" \
  -w /app \
  node:22-alpine \
  sh -c "corepack enable && corepack prepare pnpm@latest --activate && pnpm install --frozen-lockfile && pnpm build && rm -rf /dest/* && cp -r dist/* /dest/"

echo "==> Verifying deployment..."
HTTP_STATUS=$(curl -so /dev/null -w "%{http_code}" https://samantafluture.com)
if [ "$HTTP_STATUS" = "200" ]; then
  echo "==> Deploy complete: samantafluture.com (HTTP $HTTP_STATUS)"
else
  echo "==> WARNING: samantafluture.com returned HTTP $HTTP_STATUS"
  exit 1
fi
