---
aliases:
- /continuous_integration/static_analysis/rules/csharp-best-practices/float-equality
- /static_analysis/rules/csharp-best-practices/float-equality
dependencies: []
disable_edit: true
group_id: csharp-best-practices
meta:
  category: Best Practices
  id: csharp-best-practices/float-equality
  language: C#
  language_alias: CSharp
  severity: Error
  severity_rank: 1
title: Prevents using `==` and `!=` operators on floats and doubles
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `csharp-best-practices/float-equality`

**Language:** C#

**Severity:** Error

**Category:** Best Practices

## Description
Floating point math is inherently imprecise, so checking strict equality to a `float` or `double` will very likely lead to unexpected bugs.

For example:
**Input**
```
var a = 0.1f;
var b = 0.2f;
var c = 0.3f;
Console.WriteLine($"{a + b == c}");
```
**Output**
```
False
```
(Note: exact results can vary depending on the compiler used)

## Non-Compliant Code Examples
```csharp
class NonCompliant
{
    public static void Main()
    {
        float foo = 1.2345f;

        if (foo == 1.2345f) { /* ... */ }

        if (4.567d == 4.567d) { /* ... */ }
        if (4.567f != 4.567f) { /* ... */ }

        bool isEqual = foo == 1.2345f;
    }
}
```

## Compliant Code Examples
```csharp
class Compliant
{
    public static void Main()
    {
        float foo = 1.2345f;
        var tolerance = 0.000000001f;
        if (Math.Abs(foo - 1.2345f) < tolerance) { /* ... */ }
    }
}
```
