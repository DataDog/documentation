---
aliases:
- /continuous_integration/static_analysis/rules/csharp-best-practices/indexof-checks
- /static_analysis/rules/csharp-best-practices/indexof-checks
dependencies: []
disable_edit: true
group_id: csharp-best-practices
meta:
  category: Error Prone
  id: csharp-best-practices/indexof-checks
  language: C#
  language_alias: CSharp
  severity: Warning
  severity_rank: 2
title: IndexOf function should check the first character
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `csharp-best-practices/indexof-checks`

**Language:** C#

**Severity:** Warning

**Category:** Error Prone

## Description
When using `Indexof` or `LastIndexOf`, using `> 0` may miss the first item of the collection (string, list, etc). Instead, the code should use `>=0` to take the first element into account.

## Non-Compliant Code Examples
```csharp
using System.Net;

class MyClass {
    public static void routine(string str, string str2)
    {
        str.IndexOf(str2)>0;
        str.IndexOf(str2)>0;
        str.LastIndexOf(str2)>0;
    }
}

```

## Compliant Code Examples
```csharp
using System.Net;

class MyClass {
    public static void routine(string str, string str2)
    {
        str.IndexOf(str2)>=0;
        str.IndexOf(str2)>=0;
        str.LastIndexOf(str2)>=0;
        if (serverPackages.Any(x => x.Version.CompareTo(currentVersion) > 0)) {
            
        }
    }
}

```
