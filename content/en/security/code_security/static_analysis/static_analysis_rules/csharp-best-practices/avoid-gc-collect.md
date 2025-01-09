---
aliases:
- /continuous_integration/static_analysis/rules/csharp-best-practices/avoid-gc-collect
- /static_analysis/rules/csharp-best-practices/avoid-gc-collect
dependencies: []
disable_edit: true
group_id: csharp-best-practices
meta:
  category: Best Practices
  id: csharp-best-practices/avoid-gc-collect
  language: C#
  language_alias: CSharp
  severity: Warning
  severity_rank: 2
title: Avoid using GC.Collect
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `csharp-best-practices/avoid-gc-collect`

**Language:** C#

**Severity:** Warning

**Category:** Best Practices

## Description
The `GC.Collect` method forces a garbage collector to run to free their memory. Using this method is usually not necessary and can impact your applications performance greatly as it may need to block all threads while it examines every object in memory to potential cleanup. 

## Non-Compliant Code Examples
```csharp
static void Main(string[] args)
{
  GC.Collect();
  GC.Collect(42, GCCollectionMode.Optimized);
}

```
