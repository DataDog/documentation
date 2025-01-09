---
aliases:
- /continuous_integration/static_analysis/rules/csharp-best-practices/ignored-threadstatic
- /static_analysis/rules/csharp-best-practices/ignored-threadstatic
dependencies: []
disable_edit: true
group_id: csharp-best-practices
meta:
  category: Best Practices
  id: csharp-best-practices/ignored-threadstatic
  language: C#
  language_alias: CSharp
  severity: Error
  severity_rank: 1
title: Ensures ThreadStatic fields are marked static
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `csharp-best-practices/ignored-threadstatic`

**Language:** C#

**Severity:** Error

**Category:** Best Practices

## Description
If a non-static field is marked [ThreadStatic](https://learn.microsoft.com/en-us/dotnet/api/system.threadstaticattribute), the ThreadStatic attribute will be ignored. In this case, this rule suggests changing the field to be `static`.

## Non-Compliant Code Examples
```csharp
class NonCompliant {
    [ThreadStatic] public int foo;
    [ThreadStatic] int foo;
}

```

## Compliant Code Examples
```csharp
class Compliant {
    [ThreadStatic] static int foo;
    [ThreadStatic] public static int foo;

    int foo = 1;

    ThreadLocal<int> foo = new ThreadLocal<int> (() => 1);
    
    ThreadLocal<int> foo;
}

```
