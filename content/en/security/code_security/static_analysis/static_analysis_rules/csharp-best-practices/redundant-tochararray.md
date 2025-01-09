---
aliases:
- /continuous_integration/static_analysis/rules/csharp-best-practices/redundant-tochararray
- /static_analysis/rules/csharp-best-practices/redundant-tochararray
dependencies: []
disable_edit: true
group_id: csharp-best-practices
meta:
  category: Best Practices
  id: csharp-best-practices/redundant-tochararray
  language: C#
  language_alias: CSharp
  severity: Warning
  severity_rank: 2
title: Suggest using string's indexer property over toCharArray()
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `csharp-best-practices/redundant-tochararray`

**Language:** C#

**Severity:** Warning

**Category:** Best Practices

## Description
When using a `for each` statement to iterate over a string's characters, using `ToCharArray()` is redundant and unnecessary, as the `string` type has [indexer](https://learn.microsoft.com/en-us/dotnet/csharp/programming-guide/indexers/) that allows access to each `char`.

## Non-Compliant Code Examples
```csharp
class NonCompliant
{
    public static void Main()
    {
        string str1 = "foo";
        foreach (char ch in str1.toCharArray())
		{
		    Console.WriteLine($"{ch}");
		}
        foreach (char ch in "foo".toCharArray())
		{
		    Console.WriteLine($"{ch}");
		}
		var obj1 = new { str1 = "foo" };
        foreach (char ch in obj1.str1.toCharArray())
		{
		    Console.WriteLine($"{ch}");
		}
    }
}
```

## Compliant Code Examples
```csharp
class Compliant
{
    public static void Main()
    {
        string str1 = "foo";
        foreach (char ch in str1)
		{
		    Console.WriteLine($"{ch}");
		}
        foreach (char ch in "foo")
		{
		    Console.WriteLine($"{ch}");
		}
        var obj1 = new { str1 = "foo" };
        foreach (char ch in obj1.str1)
		{
		    Console.WriteLine($"{ch}");
		}
    }
}
```
