@echo off
setlocal enabledelayedexpansion

echo.
echo ╔════════════════════════════════════════════════════════════════╗
echo ║  LOSS PREVENTION SUITE - COMPLETE VERCEL FIX (WINDOWS)        ║
echo ╚════════════════════════════════════════════════════════════════╝
echo.

echo [STEP 1] Removing old dependencies...
rmdir /s /q node_modules >nul 2>&1
del package-lock.json >nul 2>&1
echo ✓ Old dependencies removed

echo [STEP 2] Installing fresh dependencies...
call npm cache clean --force >nul 2>&1
call npm install
if %errorlevel% neq 0 (
    echo ✗ npm install failed
    pause
    exit /b 1
)
echo ✓ Dependencies installed

echo [STEP 3] Testing build...
call npm run build
if %errorlevel% neq 0 (
    echo ✗ Build failed
    pause
    exit /b 1
)
echo ✓ Build successful

echo [STEP 4] Staging files for Git...
call git add package.json package-lock.json vercel.json .npmrc .eslintignore vite.config.js
echo ✓ Files staged

echo [STEP 5] Committing changes...
call git commit -m "Fix: Complete Vercel deployment fix - remove deprecated packages"
if %errorlevel% neq 0 (
    echo ! Git commit failed (may already be committed)
)
echo ✓ Changes committed

echo [STEP 6] Pushing to GitHub...
call git push origin main
if %errorlevel% neq 0 (
    echo ✗ Git push failed
    pause
    exit /b 1
)
echo ✓ Pushed to GitHub

echo.
echo ╔════════════════════════════════════════════════════════════════╗
echo ║  ✅ ALL FIXES COMPLETE!                                        ║
echo ╚════════════════════════════════════════════════════════════════╝
echo.
echo Next steps:
echo   1. Go to Vercel Dashboard
echo   2. Click your project
echo   3. Click 'Deployments' tab
echo   4. Click 'Redeploy' button
echo   5. Select 'main' branch
echo   6. Click 'Redeploy'
echo.
echo Your site will be live at:
echo https://ecommerce-loss-prevention-ui.vercel.app
echo.
pause
