---
aliases:
- /continuous_integration/static_analysis/rules/csharp-best-practices/do-not-initialize-threadstatic
- /static_analysis/rules/csharp-best-practices/do-not-initialize-threadstatic
dependencies: []
disable_edit: true
group_id: csharp-best-practices
meta:
  category: Best Practices
  id: csharp-best-practices/do-not-initialize-threadstatic
  language: C#
  language_alias: CSharp
  severity: Error
  severity_rank: 1
title: Ensures that a ThreadStatic field is not initialized
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `csharp-best-practices/do-not-initialize-threadstatic`

**Language:** C#

**Severity:** Error

**Category:** Best Practices

## Description
When a field has the [ThreadStatic attribute](https://learn.microsoft.com/en-us/dotnet/api/system.threadstaticattribute), it is unique for each thread. In order to have the expected value, the field should either be evaluated lazily, or set to the default.

## Non-Compliant Code Examples
```csharp
class NonCompliant {
    [ThreadStatic]
    public static string Foo = "foo";
}

```

## Compliant Code Examples
```csharp
class Compliant {
    [ThreadStatic]
    private static string _foo;
    
    public static string Foo {
        get {
            if (_foo == null) {
                _foo = "foo"
            }
            return _foo;
        }
    }
}

```
