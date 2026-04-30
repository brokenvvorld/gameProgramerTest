# AGENTS.md

## Cursor Cloud specific instructions

This is a purely static front-end quiz app built with **Vite** (vanilla JS, no framework). There is no backend, database, or external service dependency.

### Running the dev server

```bash
npm run dev
```

Vite starts at `http://localhost:5173/gameProgramerTest/` (note the base path from `vite.config.ts`).

### Building

```bash
npm run build
```

Output goes to `dist/`.

### Key notes

- The `base` in `vite.config.ts` is set to `/gameProgramerTest/` for GitHub Pages deployment. When testing locally, always use the full path (e.g., `http://localhost:5173/gameProgramerTest/`).
- No linter or test framework is configured in this project. Validation is done via `npm run build` (TypeScript/Vite compilation check) and manual browser testing.
- All application state is stored in the browser's `localStorage`; there is no server-side persistence.
- The project uses `package-lock.json`, so use `npm` (not yarn/pnpm) for dependency management.
