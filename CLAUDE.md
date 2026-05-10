# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Agora is an interactive JavaScript learning platform focused on **core ECMAScript 2025 (ES2025) language fundamentals**. It delivers interview-style coding and theory challenges with a live code editor, adaptive difficulty based on user performance, and comprehensive tracking of strengths and weaknesses.

## Architecture

Agora is organized with the following structure:

```text
agora/
├── study-notes/       # Interactive HTML study guides and tutorials
├── questions/         # Question/challenge repository (JSON/YAML files)
├── src/               # JavaScript source code
├── scripts/           # Utility scripts
├── Philosophy/        # Design philosophy and learning principles
├── package.json       # Project dependencies
└── pnpm-lock.yaml     # Lockfile for pnpm package manager
```

### Study Notes (`study-notes/`)

- **Purpose**: Interactive HTML-based tutorials and learning guides
- **Coverage**: Core JavaScript and ECMAScript 2025 fundamentals
- **Format**: Self-contained HTML files covering:
  - Event loops and async patterns
  - Type coercion and type system
  - Functions and arrow functions
  - Call by sharing (pass by reference semantics)
  - Symbol coercion and advanced topics
- **Navigation**: `index.html` serves as a knowledge hub with topic-based organization and full-text search

### Questions (`questions/`)

- Repository of coding challenges and theory questions
- **Format**: JSON/YAML files with:
  - Question text (theory or coding challenge prompt)
  - Difficulty level (beginner, intermediate, advanced)
  - Topic tags (closures, async/await, prototypes, destructuring, etc.)
  - ES2025 feature tags (if applicable)
- **Topics covered**: Variables, scope, hoisting, functions, closures, prototypes, async/await, promises, generators, destructuring, spread operator, template literals, modules, error handling, etc.

### Source Code (`src/`)

- JavaScript implementation and utilities
- Core learning platform logic

### Philosophy (`Philosophy/`)

- Design principles and pedagogical approach
- Learning objectives and theory

## Commands

### Project Setup

```bash
pnpm install      # Install all dependencies
```

### Development

```bash
pnpm run dev      # Start development server (if configured)
```

### Linting & Code Quality

```bash
pnpm run lint     # Run linter (ESLint/Biome)
pnpm run format   # Format code
```

### Question Management

```bash
# Validate question repository structure
pnpm run validate-questions

# Generate question index
pnpm run index-questions
```

## Key Design Decisions

### Learning Approach

- Focus on **core JavaScript fundamentals** from the ECMAScript 2025 specification
- Interactive study guides provide both theory and practical examples
- Self-contained HTML files enable offline study and easy deployment

### Content Organization

- Topics grouped by concept (async/event loop, type system, functions, references)
- Each guide includes explanations, code examples, and key takeaways
- Knowledge hub (`study-notes/index.html`) connects related topics

### Questions Repository

- Challenges are decoupled from platform code for easy maintenance and updates
- JSON/YAML format allows programmatic access and version control
- Questions tagged by difficulty and topic for targeted practice

## Development Notes

- **Package Manager**: Use `pnpm` (configured in project)
- **Study Guides**: Keep HTML files self-contained and accessible without a server where possible
- **Navigation**: Update `study-notes/index.html` when adding new guides
- **Questions**: Validate question JSON/YAML schema at build time
- **Tagging**: Use consistent difficulty levels (beginner, intermediate, advanced) and topic tags across all questions
- **Code Examples**: Test all example code in guides to ensure correctness
- **ECMAScript**: Target ES2025 features and semantics; document any dependencies on newer spec features
