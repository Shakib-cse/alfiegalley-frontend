#!/usr/bin/env sh
# Create .env.production from example if missing, then run production compose
set -e

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT_DIR"

if [ ! -f ".env.production" ]; then
  if [ -f ".env.production.example" ]; then
    echo ".env.production not found — copying from .env.production.example"
    cp .env.production.example .env.production
    echo "Please edit .env.production to add real secrets if needed."
  else
    echo "No .env.production or .env.production.example found. Create .env.production with required vars and retry."
    exit 1
  fi
fi

echo "Starting production compose..."
docker compose -f docker-compose.production.yml up -d --build
