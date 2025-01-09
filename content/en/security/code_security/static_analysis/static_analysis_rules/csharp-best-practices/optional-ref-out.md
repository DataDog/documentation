---
aliases:
- /continuous_integration/static_analysis/rules/csharp-best-practices/optional-ref-out
- /static_analysis/rules/csharp-best-practices/optional-ref-out
dependencies: []
disable_edit: true
group_id: csharp-best-practices
meta:
  category: Best Practices
  id: csharp-best-practices/optional-ref-out
  language: C#
  language_alias: CSharp
  severity: Info
  severity_rank: 4
title: Do not use Optional on ref or out. parameters
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `csharp-best-practices/optional-ref-out`

**Language:** C#

**Severity:** Info

**Category:** Best Practices

## Description
The modifier `Optional` should not be used on `ref` or `out` parameters because it's semantically incorrect:

 - an `out` parameter is used as a value to return from the function and, therefore, is not optional
 - a `ref` parameter is passed back to the caller

## Non-Compliant Code Examples
```csharp
class MyClass {

    public static void routine([Optional] out i)
    {
    }
}

```

```csharp
class MyClass {
    public static void routine([Optional] ref int i)
    {
    }

}

```
