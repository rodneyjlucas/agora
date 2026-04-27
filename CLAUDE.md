# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Agora is an interactive JavaScript learning platform focused on **core ECMAScript 2025 (ES2025) language fundamentals**. It delivers interview-style coding and theory challenges with a live code editor, adaptive difficulty based on user performance, and comprehensive tracking of strengths and weaknesses.

## Architecture

Agora is a full-stack monorepo with the following structure:

```
agora/
├── frontend/          # React + TypeScript + Vite SPA
├── backend/           # Node.js/Express REST API
├── questions/         # Question repository (JSON/YAML files)
├── shared/            # Shared types and utilities
└── docs/              # Documentation
```

### Frontend (`frontend/`)
- **Tech**: React 19, JavaScript, Vite
- **Editor**: Monaco Editor for code input
- **Styling**: Tailwind CSS for UI components
- **State**: Zustand or React Context for user state, session data, and score tracking
- **Key features**: Interactive question rendering, real-time code editing, progress tracking

### Backend (`backend/`)
- **Tech**: Node.js (latest LTS with ES2025 support), Express
- **API**: REST endpoints for:
  - Question retrieval (with adaptive difficulty logic)
  - Code submission and validation
  - User progress tracking
  - Score calculations and analytics
- **Code Execution**: Execute user-submitted JavaScript in a sandboxed environment (Node.js worker threads with restricted globals)
  - Supports ES2025 syntax and features
  - Isolates user code from file system and network access
  - Returns execution results, errors, and console output
- **Database**: PostgreSQL or MongoDB for user profiles, question attempts, and progress history

### Questions (`questions/`)
- Repository of challenges organized by difficulty and topic
- **Focus**: Core JavaScript language fundamentals (ES2025)
- Format: JSON/YAML files with:
  - Question text (theory or coding challenge prompt)
  - Expected solution or test cases (executable JavaScript)
  - Difficulty level (beginner, intermediate, advanced)
  - Topic tags (closures, async/await, prototypes, destructuring, optional chaining, nullish coalescing, etc.)
  - ES2025 feature tags (if applicable)
- **Topics covered**: Variables, scope, hoisting, functions, closures, prototypes, async/await, promises, generators, destructuring, spread operator, template literals, modules, error handling, etc.
- Adaptive algorithm selects questions based on user performance and topic mastery

### Shared (`shared/`)
- Shared utilities and helper functions used by both frontend and backend
- Validation functions
- Question format definitions

## Commands

### Frontend Development
```bash
cd frontend
npm install
npm run dev       # Start Vite dev server
npm run build     # Build for production
npm run lint      # Lint with ESLint
```

### Backend Development
```bash
cd backend
npm install
npm run dev       # Start dev server with hot reload
npm run build     # Build for production (if needed)
npm run test      # Run test suite
npm run lint      # Lint with ESLint
```

### Running Full Stack Locally
```bash
# Terminal 1: Start backend
cd backend && npm run dev

# Terminal 2: Start frontend
cd frontend && npm run dev
```

### Question Management
```bash
# Validate question repository structure
npm run validate-questions

# Generate question index
npm run index-questions
```

## Key Design Decisions

### Code Execution
- User-submitted code is executed server-side in an isolated Node.js worker thread
- Prevents malicious code from affecting the platform
- Allows testing of Node.js-specific APIs (fs, crypto, etc.)
- Results are streamed back to the frontend with timeout protection

### Adaptive Difficulty
- Tracks user performance metrics: correct/incorrect attempts, time taken, topic mastery
- Algorithm recommends next question based on:
  - Current difficulty level (easy → medium → hard)
  - Topics where user struggled
  - Consecutive correct answers (increases difficulty)
- User can manually adjust difficulty preference

### User Progress Tracking
- Stores every attempt (code, result, timestamp) for learning analytics
- Calculates strength/weakness scores by topic
- Enables detailed performance review and recommendations

## Development Notes

- **JavaScript**: Use `.js` files; consider JSDoc comments for documentation where helpful
- **Monorepo**: Use workspace feature if using npm workspaces or consider Turborepo for build caching
- **API versioning**: Start with `/api/v1/` for future compatibility
- **Question format**: Validate schema at build time to catch errors early
- **Testing**: Prioritize tests for code validation and adaptive algorithm logic
- **Linting**: Use ESLint to maintain code consistency across frontend and backend
