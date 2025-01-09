---
aliases:
- /continuous_integration/static_analysis/rules/csharp-best-practices/no-exception-special-methods
- /static_analysis/rules/csharp-best-practices/no-exception-special-methods
dependencies: []
disable_edit: true
group_id: csharp-best-practices
meta:
  category: Error Prone
  id: csharp-best-practices/no-exception-special-methods
  language: C#
  language_alias: CSharp
  severity: Warning
  severity_rank: 2
title: Do not throw exceptions in special methods
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `csharp-best-practices/no-exception-special-methods`

**Language:** C#

**Severity:** Warning

**Category:** Error Prone

## Description
Do not throw exceptions in special methods such as `ToString()`, `Dispose()` or `GetHashCode`.

## Non-Compliant Code Examples
```csharp
class MyClass {
    public override string GetHashCode()
    {
        if (something)
        {
            throw new Exception();
        }
        throw new Exception();
    }
}

```

```csharp
class MyClass {
    public override string ToString()
    {
        if (something)
        {
            throw new Exception();
        }
        throw new Exception();
    }
}

```
