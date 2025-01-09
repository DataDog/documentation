---
aliases:
- /continuous_integration/static_analysis/rules/typescript-inclusive/declarations
- /static_analysis/rules/typescript-inclusive/declarations
dependencies: []
disable_edit: true
group_id: typescript-inclusive
meta:
  category: Code Style
  id: typescript-inclusive/declarations
  language: TypeScript
  severity: Notice
  severity_rank: 3
title: Check declaration names for wording issues
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


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
