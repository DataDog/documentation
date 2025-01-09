---
aliases:
- /continuous_integration/static_analysis/rules/csharp-best-practices/disposable-interface
- /static_analysis/rules/csharp-best-practices/disposable-interface
dependencies: []
disable_edit: true
group_id: csharp-best-practices
meta:
  category: Best Practices
  id: csharp-best-practices/disposable-interface
  language: C#
  language_alias: CSharp
  severity: Info
  severity_rank: 4
title: Classes with Dispose() should implement IDisposable
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `csharp-best-practices/disposable-interface`

**Language:** C#

**Severity:** Info

**Category:** Best Practices

## Description
`IDisposable` provides an interface for the cleanup of unmanaged resources through the function `void Dispose()`.

To avoid confusion, this rule ensures that any class that exposes a `public void Dispose()` function must implement `IDisposable`.

#### Learn More

 - [IDisposable documentation](https://learn.microsoft.com/en-us/dotnet/api/system.idisposable?view=net-8.0)

## Non-Compliant Code Examples
```csharp
class MyClass {
    public void Dispose()
    {
        // contents of method
    }
}
```

## Compliant Code Examples
```csharp
class MyClass: IFoobar, IDisposable {
    public void Dispose()
    {
        // contents of method
    }
}
```

```csharp
class MyClass: IDisposable {
    public void Dispose()
    {
        // contents of method
    }
}
```
