---
dependencies: []
disable_edit: true
kind: documentation
meta:
  category: Code Style
  id: typescript-code-style/function-naming
  language: TypeScript
  severity: Notice
title: Function name should use camelCase or PascalCase
---
## Metadata
**ID:** `typescript-code-style/function-naming`

**Language:** TypeScript

**Severity:** Notice

**Category:** Code Style

## Description
Ensure that the function uses `camelCase` or `PascalCase` in case it is an `Object`. Generator functions should always be `camelCase`.

## Non-Compliant Code Examples
```typescript
function My_Class() {}
function get_value() {}
function* GetValue() {}
function *get_value() {}
```

## Compliant Code Examples
```typescript
function MyClass() {}
function getValue() {}
function* getValue() {}
function *getValue() {}
```
