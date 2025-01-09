---
aliases:
- /continuous_integration/static_analysis/rules/csharp-best-practices/strings-with-one-char
- /static_analysis/rules/csharp-best-practices/strings-with-one-char
dependencies: []
disable_edit: true
group_id: csharp-best-practices
meta:
  category: Performance
  id: csharp-best-practices/strings-with-one-char
  language: C#
  language_alias: CSharp
  severity: Warning
  severity_rank: 2
title: Avoid StartsWith or EndsWith with one character
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `csharp-best-practices/strings-with-one-char`

**Language:** C#

**Severity:** Warning

**Category:** Performance

## Description
This rule is designed to ensure that you use the most efficient methods for string comparison in C#. When using the `StartsWith` or `EndsWith` methods with a single character, the performance can be significantly reduced compared to using the indexer with the first or last index. This is because these methods are designed to work with substrings, not single characters, and therefore involve unnecessary overhead when used in this way.

The importance of this rule lies in writing efficient and performant code. In large-scale applications, using inefficient methods for string comparison can lead to noticeable performance issues. Therefore, it's crucial to use the appropriate methods for each specific use-case.

### Learn More

 - [StartsWith documentation](https://learn.microsoft.com/en-us/dotnet/api/system.string.startswith?view=net-8.0#system-string-startswith(system-char))

## Non-Compliant Code Examples
```csharp
using System.Xml;

class MyClass {
    public static void processString(string s)
    {
        bool r1 = s.StartsWith("/");
        bool r2 = s.EndsWith("/");
        data.Contains("\\n");
    }
}

```

## Compliant Code Examples
```csharp
using System.Xml;

class MyClass {
    public static void processString(string s)
    {
        bool r1 = s.StartsWith('/');
        bool r2 = s.EndsWith('/');
        bool r3 = s.EndsWith("/", StringComparison.InvariantCulture);
        
    }
}

```
