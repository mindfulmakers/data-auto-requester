# Privacy Retrieval Targets

Use this file when choosing where to start or when a user says "get my data back" without naming every company.

## High-Yield Default Order

Start with the services that usually hold the largest share of structured personal data:

1. Google
2. Apple
3. Meta
4. Amazon
5. Uber
6. Credit bureaus and identity aggregators

Then continue into telecom, travel, and health platforms if the user wants broader coverage.

## Portal Map

### Google

- Portal: `https://takeout.google.com/`
- Goal: Queue a broad Google Takeout export.
- Notes:
  - Usually preselects many products already.
  - Prefer one-time export.
  - The archive is usually delivered later by email.

### Apple

- Portal: `https://privacy.apple.com/`
- Goal: Request a copy of Apple account data.
- Notes:
  - Include both standard data and large iCloud datasets when offered.
  - Apple often says preparation can take up to seven days.

### Meta

- Portal: `https://accountscenter.facebook.com/info_and_permissions/`
- Goal: Request exports for each relevant profile.
- Notes:
  - Handle Facebook and Instagram separately.
  - Prefer `all available information`, `all time`, `JSON`, and highest media quality.
  - Request Facebook data logs separately if Meta exposes them.
  - Meta may prompt for password re-entry mid-flow.

### Amazon

- Portal: `https://www.amazon.com/gp/privacycentral/dsar/preview.html`
- Goal: Request all available Amazon data.
- Notes:
  - Prefer `Request All Your Data` if available.
  - Amazon often requires the user to click a confirmation link sent by email before the request is finalized.

### Microsoft

- Portal: `https://www.microsoft.com/en-us/privacy`
- Goal: Move into the Microsoft privacy dashboard after sign-in.
- Notes:
  - Skip if the user wants a narrower set of companies.
  - Start from the public privacy page, then continue into the account dashboard.

### Uber

- Portal: `https://privacy.uber.com/privacy/exploreyourdata`
- Goal: Request a copy of trip and account data.
- Notes:
  - The archive often arrives later by email.

## Credit And Identity

### Experian

- Portal: `https://consumerprivacy.experian.com/`
- Goal: Submit a consumer privacy or disclosure request.

### Equifax

- Portal: `https://myprivacy.equifax.com/`
- Goal: Submit an access request or consumer disclosure request.

### TransUnion

- Portal: `https://www.transunion.com/consumer-privacy`
- Goal: Request consumer privacy data.
- Notes:
  - Anti-bot controls may interfere with automation.

### LexisNexis Risk Solutions

- Portal: `https://consumer.risk.lexisnexis.com/request`
- Goal: Request a consumer disclosure.
- Notes:
  - Identity verification documents may be required.

## Telecom

### AT&T

- Portal: `https://about.att.com/pages/privacy/rights_choices`

### Verizon

- Portal: `https://www.verizon.com/privacy/your-privacy-choices`

### T-Mobile

- Portal: `https://www.t-mobile.com/privacy-center`

## Travel

### American Airlines

- Portal: `https://www.aa.com/i18n/customer-service/support/privacy-policy.jsp`

### United Airlines

- Portal: `https://www.united.com/privacy`
- Notes:
  - Browser or protocol errors may require manual retry.

### Delta

- Portal: `https://www.delta.com/us/en/legal/privacy-and-security`
- Notes:
  - Anti-bot controls may interfere with automation.

## Health And Biometric

### Apple Health

- Portal: `https://support.apple.com/108366`
- Goal: Guide the user through on-device export.
- Notes:
  - This is a manual export from the Health app, not a browser request.

### WHOOP

- Portal: `https://www.whoop.com/us/en/whoop-privacy-policies/`

### Oura

- Portal: `https://ouraring.com/privacy-policy`

## Blocking And Escalation

- If the site is login-gated, ask the user to sign in directly in the browser.
- If the site requires MFA or password re-entry, stop and wait for the user.
- If the site requires email confirmation, tell the user exactly that and mark the request as pending.
- If the site blocks Playwright but the path is still clear, guide the user through the manual clicks rather than abandoning the request.
