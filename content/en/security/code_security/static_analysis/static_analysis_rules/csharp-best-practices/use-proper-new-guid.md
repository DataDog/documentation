---
aliases:
- /continuous_integration/static_analysis/rules/csharp-best-practices/use-proper-new-guid
- /static_analysis/rules/csharp-best-practices/use-proper-new-guid
dependencies: []
disable_edit: true
group_id: csharp-best-practices
meta:
  category: Best Practices
  id: csharp-best-practices/use-proper-new-guid
  language: C#
  language_alias: CSharp
  severity: Notice
  severity_rank: 3
title: Enforce Guid parameter initialization
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `csharp-best-practices/use-proper-new-guid`

**Language:** C#

**Severity:** Notice

**Category:** Best Practices

## Description
This rule will warn you that you have instantiated the `Guid` struct without a parameter.

For an empty `Guid`, using `Guid.Empty` is cleaner.

For a randomly-generated `Guid`, use `Guid.NewGuid()` instead.

## Non-Compliant Code Examples
```csharp
public void Foo()
{
    var foo1 = new Guid();
    Guid foo2 = new Guid();
    Guid foo3 = new();
    var foo4 = default(Guid);
    Guid foo5 = default(Guid);
    Guid foo6 = default;
}
```

## Compliant Code Examples
```csharp
public void Foo(byte[] bytes)
{
    var g1 = Guid.Empty;
    var g2 = Guid.NewGuid();
    var g3 = new Guid(bytes);
}
```
