#!/usr/bin/env bash
set -euo pipefail

REMOTE_USER="sam"
REMOTE_HOST="187.124.67.117"
REMOTE_PORT="8443"
REMOTE_DIR="~/apps/samantafluture-site"
VOLUME_DIR="/usr/share/nginx/samantafluture"
SSH_CMD="ssh -p $REMOTE_PORT $REMOTE_USER@$REMOTE_HOST"

echo "==> Building site..."
pnpm build

echo "==> Uploading dist/ to VPS..."
rsync -avz --delete -e "ssh -p $REMOTE_PORT" dist/ "$REMOTE_USER@$REMOTE_HOST:$REMOTE_DIR/dist/"

echo "==> Copying into Docker volume..."
$SSH_CMD "sudo cp -r $REMOTE_DIR/dist/* $VOLUME_DIR/"

echo "==> Verifying deployment..."
HTTP_STATUS=$(curl -so /dev/null -w "%{http_code}" https://samantafluture.com)
if [ "$HTTP_STATUS" = "200" ]; then
  echo "==> Deploy complete: samantafluture.com (HTTP $HTTP_STATUS)"
else
  echo "==> WARNING: samantafluture.com returned HTTP $HTTP_STATUS"
  exit 1
fi
