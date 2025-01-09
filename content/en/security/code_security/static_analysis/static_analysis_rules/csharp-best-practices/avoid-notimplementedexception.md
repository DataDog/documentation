---
aliases:
- /continuous_integration/static_analysis/rules/csharp-best-practices/avoid-notimplementedexception
- /static_analysis/rules/csharp-best-practices/avoid-notimplementedexception
dependencies: []
disable_edit: true
group_id: csharp-best-practices
meta:
  category: Best Practices
  id: csharp-best-practices/avoid-notimplementedexception
  language: C#
  language_alias: CSharp
  severity: Warning
  severity_rank: 2
title: Avoid NotImplementedException
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `csharp-best-practices/avoid-notimplementedexception`

**Language:** C#

**Severity:** Warning

**Category:** Best Practices

## Description
The exception `NotImplementedException` is used for future features. While not a bug, it should be tracked so that features are fully implemented.

## Non-Compliant Code Examples
```csharp
class MyClass {
    public static void routine()
    {
        throw new NotImplementedException();
    }
}

```
