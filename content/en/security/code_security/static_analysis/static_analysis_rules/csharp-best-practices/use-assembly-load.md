---
aliases:
- /continuous_integration/static_analysis/rules/csharp-best-practices/use-assembly-load
- /static_analysis/rules/csharp-best-practices/use-assembly-load
dependencies: []
disable_edit: true
group_id: csharp-best-practices
meta:
  category: Error Prone
  id: csharp-best-practices/use-assembly-load
  language: C#
  language_alias: CSharp
  severity: Notice
  severity_rank: 3
title: Use Assembly.Load
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `csharp-best-practices/use-assembly-load`

**Language:** C#

**Severity:** Notice

**Category:** Error Prone

## Description
This rule is intended to catch when `Assembly.LoadFrom`, `Assembly.LoadFile`, or `Assembly.LoadWithPartialName`  are used. DataDog recommends using `Assembly.Load` which will include the full specification of the DLL that needs to be loaded. The other methods might end up with another one that could lead to unexpected behavior.

## Non-Compliant Code Examples
```csharp
static void Main(string[] args)
{
    Assembly.LoadFrom("");
    Assembly.LoadFile("");
    Assembly.LoadWithPartialName("");
}
```

## Compliant Code Examples
```csharp
static void Main(string[] args)
{
    Assembly.Load("");
}
```
