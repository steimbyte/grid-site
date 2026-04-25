#!/bin/bash

# Site Grid Build Script
# Rebuilds npm, docker, and restarts the container

set -e

echo "🚀 Starting Site Grid build..."

cd "$(dirname "$0")"

echo "📦 Building npm..."
npm run build

# Get the new JS file name from dist
NEW_JS=$(ls dist/assets/*.js 2>/dev/null | head -1 | xargs basename)
NEW_CSS=$(ls dist/assets/*.css 2>/dev/null | head -1 | xargs basename)

echo "📁 Copying dist to server/public..."
cp -r dist/* server/public/

# Update the index.html to use new file names and add mobile meta tags
cat > server/public/index.html << HTML
<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <meta name="theme-color" content="#0a0a0f">
  <meta name="apple-mobile-web-app-capable" content="no">
  <meta name="apple-mobile-web-app-status-bar-style" content="default">
  <meta name="mobile-web-app-capable" content="no">
  <meta name="format-detection" content="telephone=no">
  <title>Site Grid</title>
  <script src="https://unpkg.com/lucide@latest/dist/umd/lucide.min.js"></script>
  <script type="module" crossorigin src="/assets/${NEW_JS}"></script>
  <link rel="stylesheet" crossorigin href="/assets/${NEW_CSS}">
</head>
<body>
  <div id="app"></div>
</body>
</html>
HTML

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
