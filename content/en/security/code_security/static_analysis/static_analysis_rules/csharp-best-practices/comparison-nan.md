---
aliases:
- /continuous_integration/static_analysis/rules/csharp-best-practices/comparison-nan
- /static_analysis/rules/csharp-best-practices/comparison-nan
dependencies: []
disable_edit: true
group_id: csharp-best-practices
meta:
  category: Best Practices
  id: csharp-best-practices/comparison-nan
  language: C#
  language_alias: CSharp
  severity: Info
  severity_rank: 4
title: Do not compare with NaN
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `csharp-best-practices/comparison-nan`

**Language:** C#

**Severity:** Info

**Category:** Best Practices

## Description
Using a comparison with `float.NaN` or `double.NaN` also returns false. If you want to check the validity of a number, use `float.isNaN` or `double.isNaN`.

## Non-Compliant Code Examples
```csharp
class MyClass {
    public void myMethod(float v, double d)
    {
        if (float.NaN == v) {

        }

        if(double.NaN == d) {
            
        }
    }
}

```

```csharp
class MyClass {
    public void myMethod(float v, double d)
    {
        if (v == float.NaN) {

        }

        if(d == double.NaN) {
            
        }
    }
}

```

## Compliant Code Examples
```csharp
class MyClass {
    public void myMethod(float v, double d)
    {
        if (float.isNan(f)) {

        }

        if(double.isNan(f)) {
            
        }
    }
}

```
