#!/usr/bin/env sh
# Run the built image while mounting .env.production into /app/.env.production
set -e

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT_DIR"

if [ ! -f ".env.production" ]; then
  echo ".env.production not found. Copy .env.production.example first or create .env.production"
  exit 1
fi

IMAGE_NAME="alfiegalley-app:latest"

echo "Running $IMAGE_NAME with mounted .env.production..."
docker run -d -p 3000:3000 \
  -v "$ROOT_DIR/.env.production:/app/.env.production:ro" \
  --name alfiegalley-app \
  "$IMAGE_NAME"
