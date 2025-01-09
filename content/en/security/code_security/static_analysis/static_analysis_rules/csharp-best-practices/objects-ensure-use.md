---
aliases:
- /continuous_integration/static_analysis/rules/csharp-best-practices/objects-ensure-use
- /static_analysis/rules/csharp-best-practices/objects-ensure-use
dependencies: []
disable_edit: true
group_id: csharp-best-practices
meta:
  category: Best Practices
  id: csharp-best-practices/objects-ensure-use
  language: C#
  language_alias: CSharp
  severity: Info
  severity_rank: 4
title: Ensure objects are used
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `csharp-best-practices/objects-ensure-use`

**Language:** C#

**Severity:** Info

**Category:** Best Practices

## Description
Creating an object and then not using it can lead to unexpected behavior if the constructor contains side effects.

If the code intentionally creates and drops an object to trigger the constructor side effects, consider moving them to a separate function and call it directly.

## Non-Compliant Code Examples
```csharp
class MyClass {
    public void myMethod()
    {
        new MyClass();
    }
}

```

## Compliant Code Examples
```csharp
class MyClass {
    public void myMethod()
    {
        var obj = new MyClass();
    }
}

```
