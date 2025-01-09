---
aliases:
- /continuous_integration/static_analysis/rules/typescript-best-practices/boolean-prop-naming
- /static_analysis/rules/typescript-best-practices/boolean-prop-naming
dependencies: []
disable_edit: true
group_id: typescript-best-practices
meta:
  category: Code Style
  id: typescript-best-practices/boolean-prop-naming
  language: TypeScript
  severity: Notice
  severity_rank: 3
title: Consistent naming for boolean props
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `typescript-best-practices/boolean-prop-naming`

**Language:** TypeScript

**Severity:** Notice

**Category:** Code Style

## Description
Enforces a consistent naming pattern for boolean props.

The pattern is: `"^(is|has)[A-Z]([A-Za-z0-9]?)+"` to enforce `is` and `has` prefixes.

## Non-Compliant Code Examples
```typescript
type Props = {
  enabled: boolean
}

```

## Compliant Code Examples
```typescript
type Props = {
  isEnabled: boolean;
  hasFoo: boolean;
}

```
