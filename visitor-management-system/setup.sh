#!/bin/bash

echo "======================================"
echo "Visitor Management System Setup"
echo "======================================"
echo ""

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check Python
echo -e "${BLUE}Checking Python installation...${NC}"
if ! command -v python3 &> /dev/null; then
    echo -e "${RED}Python 3 is not installed. Please install Python 3.8 or higher.${NC}"
    exit 1
fi
echo -e "${GREEN}✓ Python found${NC}"

# Check Node.js
echo -e "${BLUE}Checking Node.js installation...${NC}"
if ! command -v node &> /dev/null; then
    echo -e "${RED}Node.js is not installed. Please install Node.js 14 or higher.${NC}"
    exit 1
fi
echo -e "${GREEN}✓ Node.js found${NC}"
echo ""

# Backend setup
echo -e "${BLUE}Setting up Backend...${NC}"
cd backend

echo "Creating virtual environment..."
python3 -m venv venv

echo "Activating virtual environment..."
source venv/bin/activate 2>/dev/null || . venv/Scripts/activate 2>/dev/null

echo "Installing Python dependencies..."
pip install -r requirements.txt --quiet

echo -e "${GREEN}✓ Backend setup complete${NC}"
cd ..
echo ""

# Frontend setup
echo -e "${BLUE}Setting up Frontend...${NC}"
cd frontend

echo "Installing npm dependencies..."
npm install --silent

echo -e "${GREEN}✓ Frontend setup complete${NC}"
cd ..
echo ""

echo -e "${GREEN}======================================"
echo "Setup Complete!"
echo "======================================${NC}"
echo ""
echo "To run the application:"
echo ""
echo -e "${BLUE}Terminal 1 (Backend):${NC}"
echo "  cd backend"
echo "  source venv/bin/activate  # On Windows: venv\\Scripts\\activate"
echo "  python app.py"
echo ""
echo -e "${BLUE}Terminal 2 (Frontend):${NC}"
echo "  cd frontend"
echo "  npm start"
echo ""
echo -e "${GREEN}The application will open at http://localhost:3000${NC}"
