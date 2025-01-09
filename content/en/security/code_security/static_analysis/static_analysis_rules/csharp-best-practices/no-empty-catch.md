---
aliases:
- /continuous_integration/static_analysis/rules/csharp-best-practices/no-empty-catch
- /static_analysis/rules/csharp-best-practices/no-empty-catch
dependencies: []
disable_edit: true
group_id: csharp-best-practices
meta:
  category: Best Practices
  id: csharp-best-practices/no-empty-catch
  language: C#
  language_alias: CSharp
  severity: Warning
  severity_rank: 2
title: Avoid empty catch sections
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `csharp-best-practices/no-empty-catch`

**Language:** C#

**Severity:** Warning

**Category:** Best Practices

## Description
Exceptions must be appropriately handled and have code to recover from the exceptions. If no recovery is added, the code should at least log the error.

## Non-Compliant Code Examples
```csharp
class MyClass {
    public static void routine()
    {
        try {
            doSomething();
        } catch (MyException ex) {
            
        }
    }
}

```

```csharp
class MyClass {
    public static void routine()
    {
        try {
            doSomething();
        } catch (MyException ex) {
            // comment
        }
    }
}

```

## Compliant Code Examples
```csharp
class MyClass {
    public static void routine()
    {
        try {
            doSomething();
        } catch (MyException ex) {
            handleException();
        }
    }
}

```
