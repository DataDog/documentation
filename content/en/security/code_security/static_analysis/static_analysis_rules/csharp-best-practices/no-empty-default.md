---
aliases:
- /continuous_integration/static_analysis/rules/csharp-best-practices/no-empty-default
- /static_analysis/rules/csharp-best-practices/no-empty-default
dependencies: []
disable_edit: true
group_id: csharp-best-practices
meta:
  category: Best Practices
  id: csharp-best-practices/no-empty-default
  language: C#
  language_alias: CSharp
  severity: Info
  severity_rank: 4
title: Prevent empty default cases
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `csharp-best-practices/no-empty-default`

**Language:** C#

**Severity:** Info

**Category:** Best Practices

## Description
The default section of a switch should not be empty. If there is an error to raise, throw an exception, print a lock, and emit a metric.

## Non-Compliant Code Examples
```csharp
class MyClass {
    public static bool filter(int target)
    {
        switch(target) {
            case 1:
                doSomething();
                break;
            default:
                break;
        }
    }
}

```

## Compliant Code Examples
```csharp
class MyClass {
    public static bool filter(int target)
    {
        switch(target) {
            case 1:
                doSomething();
                break;
            default:
                doSomethingElse();
                break;
        }
    }
}

```
