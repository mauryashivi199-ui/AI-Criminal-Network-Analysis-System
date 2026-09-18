@echo off
title AI Criminal Network Analysis System Launcher
color 0b

echo =====================================================================
echo       AI-POWERED CRIMINAL NETWORK ANALYSIS SYSTEM (SIH26189)
echo              MINISTRY OF HOME AFFAIRS (MHA) PLATFORM
echo =====================================================================
echo.

set BASE_DIR=%~dp0

echo [*] Starting Python FastAPI Backend on http://localhost:8000 ...
start "KavachNet Backend" cmd /k "cd /d %BASE_DIR%backend && python run_backend.py"

timeout /t 3 /nobreak >nul

echo [*] Starting React Mobile-Responsive Frontend on http://localhost:5173 ...
start "KavachNet Frontend" cmd /k "cd /d %BASE_DIR%frontend && npm run dev"

echo.
echo =====================================================================
echo  System is running!
echo  Desktop Link: http://localhost:5173
echo  Phone Link:   http://10.249.4.64:5173
echo =====================================================================
echo.
pause
