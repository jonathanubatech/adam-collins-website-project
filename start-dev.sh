#!/bin/bash

# Adam Collins Website Project - Development Startup Script
# This script sets up the development environment and opens Cursor

echo "🚀 Starting Adam Collins Website Project Development Environment"
echo "================================================================"

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: Please run this script from the project root directory"
    exit 1
fi

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Error: Node.js is not installed. Please install Node.js 18+ first"
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ Error: npm is not installed. Please install npm 8+ first"
    exit 1
fi

echo "✅ Prerequisites check passed"

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
    if [ $? -ne 0 ]; then
        echo "❌ Error: Failed to install dependencies"
        exit 1
    fi
    echo "✅ Dependencies installed successfully"
else
    echo "✅ Dependencies already installed"
fi

# Create necessary directories if they don't exist
echo "📁 Setting up project structure..."
mkdir -p reports
mkdir -p .claude/artifacts
mkdir -p .claude/recovery
mkdir -p .taskmaster/tasks
mkdir -p .taskmaster/reports
echo "✅ Project structure ready"

# Display project information
echo ""
echo "📋 Project Information:"
echo "  • Project: Adam Collins Website Project"
echo "  • Type: Full Claude Integration with AI agents"
echo "  • Purpose: Debug and optimize Figma Sites website for production"
echo "  • Timeline: 2-4 weeks"
echo ""

# Display available commands
echo "🛠️  Available Commands:"
echo "  • npm run dev          - Start development server"
echo "  • npm run build        - Build for production"
echo "  • npm run test         - Run unit tests"
echo "  • npm run quality-check - Run comprehensive quality checks"
echo "  • npm run lint         - Run ESLint"
echo "  • npm run type-check   - Run TypeScript checking"
echo ""

# Display AI agent integration
echo "🤖 AI Agent Integration:"
echo "  • Claude: Primary development assistant"
echo "  • TaskMaster: AI-powered task management"
echo "  • Perplexity AI: Research and best practices"
echo "  • Full automation: Quality checks, testing, deployment"
echo ""

# Open Cursor
echo "🎯 Opening project in Cursor..."
if command -v cursor &> /dev/null; then
    cursor .
    echo "✅ Cursor opened successfully"
else
    echo "⚠️  Cursor not found in PATH. Please open Cursor manually and open this directory"
    echo "   Directory: $(pwd)"
fi

echo ""
echo "🎉 Development environment ready!"
echo "   Next steps:"
echo "   1. Review project instructions in .claude/prompts/project-instructions.md"
echo "   2. Check current state in .claude/context/current_state.md"
echo "   3. Initialize TaskMaster for AI task management"
echo "   4. Start debugging and optimizing the Figma Sites website"
echo ""
echo "Happy coding! 🚀"
