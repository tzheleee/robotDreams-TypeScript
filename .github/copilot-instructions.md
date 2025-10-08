# Copilot Instructions for robotDreams-TS

## Project Overview
This repository contains multiple TypeScript-based projects, each in its own folder (`lect1`, `lection1`, etc.). Each project is structured for Node.js development and uses TypeScript for type safety and modern JS features. The main entry points are in `src/index.ts` for each project.

## Architecture & Structure
- Each folder (e.g., `lect1`, `lection1`) is a standalone TypeScript Node.js app.
- Source code is in `src/`, with the main file as `index.ts`.
- Build output is expected in `dist/` (see `tsconfig.json` comments).
- No shared code or monorepo tooling; treat each folder as an independent app.

## Developer Workflows
- **Development:**
  - Run with hot-reload: `npm run dev` (uses `ts-node-dev`)
- **Build:**
  - Compile TypeScript: `npm run build` (runs `tsc`)
- **Production:**
  - Start compiled app: `npm run start` (runs `node dist/index.js`)
- **TypeScript:**
  - Strict type-checking is enabled (`strict: true` in `tsconfig.json`).
  - Declaration files and source maps are generated.

## Project-Specific Patterns
- User input is handled via `prompt-sync` (see `src/index.ts`).
- Data validation and error messages are implemented interactively in the CLI.
- TypeScript types are defined for user data and used for input validation.
- Comments in code use `// !`, `// ?`, `// +` to mark issues, questions, and improvements.

## External Dependencies
- `prompt-sync` for CLI input.
- `ts-node-dev` for development hot-reload.
- `@types/node` for Node.js type definitions.

## Key Files & Examples
- `src/index.ts`: Main CLI logic, user input, and validation.
- `tsconfig.json`: TypeScript configuration, strict mode, output settings.
- `package.json`: Scripts for dev/build/start, dependencies.

## Conventions
- Each app is self-contained; do not assume cross-folder imports.
- Use TypeScript types for all user-facing data.
- Follow the CLI input validation patterns as shown in `src/index.ts`.
- Use the provided scripts for all build/run tasks.

---

For questions or unclear conventions, review the comments in `src/index.ts` and the settings in `tsconfig.json` for each app. If a pattern is not documented here, prefer the approach found in the most recently updated project folder.
