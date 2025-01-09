---
aliases:
- /continuous_integration/static_analysis/rules/csharp-best-practices/sealed-class-protected-members
- /static_analysis/rules/csharp-best-practices/sealed-class-protected-members
dependencies: []
disable_edit: true
group_id: csharp-best-practices
meta:
  category: Best Practices
  id: csharp-best-practices/sealed-class-protected-members
  language: C#
  language_alias: CSharp
  severity: Info
  severity_rank: 4
title: Avoid protected members in sealed class
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `csharp-best-practices/sealed-class-protected-members`

**Language:** C#

**Severity:** Info

**Category:** Best Practices

## Description
While authorized by the compiler, `protected` visibility in `sealed` classes does not make sense as these classes cannot be inherited. Use `public` or `private` instead.

## Non-Compliant Code Examples
```csharp
public sealed class MyClass {
    protected int foo;

    protected void myMethod() {
        
    }
}

```

## Compliant Code Examples
```csharp
public sealed class MyClass {
    private int foo;

    private void myMethod() {
        
    }
}

```
