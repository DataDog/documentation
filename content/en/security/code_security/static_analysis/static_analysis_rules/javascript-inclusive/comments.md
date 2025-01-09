---
aliases:
- /continuous_integration/static_analysis/rules/javascript-inclusive/comments
- /static_analysis/rules/javascript-inclusive/comments
dependencies: []
disable_edit: true
group_id: javascript-inclusive
meta:
  category: Code Style
  id: javascript-inclusive/comments
  language: JavaScript
  severity: Notice
  severity_rank: 3
title: Check comments for wording issues
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `javascript-inclusive/comments`

**Language:** JavaScript

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
```javascript
/**
 *  whitelist names to prevent unauthorized usage
 */

// she SHE should check her code

// he should check his
```

## Compliant Code Examples
```javascript
// allowlist names to prevent unauthorized usage

/* the comments do not have a history of issues */
```
