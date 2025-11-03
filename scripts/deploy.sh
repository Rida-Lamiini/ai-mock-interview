#!/bin/bash

# Production deployment script for AI Mock Interview
# This script should be run on your EC2 instance

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

log() {
    echo -e "${GREEN}[DEPLOY]${NC} $1"
}

error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

# Check if .env.prod exists
if [ ! -f ".env.prod" ]; then
    error ".env.prod file not found! Please create it with your production environment variables."
    exit 1
fi

# Load environment variables
set -a
source .env.prod
set +a

# Check required environment variables
if [ -z "$DB_PASSWORD" ]; then
    error "DB_PASSWORD not set in .env.prod"
    exit 1
fi

log "Starting deployment..."

# Pull latest changes (if using git)
if [ -d ".git" ]; then
    log "Pulling latest changes from git..."
    git pull origin main
fi

# Stop existing containers
log "Stopping existing containers..."
docker-compose -f docker-compose.prod.yml down || true

# Remove old images (optional, for clean deployment)
log "Cleaning up old Docker images..."
docker image prune -f || true

# Build and start services
log "Building and starting services..."
docker-compose -f docker-compose.prod.yml up -d --build

# Wait for services to be healthy
log "Waiting for services to start..."
sleep 30

# Check if services are running
log "Checking service status..."
if docker-compose -f docker-compose.prod.yml ps | grep -q "Up"; then
    log "✅ Deployment successful!"
    log "Frontend should be available at: http://your-server-ip"
    log "Backend API available at: http://your-server-ip/api"
else
    error "❌ Some services failed to start. Check logs:"
    docker-compose -f docker-compose.prod.yml logs
    exit 1
fi

# Optional: Run database migrations if needed
# log "Running database migrations..."
# docker-compose -f docker-compose.prod.yml exec backend ./mvnw flyway:migrate

log "Deployment completed successfully!"
