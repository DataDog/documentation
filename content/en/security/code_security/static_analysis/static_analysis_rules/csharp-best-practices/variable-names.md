---
aliases:
- /continuous_integration/static_analysis/rules/csharp-best-practices/variable-names
- /static_analysis/rules/csharp-best-practices/variable-names
dependencies: []
disable_edit: true
group_id: csharp-best-practices
meta:
  category: Code Style
  id: csharp-best-practices/variable-names
  language: C#
  language_alias: CSharp
  severity: Warning
  severity_rank: 2
title: Avoid keywords as variables names
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `csharp-best-practices/variable-names`

**Language:** C#

**Severity:** Warning

**Category:** Code Style

## Description
Avoid using language keywords to declare variables. While being authorized by the compiler, it makes the code harder to understand.

## Non-Compliant Code Examples
```csharp
using System.Net;

class MyClass {
    public static void routine()
    {
        bool await = false;
        bool async = true;
    }
}

```
