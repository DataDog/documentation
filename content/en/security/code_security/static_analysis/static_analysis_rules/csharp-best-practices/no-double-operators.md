---
aliases:
- /continuous_integration/static_analysis/rules/csharp-best-practices/no-double-operators
- /static_analysis/rules/csharp-best-practices/no-double-operators
dependencies: []
disable_edit: true
group_id: csharp-best-practices
meta:
  category: Best Practices
  id: csharp-best-practices/no-double-operators
  language: C#
  language_alias: CSharp
  severity: Info
  severity_rank: 4
title: Do not use the same operator twice
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `csharp-best-practices/no-double-operators`

**Language:** C#

**Severity:** Info

**Category:** Best Practices

## Description
Do not use the same operator twice; it will cancel the first operator and have no effect.

## Non-Compliant Code Examples
```csharp
class MyClass {
    public void myMethod()
    {
        int myInt = 1;
        var myValue1 = !!myInt;
        var myValue2 = ~~myInt;
    }
}

```

## Compliant Code Examples
```csharp
class MyClass {
    public void myMethod()
    {
        int myInt = 1;
        var myValue1 = myInt;
        var myValue2 = myInt;
    }
}

```
