#!/bin/bash

echo "=========================================="
echo "Starting Visitor Management System"
echo "=========================================="
echo ""

# Check if backend is already running
if lsof -Pi :5000 -sTCP:LISTEN -t >/dev/null ; then
    echo "Backend is already running on port 5000"
else
    echo "Starting Backend Server..."
    cd backend
    python3 app.py &
    BACKEND_PID=$!
    cd ..
    sleep 3
fi

# Check if frontend is already running
if lsof -Pi :3000 -sTCP:LISTEN -t >/dev/null ; then
    echo "Frontend is already running on port 3000"
else
    echo "Starting Frontend Server..."
    cd frontend
    npm start &
    FRONTEND_PID=$!
    cd ..
fi

echo ""
echo "=========================================="
echo "Servers Started!"
echo "=========================================="
echo ""
echo "Backend:  http://localhost:5000"
echo "Frontend: http://localhost:3000"
echo ""
echo "Press Ctrl+C to stop all servers"
echo ""

# Wait for user to press Ctrl+C
trap "kill $BACKEND_PID $FRONTEND_PID 2>/dev/null; exit" INT
wait
