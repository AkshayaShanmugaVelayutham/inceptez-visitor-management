@echo off
echo ======================================
echo Visitor Management System Setup
echo ======================================
echo.

:: Check Python
echo Checking Python installation...
python --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Python 3 is not installed. Please install Python 3.8 or higher.
    pause
    exit /b 1
)
echo [OK] Python found
echo.

:: Check Node.js
echo Checking Node.js installation...
node --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Node.js is not installed. Please install Node.js 14 or higher.
    pause
    exit /b 1
)
echo [OK] Node.js found
echo.

:: Backend setup
echo Setting up Backend...
cd backend

echo Creating virtual environment...
python -m venv venv

echo Activating virtual environment...
call venv\Scripts\activate

echo Installing Python dependencies...
pip install -r requirements.txt

echo [OK] Backend setup complete
cd ..
echo.

:: Frontend setup
echo Setting up Frontend...
cd frontend

echo Installing npm dependencies...
call npm install

echo [OK] Frontend setup complete
cd ..
echo.

echo ======================================
echo Setup Complete!
echo ======================================
echo.
echo To run the application:
echo.
echo Terminal 1 (Backend):
echo   cd backend
echo   venv\Scripts\activate
echo   python app.py
echo.
echo Terminal 2 (Frontend):
echo   cd frontend
echo   npm start
echo.
echo The application will open at http://localhost:3000
echo.
pause
