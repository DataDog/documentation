---
aliases:
- /continuous_integration/static_analysis/rules/csharp-best-practices/avoid-non-existing-operators
- /static_analysis/rules/csharp-best-practices/avoid-non-existing-operators
dependencies: []
disable_edit: true
group_id: csharp-best-practices
meta:
  category: Error Prone
  id: csharp-best-practices/avoid-non-existing-operators
  language: C#
  language_alias: CSharp
  severity: Warning
  severity_rank: 2
title: Do not use operators that do not exists
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `csharp-best-practices/avoid-non-existing-operators`

**Language:** C#

**Severity:** Warning

**Category:** Error Prone

## Description
Operator `+=` and `-=` do not exist and will lead to inconsistent or undefined behavior.

## Non-Compliant Code Examples
```csharp
class MyClass {
    public void myMethod()
    {
        int myInt1 = 1;
        int myInt2 = 1;
        myInt2 =+ myInt1;
        myInt2 =- myInt1;

    }
}

```

## Compliant Code Examples
```csharp
class MyClass {
    public void myMethod()
    {
        int myInt1 = 1;
        int myInt2 = 1;
        myInt2 += myInt1;
        myInt2 -= myInt1;

    }
}

```
