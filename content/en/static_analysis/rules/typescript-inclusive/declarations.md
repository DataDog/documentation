---
dependencies: []
disable_edit: true
kind: documentation
meta:
  category: Code Style
  id: typescript-inclusive/declarations
  language: TypeScript
  severity: Notice
title: Check declaration names for wording issues
---
## Metadata
**ID:** `typescript-inclusive/declarations`

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
function foo_blacklist() {}
a(function *blackList() {});
function *whItEList() {}
function blacklist_names() {}
function whiteList() {}
class WhiteList {}
const slave = 0;
let master = "";
var slave = b;
```

## Compliant Code Examples
```typescript
function foo_denyList() {}
a(function *allowedList() {});
class primary {}
const secondary = 0;
```
