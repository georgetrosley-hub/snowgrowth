# Snowgrowth

Snowgrowth is a focused expansion workspace for Snowflake account motions. It turns a named account into a recommended stakeholder, workload wedge, demo proof, and outbound touch.

## What It Does

- Opens with a prioritized expansion motion instead of a generic account directory.
- Keeps each account on one guided path: account thesis, stakeholder, wedge, demo, touch.
- Frames each motion around a Snowflake operating layer: data plane, workload, and proof point.
- Exports a ready-to-edit touch for the selected stakeholder and workload.

## Local Commands

```bash
pnpm install
pnpm run dev
pnpm run build
```

## Deployment

The app is configured for static export on Vercel:

- `next.config.mjs` uses `output: "export"`.
- `vercel.json` points Vercel at the exported `out/` directory.
- `next/image` is configured with `images.unoptimized` for static export compatibility.

## Project Shape

The active product surface is intentionally small:

- `src/components/LandingView.tsx` - command-style account entry.
- `src/components/AccountWorkspace.tsx` - guided account motion workspace.
- `src/components/Sidebar.tsx` - account and touch-style controls.
- `src/data/` - account, persona, and use-case configuration.
