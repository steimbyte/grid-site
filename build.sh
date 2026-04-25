#!/bin/bash

# Site Grid Build Script
# Rebuilds npm, docker, and restarts the container

set -e

echo "🚀 Starting Site Grid build..."

cd "$(dirname "$0")"

echo "📦 Building npm..."
npm run build

# Backup index.html with mobile meta tags before copy
cp server/public/index.html /tmp/index.html.bak
cp -r dist/* server/public/
cp /tmp/index.html.bak server/public/index.html

echo "🐳 Docker compose down..."
docker-compose down

echo "🐳 Docker compose build & up..."
docker-compose up -d --build

echo "📤 Pushing to GitHub (deploy branch)..."
git add -A
if git diff --staged --quiet; then
  echo "   No changes to commit"
else
  TIMESTAMP=$(date '+%Y-%m-%d %H:%M')
  git commit -m "deploy: $TIMESTAMP" || true
  git push origin deploy 2>/dev/null || git push origin master
fi

echo "✅ Build complete!"
echo "🌐 http://localhost:3000"
