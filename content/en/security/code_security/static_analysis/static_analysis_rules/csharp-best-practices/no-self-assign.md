---
aliases:
- /continuous_integration/static_analysis/rules/csharp-best-practices/no-self-assign
- /static_analysis/rules/csharp-best-practices/no-self-assign
dependencies: []
disable_edit: true
group_id: csharp-best-practices
meta:
  category: Error Prone
  id: csharp-best-practices/no-self-assign
  language: C#
  language_alias: CSharp
  severity: Notice
  severity_rank: 3
title: Do not assign a variable to itself
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `csharp-best-practices/no-self-assign`

**Language:** C#

**Severity:** Notice

**Category:** Error Prone

## Description
Do not assign a value to itself, it has no effect.

## Non-Compliant Code Examples
```csharp
class MyClass {
    public void myMethod()
    {
        var myValue1 = 2;
        myValue1 = myValue1;
    }
}

```

## Compliant Code Examples
```csharp
class MyClass {
    public void myMethod()
    {
        var myValue1 = 2;
        var myValue2 = 3;
        myValue1 = myValue2;
        myMethod2(myValue1, { myValue2 = myValue2 });
    }
}
```
