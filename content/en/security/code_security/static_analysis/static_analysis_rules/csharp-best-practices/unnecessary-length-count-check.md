---
aliases:
- /continuous_integration/static_analysis/rules/csharp-best-practices/unnecessary-length-count-check
- /static_analysis/rules/csharp-best-practices/unnecessary-length-count-check
dependencies: []
disable_edit: true
group_id: csharp-best-practices
meta:
  category: Best Practices
  id: csharp-best-practices/unnecessary-length-count-check
  language: C#
  language_alias: CSharp
  severity: Warning
  severity_rank: 2
title: Checks for always-true expressions on collections and arrays
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `csharp-best-practices/unnecessary-length-count-check`

**Language:** C#

**Severity:** Warning

**Category:** Best Practices

## Description
Because the `Length` of an array or `Count` of a collection will never be negative, some expressions will always evaluate to true, and some will always evaluate to false.

```csharp
if (collection.Count >= 0) { /* ... */ }
// Equivalent to
if (true) { /* ... */ }

if (arr.Length < 0) { /* ... */ }
// Equivalent to
if (false) { /* ... */ }
```

This rule warns when always-true or always-false expressions are detected.

## Non-Compliant Code Examples
```csharp
using System.Collections.Generic;
using static System.Linq.Enumerable;

class NonCompliant {
    public static void Main()
    {
        List<char> collection = ['a', 'b', 'c'];
        if (collection.Count >= 0) { /* ... */ }
        if (collection.Count >= 0b0) { /* ... */ }
        if (collection.Count >= 0x0) { /* ... */ }
        if (collection.Count >= -1) { /* ... */ }
        if (collection.Count > -1) { /* ... */ }
        if (collection.Count < 0) { /* ... */ }
        if (collection.Count < -1) { /* ... */ }
		
        char[] array = ['a', 'b', 'c'];
        if (array.Count() >= 0) { /* ... */ }
        if (array.Count() >= 0b0) { /* ... */ }
        if (array.Count() >= 0x0) { /* ... */ }
        if (array.Count() >= -1) { /* ... */ }
        if (array.Count() > -1) { /* ... */ }
        if (array.Count() < 0) { /* ... */ }
        if (array.Count() < -1) { /* ... */ }

        if (array.LongCount() >= 0b0) { /* ... */ }
        if (array.LongCount() >= 0x0) { /* ... */ }
        if (array.LongCount() >= -1) { /* ... */ }
        if (array.LongCount() > -1) { /* ... */ }
        if (array.LongCount() < 0) { /* ... */ }
        if (array.LongCount() < -1) { /* ... */ }

        if (array.Length >= 0) { /* ... */ }
        if (array.Length >= 0b0) { /* ... */ }
        if (array.Length >= 0x0) { /* ... */ }
        if (array.Length >= -1) { /* ... */ }
        if (array.Length > -1) { /* ... */ }
        if (array.Length < 0) { /* ... */ }
        if (array.Length < -1) { /* ... */ }
    }
}

```

## Compliant Code Examples
```csharp
using System.Collections.Generic;
using static System.Linq.Enumerable;

class Compliant {
    public static void Main()
    {
        List<char> collection = ['a', 'b', 'c'];
        if (collection.Count > 0) { /* ... */ }
        if (collection.Count > 0b0) { /* ... */ }
        if (collection.Count > 0x0) { /* ... */ }
        if (collection.Count > 1) { /* ... */ }
        if (collection.Count == 0) { /* ... */ }
		
        char[] array = ['a', 'b', 'c'];
        if (array.Count() > 0) { /* ... */ }
        if (array.Count() > 0b0) { /* ... */ }
        if (array.Count() > 0x0) { /* ... */ }
        if (array.Count() > 1) { /* ... */ }
        if (array.Count() == 0) { /* ... */ }

        if (array.LongCount() > 0) { /* ... */ }
        if (array.LongCount() > 0b0) { /* ... */ }
        if (array.LongCount() > 0x0) { /* ... */ }
        if (array.LongCount() > 1) { /* ... */ }
        if (array.LongCount() == 0) { /* ... */ }

        if (array.Length > 0) { /* ... */ }
        if (array.Length > 0b0) { /* ... */ }
        if (array.Length > 0x0) { /* ... */ }
        if (array.Length > 1) { /* ... */ }
        if (array.Length == 0) { /* ... */ }
    }
}

```
