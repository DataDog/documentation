---
aliases:
- /continuous_integration/static_analysis/rules/javascript-inclusive/identifiers
- /static_analysis/rules/javascript-inclusive/identifiers
dependencies: []
disable_edit: true
group_id: javascript-inclusive
meta:
  category: Code Style
  id: javascript-inclusive/identifiers
  language: JavaScript
  severity: Notice
  severity_rank: 3
title: Check identifier names for wording issues
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `javascript-inclusive/identifiers`

**Language:** JavaScript

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
```javascript
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
```javascript
{ secondary: false }
const a = { 'primary': false, };
const a = { c, ...denylist } = b;
const { AllowedList } = b;
[primary, ...secondary] = b;
```
