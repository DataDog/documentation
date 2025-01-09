---
aliases:
- /continuous_integration/static_analysis/rules/javascript-inclusive/formal-parameters
- /static_analysis/rules/javascript-inclusive/formal-parameters
dependencies: []
disable_edit: true
group_id: javascript-inclusive
meta:
  category: Code Style
  id: javascript-inclusive/formal-parameters
  language: JavaScript
  severity: Notice
  severity_rank: 3
title: Check parameter names for wording issues
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `javascript-inclusive/formal-parameters`

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
function a(master, slave) {}
function a(blacklist, whitelist) {}
class A { foo(master, slave) {} }

```

## Compliant Code Examples
```javascript
function denyList(primary, secondary) {}
```
