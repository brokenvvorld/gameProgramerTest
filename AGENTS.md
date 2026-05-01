# AGENTS.md

## Cursor Cloud specific instructions

This is a **purely static front-end** quiz app (vanilla JS + Vite). No backend, database, or external services are required.

### Quick reference

| Task | Command |
|------|---------|
| Install deps | `npm install` |
| Dev server | `npm run dev` (default: `http://localhost:5173/`) |
| Build | `npm run build` (outputs to `dist/`) |
| Preview build | `npm run preview` |

### Notes

- Node.js 20 is required (matches CI config in `.github/workflows/deploy.yml`).
- The only devDependency is `vite`. There are zero production dependencies.
- No linter or test framework is configured in the project; lint/test commands are not available.
- The app is a single-page application; all state is stored in `localStorage`.
- Vite config uses `base: './'` for relative path deployment to GitHub Pages.
- To expose the dev server on all interfaces (useful in cloud VMs), run `npm run dev -- --host 0.0.0.0`.
