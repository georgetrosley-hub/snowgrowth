# Snowgrowth

**Snowgrowth** is the product name for this workspace. The npm package id is `snowflake-expansion-engine` (repository folder name).

Snowgrowth is a focused expansion workspace for Snowflake account motions. It turns a named account into a recommended stakeholder, workload wedge, demo proof, and outbound touch.

## What It Does

- Opens with a prioritized expansion motion instead of a generic account directory.
- Keeps each account on one guided path: account thesis, stakeholder, wedge, demo, touch.
- Frames each motion around a Snowflake operating layer: data plane, workload, and proof point.
- Exports a ready-to-edit touch for the selected stakeholder and workload.

## Governance & data handling

- **Classification**: Treat account narratives, deal hypotheses, pipeline ranges, and stakeholder lists as **internal business information**. Do not paste regulated personal data into the static data layer; this app ships account copy to the browser as part of the static build.
- **Source of truth**: Account content lives in `src/data/` (TypeScript). Changes should be reviewed like any other code change. Prefer small, auditable diffs over bulk unreviewed imports.
- **Ownership**: Name a maintainer for the fork or deployment (who updates accounts, how often, and who approves merges).

## Access control (hosting)

This project uses **Next.js static export** (`output: "export"`). Authentication is not implemented in the app bundle; **control access at the edge**:

1. **Vercel**: Enable **Deployment Protection** (e.g. Vercel Authentication, password protection on preview/production, or SSO where your plan supports it). Restrict the project team and deployment visibility.
2. **Corporate front door**: Put the site behind your IdP (e.g. Cloudflare Access, Okta fronting, or VPN-only internal hosting) if the content is sensitive.

`vercel.json` adds baseline **security headers** (frame denial, MIME sniffing, referrer policy, permissions policy). Headers complement but do not replace login.

## Continuous integration

GitHub Actions runs on pushes and pull requests to `main` / `master`: install, **lint**, **typecheck**, **test**, **build**. Keep `pnpm-lock.yaml` committed so CI stays reproducible.

## Local Commands

```bash
pnpm install
pnpm run dev
pnpm run lint
pnpm run typecheck
pnpm run test
pnpm run build
```

Use `pnpm run test:watch` during development.

## Deployment

The app is configured for static export on Vercel:

- `next.config.mjs` uses `output: "export"`.
- `vercel.json` points Vercel at the exported `out/` directory and sets security headers.
- `next/image` is configured with `images.unoptimized` for static export compatibility.

## Project Shape

The active product surface is intentionally small:

- `src/components/LandingView.tsx` - command-style account entry.
- `src/components/AccountWorkspace.tsx` - guided account motion workspace.
- `src/components/Sidebar.tsx` - account and touch-style controls.
- `src/data/` - account, persona, and use-case configuration.

Unit tests live next to modules as `*.test.ts` (Vitest).
