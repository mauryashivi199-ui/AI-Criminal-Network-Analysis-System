@echo off
title Push Project to GitHub
color 0b

echo =====================================================================
echo       AI-POWERED CRIMINAL NETWORK ANALYSIS SYSTEM (SIH26189)
echo                    GITHUB DEPLOYMENT ASSISTANT
echo =====================================================================
echo.
echo Please enter your GitHub Repository URL.
echo Example: https://github.com/your-username/criminal-network-analysis.git
echo.
set /p REPO_URL="Enter GitHub Repo URL: "

if "%REPO_URL%"=="" (
    echo.
    echo [!] Error: No URL provided. Exiting.
    pause
    exit /b
)

echo.
echo [*] Configuring remote origin...
git remote remove origin >nul 2>&1
git remote add origin %REPO_URL%
git branch -M main

echo [*] Pushing codebase to GitHub (main branch)...
git push -u origin main

echo.
if %ERRORLEVEL% equ 0 (
    echo =====================================================================
    echo [SUCCESS] Project successfully pushed to GitHub!
    echo =====================================================================
) else (
    echo [!] If authentication failed, ensure you have signed in via GitHub CLI or Personal Access Token.
)

echo.
pause
