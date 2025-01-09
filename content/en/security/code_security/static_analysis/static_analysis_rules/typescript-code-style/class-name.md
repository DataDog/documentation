---
aliases:
- /continuous_integration/static_analysis/rules/typescript-code-style/class-name
- /static_analysis/rules/typescript-code-style/class-name
dependencies: []
disable_edit: true
group_id: typescript-code-style
meta:
  category: Code Style
  id: typescript-code-style/class-name
  language: TypeScript
  severity: Warning
  severity_rank: 2
title: Class name should be `PascalCase`
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


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

class LongNameThatHa55SomeNumbers999 {}
```
