---
aliases:
- /continuous_integration/static_analysis/rules/csharp-best-practices/no-nested-ternary
- /static_analysis/rules/csharp-best-practices/no-nested-ternary
dependencies: []
disable_edit: true
group_id: csharp-best-practices
meta:
  category: Code Style
  id: csharp-best-practices/no-nested-ternary
  language: C#
  language_alias: CSharp
  severity: Notice
  severity_rank: 3
title: Avoid nested operators
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `csharp-best-practices/no-nested-ternary`

**Language:** C#

**Severity:** Notice

**Category:** Code Style

## Description
Do not use nested ternary operators, as it makes the code harder to understand and maintain.

## Non-Compliant Code Examples
```csharp
class MyClass {
    public static void routine(bool a, bool b, bool c)
    {
        var foo = a ? b ? "b": "a" : "c";
    }
}

```

```csharp
class MyClass {
    public static void routine(bool a, bool b, bool c)
    {
        var foo = a ? "a" : b ? "b" : "c";
    }
}

```

## Compliant Code Examples
```csharp
class MyClass {
    public static void routine(bool a, bool b, bool c)
    {
        if (a) {
            if (b) {
                return "ab";
            }
            if(c) {
                return "ac";
            }
        } else {
            if (b) {
                return "b";
            }
            if (c) {
                return "c";
            }
        }
    }
}

```
