---
aliases:
- /continuous_integration/static_analysis/rules/csharp-best-practices/contains-not-any
- /static_analysis/rules/csharp-best-practices/contains-not-any
dependencies: []
disable_edit: true
group_id: csharp-best-practices
meta:
  category: Best Practices
  id: csharp-best-practices/contains-not-any
  language: C#
  language_alias: CSharp
  severity: Warning
  severity_rank: 2
title: Use Contains for simple equality
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `csharp-best-practices/contains-not-any`

**Language:** C#

**Severity:** Warning

**Category:** Best Practices

## Description
When using only a simple comparison, use `Contains` instead of `Any` as it is more efficient in terms of resources allocation.

## Non-Compliant Code Examples
```csharp
using System.Xml;

class MyClass {
    public static bool filter(IEnumerable<int> values, int target)
    {
        return values.Any(x => x > target);
        return values.Any(x => x == target);
    }
}

```

## Compliant Code Examples
```csharp
using System.Xml;

class MyClass {
    public static bool filter(IEnumerable<int> values, int target)
    {
        if (values.Any(c => c == Enum.Member)) {
            return values.Contains(target);
        }
    }
}
```
