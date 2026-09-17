@echo off
title KavachNet-AI Launch Controller
color 0b

echo =====================================================================
echo            KAVACHNET-AI : CRIMINAL NETWORK ANALYSIS SYSTEM
echo              SIH26189 - MINISTRY OF HOME AFFAIRS (MHA)
echo =====================================================================
echo.
echo [*] Starting FastAPI Graph Intelligence Backend on http://localhost:8000 ...
start "KavachNet-AI Backend" cmd /k "cd /d %~dp0backend && python run_backend.py"

timeout /t 2 /nobreak >nul

echo [*] Starting React Tactical Command Center on http://localhost:5173 ...
start "KavachNet-AI Frontend" cmd /k "cd /d %~dp0frontend && npm run dev"

echo.
echo =====================================================================
echo  KavachNet-AI is launching!
echo  Backend:   http://localhost:8000  (Docs: http://localhost:8000/docs)
echo  Frontend:  http://localhost:5173
echo =====================================================================
echo.
pause
