# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## What this is

A Korean-language lead-generation site ("돌봄이음") with two intake forms that write directly to Postgres (Supabase) via server actions, plus an unauthenticated admin section for managing submitted leads.

- `/workingmom` — form for parents requesting emergency/short-term childcare
- `/senior` — form for 50-60s applying to provide that care
- `/admin` — list/edit/delete leads from both forms. **No authentication** — anyone with the URL can read and modify lead PII. Don't add auth-shaped assumptions (session, roles) without being asked.

## Commands

```bash
npm run dev          # start dev server (localhost:3000)
npm run build        # production build
npm run lint          # eslint
npm run db:generate   # generate a Drizzle migration from src/db/schema.ts changes
npm run db:migrate    # apply pending migrations to DATABASE_URL
npm run db:studio     # open Drizzle Studio against DATABASE_URL
```

There is no test suite configured.

Requires a `.env` (gitignored) with `DATABASE_URL` set to the Supabase transaction-pooler connection string — `src/db/index.ts` throws immediately if it's missing, which breaks `dev`, `build`, and every `db:*` command.

Optional: `RESEND_API_KEY` enables admin email notifications on lead submission (via [src/lib/resend.ts](src/lib/resend.ts)). Unlike `DATABASE_URL`, this is read lazily and just skips sending (with a console warning) if unset — it must never become a hard dependency for `dev`/`build`.

## Architecture

- **Next.js App Router**, single root layout at [src/app/layout.tsx](src/app/layout.tsx). No nested layouts — each route page renders its own `<SiteHeader />`.
- **Data flow**: each form page (`src/app/{workingmom,senior}/page.tsx`) is a client component using `useActionState` bound to a co-located `"use server"` action in that route's `actions.ts`. The action does a single `db.insert(...)` against the Drizzle schema, fires an admin notification email via `sendAdminNotification` ([src/lib/resend.ts](src/lib/resend.ts)), and returns a `{ status: "idle" | "success" | "error" }` state — no redirects, the page conditionally renders a success view in place. Email send failures are caught inside `sendAdminNotification` and never fail the submission — the lead is already saved by that point.
- **Admin**: `src/app/admin/**` mirrors the same co-located `actions.ts` pattern for update/delete, reading/writing the same two tables directly. List/edit pages use `export const dynamic = "force-dynamic"` since they read straight from the DB (not `fetch`) and must not be statically cached.
- **Database**: [src/db/schema.ts](src/db/schema.ts) defines two independent tables (`working_mom_requests`, `senior_applications`), both with `.enableRLS()`. [src/db/index.ts](src/db/index.ts) creates a single shared `postgres-js` client — note `{ prepare: false }` is required because the connection goes through Supabase's transaction pooler, which doesn't support prepared statements. Don't remove that option.
- **Migrations**: [drizzle.config.ts](drizzle.config.ts) scopes `tablesFilter` to only the two lead-form tables, and outputs to `drizzle/`. After editing `schema.ts`, run `db:generate` then `db:migrate` — this repo uses generate/migrate, not `db push`.
- Array-valued form fields (`careScope`, `preferredServices`) are serialized client-side into a hidden comma-joined input, then split back into an array inside the server action before insert.
- Styling is Tailwind v4 utility classes only, no component library. `workingmom` uses a rose color scheme, `senior` uses teal — keep that convention when touching either page.

## Before writing code

This project pins a Next.js version with breaking changes relative to what you may know from training data. Check `node_modules/next/dist/docs/` for current API/convention guidance before assuming behavior, especially around routing, server actions, and config.
