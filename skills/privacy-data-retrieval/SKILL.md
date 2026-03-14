---
name: privacy-data-retrieval
description: Retrieve or request a user's personal data from major consumer services through official privacy/export portals. Use when Codex needs to drive live browser sessions for Google Takeout, Apple Data & Privacy, Meta export flows, Amazon privacy requests, credit bureau disclosures, telecom/travel privacy portals, or similar DSAR/export workflows that require user login, MFA, identity verification, and status tracking.
---

# Privacy Data Retrieval

Use direct Playwright browser actions against official portals to request or download a user's data. Prefer live browser work over building or running local project code unless the user explicitly asks for reusable automation.

Never ask the user to paste passwords, 2FA codes, or recovery codes into chat. Let the user enter secrets directly in the browser, then continue once they confirm the step is done.

## Workflow

1. Confirm the target list or choose a prioritized default order from [references/targets.md](references/targets.md).
2. Open the first official privacy/export portal in Playwright.
3. If login, MFA, or identity confirmation is required, stop and tell the user exactly what is needed in the browser.
4. After the user completes the gated step, inspect the current page state and continue the flow.
5. Request the broadest reasonable export:
   - Prefer `all time` over shorter date ranges.
   - Prefer machine-readable formats like `JSON` when offered.
   - Prefer highest media quality when the user is asking to retrieve their data, not just inspect it.
   - Include separate data-log exports when the portal exposes them.
6. Verify the final state:
   - `requested`, `queued`, `download ready`, `needs email confirmation`, or `blocked`.
7. Tell the user the concrete result, then move to the next target without unnecessary recap.
8. If a portal requires an external confirmation email, app approval, or device-only step, hand off the shortest actionable instruction and resume after the user confirms.

## Operating Rules

- Use official company privacy/export portals, not third-party broker tools, unless the user explicitly asks for those services.
- Prefer direct Playwright browser control over local scripts. Local repo code is optional tooling, not a prerequisite for completing the live request workflow.
- If a saved portal URL fails, verify the current official path before proceeding.
- Keep a concise running status in the conversation: what was requested, what is pending, and what still needs user action.
- Do not claim a request is complete when the site still requires email confirmation, device approval, or delayed archive preparation.
- If the portal exposes multiple profiles under one account, request exports for each relevant profile separately.
- If a service blocks automation but is still usable manually, guide the user through the exact next click instead of abandoning the request.

## Handoffs

Use short, concrete handoffs:

- `Sign in there, then tell me and I’ll continue.`
- `Approve the 2FA prompt on your device, then tell me when it’s done.`
- `Amazon emailed a confirmation link. Click it, then I’ll continue with the next portal.`

Avoid vague prompts like `let me know when ready`.

## Notes By Platform

- Google Takeout usually allows one broad export request in-session and then emails the download link later.
- Apple Data & Privacy often takes up to seven days and may split normal data and large iCloud datasets.
- Meta exports are per profile. Facebook and Instagram should be handled separately, and Facebook data logs are a separate request when available.
- Amazon may allow a combined request, but often requires a confirmation link sent by email before the request is finalized.
- Some services only expose partial data in browser and require on-device export, such as Apple Health.

## Reference Files

- Read [references/targets.md](references/targets.md) for the prioritized target list, portal URLs, and platform-specific caveats.
