# Golden Key Matrix — Claude Context

## Project Purpose

Conference interaction microsite for "The Golden Key to Building Badass Products" — a talk by Adam Dehnel and Dorothy Toth at Open Source North 2026. Attendees interact in real-time during the presentation via a polling/mapping UI. The presenter sees live results on a shared host view.

---

## Tech Stack

| Concern | Choice |
|---|---|
| Framework | RedwoodSDK (rwsdk) — Vite + Cloudflare Workers + React RSC |
| Language | TypeScript (strict) |
| Package manager | pnpm |
| Styling | LESS (no Tailwind, no CSS-in-JS) |
| UI primitives | `radix-ui` umbrella package |
| Real-time state | `useSyncedState` from `rwsdk/use-synced-state` |
| Sessions | `defineDurableSession` from rwsdk (Durable Objects) |
| Lint/format | Biome for TS/JS; Prettier for LESS/CSS only |
| Tests | Vitest (plain, no vitest-pool-workers) |
| Deploy target | Cloudflare Workers |

---

## Repository Layout

```
src/
  worker.tsx              # CF Worker entry — defineApp(), DO exports
  client.tsx              # Client hydration (RSC RPC)
  document.tsx            # HTML document shell
  types.ts                # Shared types (PollAnswer)
  __mocks__/
    cloudflare-workers.ts # Vitest stub — prevents CF runtime import errors
  pages/
    home.tsx
    matrix.tsx
    osn/
      routes.ts
      index.tsx
      welcome.tsx         # Main poll page (server wrapper)
      admin.tsx           # Flag toggle admin page (server component)
      thank-you.tsx
    dev/
      routes.ts
      osn-attendee-poll.tsx
  components/
    footer-links.tsx
    gkm-quadrant.tsx      # Shared quadrant React component (server + client safe)
    osn-welcome-client.tsx  # Client orchestrator — useSyncedState, auth gating
    views/
      attendee-poll.tsx     # Attendee 2D click + role slider
      host-register.tsx     # Presenter code validation form
      host-welcome.tsx      # Live results view + QR code
      osn-admin.tsx         # "use client" admin flag toggle UI
  layouts/
    standard.tsx
  middleware/
    session.ts
    headers.ts
    www-redirect.ts
    osn-redirect.ts       # KV-gated redirect to /osn/welcome
  session/
    durable-object.ts     # SessionDurableObject class
    store.ts              # defineDurableSession setup
  actions/
    host-code-validation.ts  # "use server" — validates presenter code
    feature-flags.ts         # "use server" — setOsnRedirect(code, active)
  styles/
    global.less, variables.less, typography.less, ...
```

---

## Architecture Patterns

### Worker Entry (`src/worker.tsx`)

```ts
export default defineApp([
  wwwRedirect,
  headerMiddleware,
  sessionMiddleware,
  ...syncedStateRoutes(e => e.SYNCED_STATE_DO),
  render(Document, [
    route("/", Pages__Home),
    prefix("/osn", osnRoutes),
    route("/matrix", Pages__Matrix),
    prefix("/dev", DevRoutes),
  ]),
]);

// Both DOs must be top-level named exports here
export { SessionDurableObject, SyncedStateServer };
```

### Real-time Polling Data Flow

```
Attendee clicks/slides → AttendeePoll → recordPollAnswer callback
  → OsnWelcomeClient.setPollAnswerCoordinates (useSyncedState)
  → SyncedStateServer DO syncs to all clients
  → HostWelcome re-renders with updated PollAnswer[]
```

### Durable Objects

- **SessionDurableObject** — `src/session/durable-object.ts`, binding `SESSION_DO`
- **SyncedStateServer** — imported from `rwsdk/use-synced-state/worker`, binding `SYNCED_STATE_DO`
- Both must be top-level named exports from `src/worker.tsx`
- DO migrations in `wrangler.jsonc` are append-only after first deploy

### Session Pattern

- Cookie name: `GOLDEN_KEYS_MATRIX_SESSION`
- Session ID: UUID, anonymous (no user accounts)
- Split into `durable-object.ts` (class) + `store.ts` (defineDurableSession)

### Middleware Pattern

Plain functions placed directly in `defineApp` array:

```ts
export default function headerMiddleware(req: RequestInfo<DefaultAppContext>) { ... }
```

CSP defined as object then joined:

```ts
const cspClaims = { 'default-src': "'self'", 'script-src': "'nonce-...' ..." };
```

### KV Feature Flags

- Binding: `FEATURE_FLAGS` — per-environment IDs in `wrangler.jsonc` (like D1, NOT root-level like DOs)
- Native CF Workers API only — no third-party: `env.FEATURE_FLAGS.get(key)` / `.put(key, value)`
- Values are strings: `"true"` / `"false"` / `null` (not booleans)
- Admin code: `"osn-2026-admin"`, redirect flag key: `"osn_redirect_active"`
- `/osn/admin` is always reachable even when redirect is active — redirect excludes `/osn/*` paths

### OSN Redirect Middleware (`src/middleware/osn-redirect.ts`)

- Redirects all non-`/osn` traffic to `/osn/welcome` when `FEATURE_FLAGS.get("osn_redirect_active") === "true"`
- **Must bail out on WebSocket upgrade requests** — a 302 response to an `Upgrade: websocket` request kills the SyncedState connection with ECONNRESET. Check `request.headers.get("upgrade")?.toLowerCase() === "websocket"` and return early.
- **Use `Host` header to build redirect URL** — `request.url` normalizes to port 80 in wrangler dev. Build the redirect with `new URL(target, request.url)` then override `redirectUrl.host = request.headers.get("host")` to preserve the actual port.
- Exports `shouldOsnRedirect(flagValue, pathname): boolean` as a pure function for unit testing

### GkmQuadrant Component (`src/components/gkm-quadrant.tsx`)

- Shared React component — no `"use client"`, works in both server and client component contexts
- Props: `yAxisTitle`, `xAxisTitle`, `yAxisInfinityLabel?`, `xAxisInfinityLabel?`, `sharedAxisZeroLabel?`, `children?` (markers), `onPointerDown?`, `onPointerMove?`
- Styles in `src/styles/gkm-quadrant.less` — CSS grid `40px 1fr` columns / `auto 40px` rows
- `aspect-ratio: 4/3` on `.gkm-quadrant-click-area` — **width-driven by default**
- For height-driven contexts (host welcome view), wrap in `<div className="osn-quadrant-container">` and override in LESS: `.gkm-quadrant { height: 100%; width: auto; grid-template-rows: 1fr 40px; }`
- Marker positioning: `top: calc(${yPercent}% - 10px)`, `left: calc(${xPercent}% - 10px)` — device-independent

### Host View Viewport Fitting

The OSN host view hides **both** header and footer — available height is `100dvh` minus only the "Welcome!" title (~160px at default base font). Height propagation chain:

1. `layout-standard.less`: `.layout-standard-site-section-osn { height: 100dvh; overflow: hidden; main.main-content { display: flex; flex-direction: column; overflow: hidden; } }`
2. `.site-section-osn`: `display: flex; flex-direction: column; flex: 1; min-height: 0; overflow: hidden`
3. `.osn-welcome-view`: `display: grid; grid-template-columns: 1fr 1fr; grid-auto-rows: 1fr; flex: 1; min-height: 0` — `grid-auto-rows: 1fr` makes the single row fill the flex-allocated height
4. `.osn-welcome-panel`: `display: flex; flex-direction: column; min-height: 0; overflow: hidden` — text is natural height, visual container takes the rest via `flex: 1`

### LESS Conventions

- Globals: `src/styles/global.less` imports `variables.less` + `typography.less`
- Variables: `@color_blue`, `@color_mint`, etc. (underscores, not hyphens, in this project)
- No CSS Modules — plain LESS with cascade
- Site-section classes on `<body>` drive section-specific overrides

---

## Tooling

### Biome (TS/JS)

```
indentStyle: tab, indentWidth: 4, lineWidth: 130
Semicolons: always
Trailing commas: all
Arrow parens: as needed
```

Run: `pnpm biome check` / `pnpm biome format --write`

### Prettier (LESS/CSS only)

Do not run Prettier on `.ts`/`.tsx` files.

### Husky Hooks

- `pre-commit`: biome check + prettier check + vitest
- `commit-msg`: commitlint

### Commitlint

Conventional commits only (`feat:`, `fix:`, `chore:`, `refactor:`, `docs:`, `test:`, `style:`). No custom rules beyond `@commitlint/config-conventional`.

### Release Flow

1. `pnpm semantic-release` — bumps version, updates CHANGELOG, creates GitHub release
2. `pnpm release` — `wrangler deploy --env $CLOUDFLARE_ENV`

Semantic Release needs `fetch-depth: 0` + `persist-credentials: false` in GH Actions.
No `@semantic-release/npm` (private app, no npm publish).

---

## Environments

| Name | When |
|---|---|
| `integration` | Auto-deploy on merge to main |
| `staging` | Future |
| `production` | golden-key-matrix.com (manual) |

---

## Common Gotchas

- `SyncedStateServer` import path is `rwsdk/use-synced-state/worker` (not `rwsdk/realtime`)
- `useSyncedState` client hook is `rwsdk/use-synced-state` (client-side)
- Durable Object classes must be top-level named exports in `worker.tsx` — not re-exported from a barrel
- `wrangler.jsonc` migrations are append-only; never remove old entries
- GH Actions semantic-release: must set `persist-credentials: false` on the checkout step
- KV namespaces are **per-environment** in `wrangler.jsonc` (distinct IDs per env, same binding name in code) — unlike DOs which are root-level
- OSN redirect middleware **must skip WebSocket upgrade requests** or the SyncedState connection dies (ECONNRESET)
- OSN redirect **must use `Host` header** when building redirect URL — `request.url` normalizes to port 80 in wrangler dev
- OSN host view: both header AND footer are hidden — full `100dvh` is available minus the title element only
- Vitest + `cloudflare:workers`: add `src/__mocks__/cloudflare-workers.ts` stub + `resolve.alias` in `vitest.config.ts`; use `vi.hoisted` to create mock values before `vi.mock` factory runs
- `biome.json` `files.includes` needs `"!**/.claude"` to prevent Biome from linting Claude settings files

---

## Key Files Quick Reference

| File | Purpose |
|---|---|
| `src/worker.tsx` | App entry, middleware chain, DO exports |
| `src/components/osn-welcome-client.tsx` | Client orchestrator (useSyncedState, host auth) |
| `src/components/gkm-quadrant.tsx` | Shared quadrant component (server + client safe) |
| `src/components/views/attendee-poll.tsx` | Attendee 2D click map + role slider |
| `src/components/views/host-welcome.tsx` | Presenter live results + QR |
| `src/components/views/osn-admin.tsx` | "use client" admin flag toggle UI |
| `src/middleware/osn-redirect.ts` | KV-gated redirect to /osn/welcome |
| `src/actions/host-code-validation.ts` | Server action, validates presenter code |
| `src/actions/feature-flags.ts` | Server action, setOsnRedirect(code, active) |
| `src/pages/osn/admin.tsx` | Admin page server component |
| `src/styles/variables.less` | Color/space variables |
| `src/styles/gkm-quadrant.less` | Quadrant component styles |
| `src/styles/layout-standard.less` | Layout + OSN viewport override |
| `wrangler.jsonc` | CF Workers config, DO bindings, KV namespaces, environments |
| `.github/workflows/` | CI/CD (release, deploy) |
