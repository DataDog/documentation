---
aliases:
- /continuous_integration/static_analysis/rules/typescript-code-style/method-name
- /static_analysis/rules/typescript-code-style/method-name
dependencies: []
disable_edit: true
group_id: typescript-code-style
meta:
  category: Code Style
  id: typescript-code-style/method-name
  language: TypeScript
  severity: Notice
  severity_rank: 3
title: Method name should use camelCase
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


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
class A { _SetValue() {} }
class A { __Set_Value() {} }
```

## Compliant Code Examples
```typescript
const a = { getValue() {} }
class A { setValue() {} }
class A { #fooBla() {} }
class A { _setValue() {} }
class A { __setValue() {} }
class A { set2() {} }
```
