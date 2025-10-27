#!/bin/bash

echo "🚀 Starting Job Management Application..."
echo ""

# Check if node_modules exist in backend
if [ ! -d "backend/node_modules" ]; then
    echo "📦 Installing backend dependencies..."
    cd backend && npm install && cd ..
fi

# Check if node_modules exist in frontend
if [ ! -d "frontend/node_modules" ]; then
    echo "📦 Installing frontend dependencies..."
    cd frontend && npm install && cd ..
fi

echo ""
echo "✅ Dependencies installed!"
echo ""
echo "Starting servers..."
echo "Backend: http://localhost:3001"
echo "Frontend: http://localhost:3000"
echo ""

# Start both servers
cd backend && npm run start:dev &
cd frontend && npm run dev &

wait
