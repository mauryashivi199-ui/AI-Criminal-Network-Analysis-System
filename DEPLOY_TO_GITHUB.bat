@echo off
title Push AI-Criminal-Network-Analysis-System to GitHub
color 0b

echo =====================================================================
echo       AI-POWERED CRIMINAL NETWORK ANALYSIS SYSTEM (SIH26189)
echo                    PUSHING CODE TO GITHUB
echo =====================================================================
echo.
echo [*] Target Repository: https://github.com/mauryashivi199-ui/AI-Criminal-Network-Analysis-System.git
echo.
cd /d %~dp0

echo [*] Setting branch to main...
git branch -M main

echo [*] Pushing all files to GitHub...
git push -u origin main

echo.
if %ERRORLEVEL% equ 0 (
    echo =====================================================================
    echo [SUCCESS] Code successfully pushed to your GitHub repository!
    echo URL: https://github.com/mauryashivi199-ui/AI-Criminal-Network-Analysis-System
    echo =====================================================================
) else (
    echo [!] If prompted for login, please sign in with GitHub browser prompt or Personal Access Token (PAT).
)

echo.
pause
