---
aliases:
- /continuous_integration/static_analysis/rules/csharp-best-practices/redundant-modifiers
- /static_analysis/rules/csharp-best-practices/redundant-modifiers
dependencies: []
disable_edit: true
group_id: csharp-best-practices
meta:
  category: Best Practices
  id: csharp-best-practices/redundant-modifiers
  language: C#
  language_alias: CSharp
  severity: Notice
  severity_rank: 3
title: Avoid redundant modifiers
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `csharp-best-practices/redundant-modifiers`

**Language:** C#

**Severity:** Notice

**Category:** Best Practices

## Description
When `sealed` is used in the class definition, methods and attributes do not need to define or use the `sealed` modifier.

## Non-Compliant Code Examples
```csharp
public sealed class MyClass {

    public sealed void myMethod() {
        
    }
    sealed void myMethod() {
        
    }
}

```

## Compliant Code Examples
```csharp
class MyClass {
    public sealed myMethod()
    {
        if (foo) {
            throw new MyException();
        }
        
    }
}

```
