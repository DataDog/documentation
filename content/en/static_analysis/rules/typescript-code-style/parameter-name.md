---
dependencies: []
disable_edit: true
kind: documentation
meta:
  category: Code Style
  id: typescript-code-style/parameter-name
  language: TypeScript
  severity: Notice
title: Parameter name should use camelCase
---
## Metadata
**ID:** `typescript-code-style/parameter-name`

**Language:** TypeScript

**Severity:** Notice

**Category:** Code Style

## Description
Ensure that parameter names use `camelCase` and not `snake_case` or `PascalCase`.

## Non-Compliant Code Examples
```typescript
const a = { setValue(NewValue, event_info?) {} }
class A { setValue(NewValue, event_info) {} }
function setValue(NewValue, event_info) {}
const a = function(NewValue, event_info) {}
```

## Compliant Code Examples
```typescript
const a = { getValue() {} }
class A { setValue(newValue) {} }
class B { setValue(md5, valid5String) {} }
```
