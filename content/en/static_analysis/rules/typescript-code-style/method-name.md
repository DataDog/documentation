---
dependencies: []
disable_edit: true
kind: documentation
meta:
  category: Code Style
  id: typescript-code-style/method-name
  language: TypeScript
  severity: Notice
title: Method name should use camelCase
---
## Metadata
**ID:** `typescript-code-style/method-name`

**Language:** TypeScript

**Severity:** Notice

**Category:** Code Style

## Description
Ensure that method names use `camelCase` and not `snake_case` or `PascalCase`.

## Non-Compliant Code Examples
```typescript
const a = { GetValue() {} }
class A { set_value() {} }
class A { *set_value() {} }
class A { #set_value() {} }
class A { #SetValue() {} }
```

## Compliant Code Examples
```typescript
const a = { getValue() {} }
class A { setValue() {} }
class A { #fooBla() {} }
```
