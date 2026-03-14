# data-auto-requester

`SPEC.md` makes one constraint clear: there is no single API that can retrieve everything. The practical route is an assisted browser workflow that opens each official export or privacy portal, lets you complete identity checks, and records what happened.

This project gives you that workflow with Playwright:

- Opens the official portal for each high-value target from `SPEC.md`
- Reuses a persistent Chromium profile so logins survive across runs
- Captures downloads into `artifacts/downloads/`
- Writes a request tracker to `artifacts/request-tracker.json` and `artifacts/request-tracker.csv`
- Keeps all artifacts out of git via `.gitignore`

## Install

```bash
npm install
npx playwright install chromium
```

## Usage

List the target catalog:

```bash
npm run list
```

Run the interactive browser flow for every target:

```bash
npm start
```

Run a subset:

```bash
npm start -- --only google,apple,uber
```

Smoke-test portal URLs headlessly:

```bash
npm run smoke -- --only google,apple,meta,uber
```

## Notes

- `apple-health` is intentionally treated as a manual export because Apple Health data is exported from the Health app on-device.
- Some portals start from a privacy policy or help article because the actual request flow is account-gated or dynamically linked.
- Some companies block headless browsers or bot-like traffic, so `npm run smoke` is a link check, not a guarantee that the interactive flow will be blocked in a normal headed browser.
- Downloaded archives and tracker files can contain personal data, so they are written only under `artifacts/`.
