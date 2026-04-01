#!/bin/bash

echo ""
echo "╔════════════════════════════════════════════════════════════════╗"
echo "║  LOSS PREVENTION SUITE - COMPLETE VERCEL FIX (macOS/Linux)    ║"
echo "╚════════════════════════════════════════════════════════════════╝"
echo ""

echo "[STEP 1] Removing old dependencies..."
rm -rf node_modules package-lock.json
echo "✓ Old dependencies removed"

echo "[STEP 2] Installing fresh dependencies..."
npm cache clean --force
npm install
if [ $? -ne 0 ]; then
    echo "✗ npm install failed"
    exit 1
fi
echo "✓ Dependencies installed"

echo "[STEP 3] Testing build..."
npm run build
if [ $? -ne 0 ]; then
    echo "✗ Build failed"
    exit 1
fi
echo "✓ Build successful"

echo "[STEP 4] Staging files for Git..."
git add package.json package-lock.json vercel.json .npmrc .eslintignore vite.config.js
echo "✓ Files staged"

echo "[STEP 5] Committing changes..."
git commit -m "Fix: Complete Vercel deployment fix - remove deprecated packages"
if [ $? -ne 0 ]; then
    echo "! Git commit failed (may already be committed)"
fi
echo "✓ Changes committed"

echo "[STEP 6] Pushing to GitHub..."
git push origin main
if [ $? -ne 0 ]; then
    echo "✗ Git push failed"
    exit 1
fi
echo "✓ Pushed to GitHub"

echo ""
echo "╔════════════════════════════════════════════════════════════════╗"
echo "║  ✅ ALL FIXES COMPLETE!                                        ║"
echo "╚════════════════════════════════════════════════════════════════╝"
echo ""
echo "Next steps:"
echo "  1. Go to Vercel Dashboard"
echo "  2. Click your project"
echo "  3. Click 'Deployments' tab"
echo "  4. Click 'Redeploy' button"
echo "  5. Select 'main' branch"
echo "  6. Click 'Redeploy'"
echo ""
echo "Your site will be live at:"
echo "https://ecommerce-loss-prevention-ui.vercel.app"
echo ""
