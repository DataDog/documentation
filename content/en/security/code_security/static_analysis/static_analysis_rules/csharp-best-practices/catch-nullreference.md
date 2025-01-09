---
aliases:
- /continuous_integration/static_analysis/rules/csharp-best-practices/catch-nullreference
- /static_analysis/rules/csharp-best-practices/catch-nullreference
dependencies: []
disable_edit: true
group_id: csharp-best-practices
meta:
  category: Best Practices
  id: csharp-best-practices/catch-nullreference
  language: C#
  language_alias: CSharp
  severity: Warning
  severity_rank: 2
title: Prevent catching NullReference
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `csharp-best-practices/catch-nullreference`

**Language:** C#

**Severity:** Warning

**Category:** Best Practices

## Description
Do not catch `NullReferenceException`. Instead, check directly if the value is `null` in your code.

## Non-Compliant Code Examples
```csharp
class MyClass {
    void myMethod()
    {
        try {

        }
        catch (NullReferenceException e) {

        }
        
    }
}

```
