# Agent Skills Repo

This repository is now structured as an Agent Skills source repo in the style used by [`vercel-labs/agent-skills`](https://github.com/vercel-labs/agent-skills).

## Included Skills

- `privacy-data-retrieval`
  - Drives official privacy/export portals with Playwright
  - Handles user login and MFA handoffs safely in-browser
  - Focuses on high-yield targets like Google, Apple, Meta, Amazon, Uber, and major privacy request portals

## Repo Layout

```text
skills/
  privacy-data-retrieval/
    SKILL.md
    agents/openai.yaml
    references/targets.md
```

## Install

From a local checkout:

```bash
npx skills add /Users/gabemontague/Projects/mindful-makers/code/data-auto-requester
```

From GitHub:

```bash
npx skills add https://github.com/mindfulmakers/data-auto-requester
```

Install a single skill directly:

```bash
npx skills add https://github.com/mindfulmakers/data-auto-requester/tree/main/skills/privacy-data-retrieval
```

## Notes

- The original discovery notes that informed this skill remain in `SPEC.md`.
- The reusable skill lives under [`skills/privacy-data-retrieval`](/Users/gabemontague/Projects/mindful-makers/code/data-auto-requester/skills/privacy-data-retrieval).
- The live browser workflow is encoded in the skill itself, not in repo-local Node tooling.
