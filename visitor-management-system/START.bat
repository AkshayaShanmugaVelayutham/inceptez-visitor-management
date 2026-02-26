@echo off
echo ==========================================
echo Starting Visitor Management System
echo ==========================================
echo.

:: Start Backend
echo Starting Backend Server...
start "Backend Server" cmd /k "cd backend && python app.py"
timeout /t 3 /nobreak >nul

:: Start Frontend
echo Starting Frontend Server...
start "Frontend Server" cmd /k "cd frontend && npm start"

echo.
echo ==========================================
echo Both servers are starting!
echo ==========================================
echo.
echo Backend: http://localhost:5000
echo Frontend: http://localhost:3000
echo.
echo Two new windows will open - DO NOT CLOSE THEM!
echo Close this window only.
echo.
pause
