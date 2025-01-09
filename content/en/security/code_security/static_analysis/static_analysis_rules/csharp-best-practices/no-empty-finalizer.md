---
aliases:
- /continuous_integration/static_analysis/rules/csharp-best-practices/no-empty-finalizer
- /static_analysis/rules/csharp-best-practices/no-empty-finalizer
dependencies: []
disable_edit: true
group_id: csharp-best-practices
meta:
  category: Best Practices
  id: csharp-best-practices/no-empty-finalizer
  language: C#
  language_alias: CSharp
  severity: Info
  severity_rank: 4
title: Avoid empty finalizer
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `csharp-best-practices/no-empty-finalizer`

**Language:** C#

**Severity:** Info

**Category:** Best Practices

## Description
Destructor should not be empty.

## Non-Compliant Code Examples
```csharp
public class MyClass {
    ~MyClass() {
        
    }
}

```

## Compliant Code Examples
```csharp
public class MyClass {
    ~MyClass() {
        doSomething();
    }
}

```
