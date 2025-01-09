---
aliases:
- /continuous_integration/static_analysis/rules/csharp-best-practices/avoid-call-gc-suppress-finalize
- /static_analysis/rules/csharp-best-practices/avoid-call-gc-suppress-finalize
dependencies: []
disable_edit: true
group_id: csharp-best-practices
meta:
  category: Best Practices
  id: csharp-best-practices/avoid-call-gc-suppress-finalize
  language: C#
  language_alias: CSharp
  severity: Warning
  severity_rank: 2
title: Avoid calling GC.SuppressFinalize()
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `csharp-best-practices/avoid-call-gc-suppress-finalize`

**Language:** C#

**Severity:** Warning

**Category:** Best Practices

## Description
As per [C# documentation](https://learn.microsoft.com/en-us/dotnet/standard/garbage-collection/implementing-dispose), the `GC.SuppressFinalize()` method should only be called inside the `Dispose()` method.

#### Learn More

 - [Documentation on the dispose pattern](https://learn.microsoft.com/en-us/dotnet/standard/garbage-collection/implementing-dispose#implement-the-dispose-pattern)

## Non-Compliant Code Examples
```csharp
class MyClass {
    public static void myMethod()
    {
        GC.SuppressFinalize(this);
    }
}

```

## Compliant Code Examples
```csharp
class MyClass {
    public void Dispose()
    {
        Dispose(true);
        GC.SuppressFinalize(this);
    }
}

```
