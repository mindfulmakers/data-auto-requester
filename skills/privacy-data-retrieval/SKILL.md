---
name: privacy-data-retrieval
description: Retrieve or request a user's personal data from major consumer services through official privacy/export portals. Use when Codex needs to drive live browser sessions for Google Takeout, Apple Data & Privacy, Meta export flows, Amazon privacy requests, credit bureau disclosures, telecom/travel privacy portals, or similar DSAR/export workflows that require user login, MFA, identity verification, and status tracking.
---

# Privacy Data Retrieval

Use direct Playwright browser actions against official portals to request or download a user's data. For live retrieval work, default to Playwright instead of building or running local project code unless the user explicitly asks for reusable automation.

Never ask the user to paste passwords, 2FA codes, or recovery codes into chat. Let the user enter secrets directly in the browser, then continue once they confirm the step is done.

At the start of a multi-provider session, ask once for a reusable non-sensitive profile packet before opening portals:
- full name
- street address
- city, state, ZIP
- age or date of birth, whichever the user is comfortable sharing upfront
- preferred email address
- preferred phone number

Do not ask for highly sensitive fields like SSN, driver's license number, passport number, tax IDs, or full payment details upfront. Only request those later when a specific official portal requires them to verify identity.

Store any reusable personal profile packet only in `/tmp`, never in the current repo, the skill directory, or any tracked workspace file. Use a clear ephemeral path such as `/tmp/privacy-data-retrieval-profile.json` or a session-specific variant under `/tmp/`.

Keep a separate ephemeral session log in `/tmp` as well, for example `/tmp/privacy-data-retrieval-log.json`. Record each provider's status plus any confirmation number, reference number, case ID, ticket ID, or feedback number shown by the portal.

## Workflow

1. Confirm the target list or choose a prioritized default order from [references/targets.md](references/targets.md).
2. Ask for the reusable non-sensitive profile packet if it has not already been collected in the current session.
3. If non-sensitive details are already visible in Playwright from the current or a prior provider, harvest and normalize them instead of asking the user again.
4. Save the collected profile packet to an ephemeral file in `/tmp` for reuse during the session.
5. If the user later gives a preferred or corrected value, overwrite the older non-sensitive value in the `/tmp` profile file.
6. Initialize or update an ephemeral session log in `/tmp` for provider outcomes and reference numbers.
7. Open the first official privacy/export portal in Playwright.
8. Reuse the profile packet to reduce repeated questions and form-filling interruptions.
9. If login, MFA, or identity confirmation is required, tell the user exactly what is needed in the browser.
10. After giving that instruction, keep polling the browser state automatically for progress at 60-second intervals instead of waiting for a chat reply.
11. If the gated step clears, continue immediately.
12. Only ask the user for confirmation in chat if polling fails, the page is ambiguous, or the user must complete an external action such as clicking an email link.
13. Request the broadest reasonable export:
   - Prefer `all time` over shorter date ranges.
   - Prefer machine-readable formats like `JSON` when offered.
   - Prefer highest media quality when the user is asking to retrieve their data, not just inspect it.
   - Include separate data-log exports when the portal exposes them.
14. Verify the final state:
   - `requested`, `queued`, `download ready`, `needs email confirmation`, or `blocked`.
15. If the portal refuses the request because the user's state is ineligible or outside the covered privacy-rights states, record that state-based refusal in the `/tmp` session log and move on.
16. Capture any visible confirmation number, record number, feedback number, or case ID into the `/tmp` session log before leaving the provider.
17. Stay on the current provider until it reaches a real outcome: requested, queued, downloaded, blocked, state-ineligible, or explicitly skipped by the user.
18. Tell the user the concrete result, then move to the next target without unnecessary recap.
19. If a portal requires an external confirmation email, app approval, or device-only step, hand off the shortest actionable instruction and resume after the user confirms.
20. When the session ends or the user asks, delete the `/tmp` profile file and `/tmp` session log.

## Operating Rules

- Use official company privacy/export portals, not third-party broker tools, unless the user explicitly asks for those services.
- Prefer direct Playwright browser control over local scripts. Local repo code is optional tooling, not a prerequisite for completing the live request workflow.
- If a saved portal URL fails, verify the current official path before proceeding.
- Keep a concise running status in the conversation: what was requested, what is pending, and what still needs user action.
- Reuse the profile packet across providers instead of repeatedly asking for the same name, address, age or DOB, email, and phone details.
- If non-sensitive details are already visible in Playwright fields, confirmation screens, or earlier provider forms, reuse them and persist them to `/tmp` rather than making the user retype them.
- Keep reusable personal details out of repos entirely. Store them only in `/tmp` and remove them when no longer needed.
- Keep provider reference numbers out of repo files too. Store them in the `/tmp` session log with provider name and request status.
- Do not claim a request is complete when the site still requires email confirmation, device approval, or delayed archive preparation.
- If a provider denies access because the user's state does not qualify for that portal's privacy workflow, treat that as a terminal outcome, log it, and continue to the next provider.
- If the portal exposes multiple profiles under one account, request exports for each relevant profile separately.
- If a service blocks automation but is still usable manually, guide the user through the exact next click instead of abandoning the request.
- After telling the user to sign in or complete MFA, poll Playwright automatically at 60-second intervals for page transitions, signed-in navigation, completed forms, or new export controls before asking the user anything else.
- Do not move to the next provider while the current one is still waiting on a login form, identity form, CAPTCHA, or similar gated step unless the user explicitly says to skip it.
- If a site later demands a more sensitive verifier such as SSN or ID number, explain why that field is needed and keep collection limited to that portal's requirement.

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
