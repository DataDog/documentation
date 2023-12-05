---
dependencies: []
disable_edit: true
kind: documentation
meta:
  category: Code Style
  id: javascript-inclusive/formal-parameters
  language: JavaScript
  severity: Notice
title: Check parameter names for wording issues
---
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
