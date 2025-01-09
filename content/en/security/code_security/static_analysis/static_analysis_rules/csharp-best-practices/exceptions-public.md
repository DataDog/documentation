---
aliases:
- /continuous_integration/static_analysis/rules/csharp-best-practices/exceptions-public
- /static_analysis/rules/csharp-best-practices/exceptions-public
dependencies: []
disable_edit: true
group_id: csharp-best-practices
meta:
  category: Best Practices
  id: csharp-best-practices/exceptions-public
  language: C#
  language_alias: CSharp
  severity: Warning
  severity_rank: 2
title: Exceptions should be made public
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `csharp-best-practices/exceptions-public`

**Language:** C#

**Severity:** Warning

**Category:** Best Practices

## Description
Exceptions should not be made `internal` and should be made `public`. Exceptions are designed to be reused across the codebase or in multiple codebases. By making an exception `internal`, it then cannot be reused across the different codebases.

## Non-Compliant Code Examples
```csharp
internal class MyCustomException: Exception {
    
}
```

## Compliant Code Examples
```csharp
public class MyCustomException: Exception {
    
}
```
