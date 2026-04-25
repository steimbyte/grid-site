#!/bin/bash

# Site Grid Build Script
# Rebuilds npm, docker, and restarts the container

set -e

echo "🚀 Starting Site Grid build..."

cd "$(dirname "$0")"

echo "📦 Building npm..."
npm run build

echo "📁 Copying dist to server/public..."
cp -r dist/* server/public/

echo "🐳 Docker compose down..."
docker-compose down

echo "🐳 Docker compose build & up..."
docker-compose up -d --build

echo "✅ Build complete!"
echo "🌐 http://localhost:3000"
