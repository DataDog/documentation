---
aliases:
- /continuous_integration/static_analysis/rules/typescript-code-style/function-naming
- /static_analysis/rules/typescript-code-style/function-naming
dependencies: []
disable_edit: true
group_id: typescript-code-style
meta:
  category: Code Style
  id: typescript-code-style/function-naming
  language: TypeScript
  severity: Notice
  severity_rank: 3
title: Function name should use camelCase or PascalCase
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


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
function __get_value() {}

```

## Compliant Code Examples
```typescript
function MyClass() {}
function getValue() {}
function* getValue() {}
function *getValue() {}
function _getValue() {}

```
