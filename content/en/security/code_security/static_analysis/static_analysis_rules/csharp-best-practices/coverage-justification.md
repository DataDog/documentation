---
aliases:
- /continuous_integration/static_analysis/rules/csharp-best-practices/coverage-justification
- /static_analysis/rules/csharp-best-practices/coverage-justification
dependencies: []
disable_edit: true
group_id: csharp-best-practices
meta:
  category: Best Practices
  id: csharp-best-practices/coverage-justification
  language: C#
  language_alias: CSharp
  severity: Warning
  severity_rank: 2
title: Ensure code coverage exclusions are justified
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `csharp-best-practices/coverage-justification`

**Language:** C#

**Severity:** Warning

**Category:** Best Practices

## Description
When using `ExcludeFromCodeCoverage`, always provide a reason for the exclusion. This helps with code maintenance and is part of the documentation that helps other engineers understand why the code is excluded from coverage.

## Non-Compliant Code Examples
```csharp
class MyClass {
    [ExcludeFromCodeCoverage]
    public void MyMethod()
    {
    }
}

```

## Compliant Code Examples
```csharp
class MyClass {
    [ExcludeFromCodeCoverage(Justification = "Code used by some flaky test that will be removed soon")]
    public void MyMethod()
    {
    }
}

```
