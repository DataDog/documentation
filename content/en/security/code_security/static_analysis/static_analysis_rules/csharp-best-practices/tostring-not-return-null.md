---
aliases:
- /continuous_integration/static_analysis/rules/csharp-best-practices/tostring-not-return-null
- /static_analysis/rules/csharp-best-practices/tostring-not-return-null
dependencies: []
disable_edit: true
group_id: csharp-best-practices
meta:
  category: Error Prone
  id: csharp-best-practices/tostring-not-return-null
  language: C#
  language_alias: CSharp
  severity: Warning
  severity_rank: 2
title: ToString() should never return `null`
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `csharp-best-practices/tostring-not-return-null`

**Language:** C#

**Severity:** Warning

**Category:** Error Prone

## Description
The method `ToString()` should always return a value (for example, a string) and never return `null`. Instead of returning `null`, return `string.Empty`, which is an empty string.

## Non-Compliant Code Examples
```csharp
class MyClass {
    public override string ToString()
    {
        if(foo) {
            return null;
        }
        return null;
        
    }
}

```

```csharp
class MyClass {
    public override string ToString()
    {
        return null;
    }
}

```

## Compliant Code Examples
```csharp
class MyClass {
    public override string ToString()
    {
        return string.Empty;;    
    }
}

```
