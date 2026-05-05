#!/bin/sh
# Entrypoint: if /app/.env.production exists, export its variables then start the app
set -e

# If env file exists, export its variables into the environment
if [ -f "/app/.env.production" ]; then
  # shellcheck disable=SC1091
  set -a
  . /app/.env.production
  set +a
fi

exec bun run start
