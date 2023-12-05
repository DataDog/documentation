---
dependencies: []
disable_edit: true
kind: documentation
meta:
  category: Code Style
  id: typescript-code-style/class-name
  language: TypeScript
  severity: Warning
title: Class name should be PascalCase
---
## Metadata
**ID:** `typescript-code-style/class-name`

**Language:** TypeScript

**Severity:** Warning

**Category:** Code Style

## Description
Class names should be `PascalCase` and not `camelCase` or `snake_case`.

## Non-Compliant Code Examples
```typescript
class _runtimeMetricsStatus {}
class runtimeMetricsStatus {}
```

## Compliant Code Examples
```typescript
class MyClass {}
```
