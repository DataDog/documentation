---
dependencies: []
disable_edit: true
kind: documentation
meta:
  category: Code Style
  id: javascript-inclusive/comments
  language: JavaScript
  severity: Notice
title: Check comments for wording issues
---
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
