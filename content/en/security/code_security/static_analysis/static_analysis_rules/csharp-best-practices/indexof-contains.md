---
aliases:
- /continuous_integration/static_analysis/rules/csharp-best-practices/indexof-contains
- /static_analysis/rules/csharp-best-practices/indexof-contains
dependencies: []
disable_edit: true
group_id: csharp-best-practices
meta:
  category: Best Practices
  id: csharp-best-practices/indexof-contains
  language: C#
  language_alias: CSharp
  severity: Info
  severity_rank: 4
title: Use Contains to check if a string contains something
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `csharp-best-practices/indexof-contains`

**Language:** C#

**Severity:** Info

**Category:** Best Practices

## Description
To check is a string contains a sub-string, use `Contains()` and do not use proxy functions such as `IndexOf`.

## Non-Compliant Code Examples
```csharp
class MyClass {
    public static void processString(string s)
    {
        if(strings.IndexOf(s) == -1) {
            // do something
        }

        if(strings.IndexOf(s) < 0) {
            // do something else
        }

        if(strings.IndexOf(s) >= 0) {
            // or do this
        }
    }
}

```

## Compliant Code Examples
```csharp
class MyClass {
    public static void processString(string s)
    {
        if(!strings.Contains(s)) {
            // do something
        }
    }
}

```
