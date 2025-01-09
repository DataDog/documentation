---
aliases:
- /continuous_integration/static_analysis/rules/typescript-best-practices/no-ex-assign
- /static_analysis/rules/typescript-best-practices/no-ex-assign
dependencies: []
disable_edit: true
group_id: typescript-best-practices
meta:
  category: Best Practices
  id: typescript-best-practices/no-ex-assign
  language: TypeScript
  severity: Error
  severity_rank: 1
title: Avoid reassigning exceptions in catch clauses
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `typescript-best-practices/no-ex-assign`

**Language:** TypeScript

**Severity:** Error

**Category:** Best Practices

## Description
Catching an exception and assigning a different value to the error parameter will overwrite the reference to the original error data, which will be lost since there is no `arguments` object in a catch clause.

## Non-Compliant Code Examples
```typescript
try { } catch (e) { e = 10; }
try { } catch (ex) { ex = 10; }
try { } catch (ex) { [ex] = []; }
try { } catch (ex) { ({x: ex = 0} = {}); }
try { } catch ({message}) { message = 10; }
```

## Compliant Code Examples
```typescript
try { } catch (e) { three = 2 + 1; }
try { } catch ({e}) { this.something = 2; }
function foo() { try { } catch (e) { return false; } }
```
