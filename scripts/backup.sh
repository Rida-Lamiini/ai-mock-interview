#!/bin/bash

# Database backup script for production
# Run this script periodically to backup your PostgreSQL database

set -e

BACKUP_DIR="./backups"
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_FILE="$BACKUP_DIR/backup_$DATE.sql"

# Create backup directory if it doesn't exist
mkdir -p $BACKUP_DIR

echo "Creating database backup: $BACKUP_FILE"

# Create backup using docker exec
docker-compose -f docker-compose.prod.yml exec -T db pg_dump -U mockerdb_owner -d mockerdb_prod > $BACKUP_FILE

# Compress the backup
gzip $BACKUP_FILE

echo "Backup completed: $BACKUP_FILE.gz"

# Optional: Remove backups older than 30 days
find $BACKUP_DIR -name "backup_*.sql.gz" -mtime +30 -delete

echo "Old backups cleaned up (kept last 30 days)"
