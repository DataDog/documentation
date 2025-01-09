---
aliases:
- /continuous_integration/static_analysis/rules/csharp-best-practices/use-specific-exceptions
- /static_analysis/rules/csharp-best-practices/use-specific-exceptions
dependencies: []
disable_edit: true
group_id: csharp-best-practices
meta:
  category: Best Practices
  id: csharp-best-practices/use-specific-exceptions
  language: C#
  language_alias: CSharp
  severity: Warning
  severity_rank: 2
title: Do not throw generic exceptions
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `csharp-best-practices/use-specific-exceptions`

**Language:** C#

**Severity:** Warning

**Category:** Best Practices

## Description
Exceptions should be specific to the application to help points the exact issue. For these reasons, generic exceptions should not be used and we should instead favor specific exception types.

## Non-Compliant Code Examples
```csharp
class MyClass {
    public static void processString(string s)
    {
        throw new Exception("foo");
        throw new ApplicationException("oh no something got wrong");
    }
}

```

## Compliant Code Examples
```csharp
class MyClass {
    public static void processString(string s)
    {
        throw new MyCustomException("oh no!");
    }
}

```
