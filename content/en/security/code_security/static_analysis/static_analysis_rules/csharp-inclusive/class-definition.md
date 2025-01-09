---
aliases:
- /continuous_integration/static_analysis/rules/csharp-inclusive/class-definition
- /static_analysis/rules/csharp-inclusive/class-definition
dependencies: []
disable_edit: true
group_id: csharp-inclusive
meta:
  category: Best Practices
  id: csharp-inclusive/class-definition
  language: C#
  language_alias: CSharp
  severity: Notice
  severity_rank: 3
title: Check class definition language
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `csharp-inclusive/class-definition`

**Language:** C#

**Severity:** Notice

**Category:** Best Practices

## Description
Avoid using words such as `blacklist`, `whitelist`, `slave` or `master` in class names. Consider using more inclusive wording in your code.

## Non-Compliant Code Examples
```csharp
class Whitelist {

}
```

## Compliant Code Examples
```csharp
class AllowList {

}
```
