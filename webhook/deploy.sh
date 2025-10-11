#!/bin/bash

# Exit on error
set -e

# Log function
log() {
  echo "[deploy.sh] $1"
}

# The service name should be passed as an environment variable by the server
SERVICE_NAME="$1"

if [[ -z "$SERVICE_NAME" ]]; then
  log "❌ No service name provided. Usage: ./deploy.sh <frontend|backend>"
  exit 1
fi

log "🔄 Pulling new image for service: $SERVICE_NAME"
docker compose -f docker-compose.prod.yml pull "$SERVICE_NAME"

log "♻️ Recreating service: $SERVICE_NAME"
docker compose -f docker-compose.prod.yml up -d --no-deps "$SERVICE_NAME"

log "✅ Deployment finished for $SERVICE_NAME"

SERVICE=$1
TAG=latest

echo "Rebuilding $SERVICE with tag $TAG"

# Pull the new image
docker pull rida999/$SERVICE:$TAG

# Stop and remove old container
docker stop $SERVICE || true
docker rm $SERVICE || true

# Run new container
docker run -d --name $SERVICE -p 3000:3000 rida999/$SERVICE:$TAG

echo "Successfully redeployed $SERVICE:$TAG"