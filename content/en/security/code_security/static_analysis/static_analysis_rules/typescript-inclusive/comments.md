---
aliases:
- /continuous_integration/static_analysis/rules/typescript-inclusive/comments
- /static_analysis/rules/typescript-inclusive/comments
dependencies: []
disable_edit: true
group_id: typescript-inclusive
meta:
  category: Code Style
  id: typescript-inclusive/comments
  language: TypeScript
  severity: Notice
  severity_rank: 3
title: Check comments for wording issues
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `typescript-inclusive/comments`

**Language:** TypeScript

**Severity:** Notice

**Category:** Code Style

## Description
Check the variable names and suggest better names.

Examples of replacement suggestions:

-   `blacklist` with `denylist`
-   `whitelist` with `allowlist`
-   `master` with `primary`
-   `slave` with `secondary`

## Non-Compliant Code Examples
```typescript
/**
 *  whitelist names to prevent unauthorized usage
 */

// she SHE should check her code

// he should check his
```

## Compliant Code Examples
```typescript
// allowlist names to prevent unauthorized usage

/* the comments do not have a history of issues */
```
