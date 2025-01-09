---
aliases:
- /continuous_integration/static_analysis/rules/typescript-inclusive/identifiers
- /static_analysis/rules/typescript-inclusive/identifiers
dependencies: []
disable_edit: true
group_id: typescript-inclusive
meta:
  category: Code Style
  id: typescript-inclusive/identifiers
  language: TypeScript
  severity: Notice
  severity_rank: 3
title: Check identifier names for wording issues
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `typescript-inclusive/identifiers`

**Language:** TypeScript

**Severity:** Notice

**Category:** Code Style

## Description
Ensure that some words are not used in the codebase and suggest a replacement when appropriate.

Examples of replacement suggestions:

-   `blacklist` with `denylist`
-   `whitelist` with `allowlist`
-   `master` with `primary`
-   `slave` with `secondary`

## Non-Compliant Code Examples
```typescript
{ slave: false }
const a = { 'master': false, };
const a = { ['master']: false, };
const a = { c, ...blacklist } = b;
const { whitelist } = b;
const a = { whitelist };
const { whitelist: slave } = b;
[slave, ...master] = blacklist;
```

## Compliant Code Examples
```typescript
{ secondary: false }
const a = { 'primary': false, };
const a = { c, ...denylist } = b;
const { AllowedList } = b;
[primary, ...secondary] = b;
```
