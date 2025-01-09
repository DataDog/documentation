---
aliases:
- /continuous_integration/static_analysis/rules/csharp-best-practices/avoid-formattablestring
- /static_analysis/rules/csharp-best-practices/avoid-formattablestring
dependencies: []
disable_edit: true
group_id: csharp-best-practices
meta:
  category: Performance
  id: csharp-best-practices/avoid-formattablestring
  language: C#
  language_alias: CSharp
  severity: Info
  severity_rank: 4
title: Avoid FormattableString
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `csharp-best-practices/avoid-formattablestring`

**Language:** C#

**Severity:** Info

**Category:** Performance

## Description
The function `string.Create` prevents unnecessary allocations. It should be preferred over `FormattableString` functions.

#### Learn More

 - [Creating Strings with no allocation overhead using String.Create](https://www.stevejgordon.co.uk/creating-strings-with-no-allocation-overhead-using-string-create-csharp)

## Non-Compliant Code Examples
```csharp
class MyClass {
    public static void myFunction(string s)
    {
        Console.WriteLine(FormattableString.CurrentCulture("foobar"));
        Console.WriteLine(FormattableString.Invariant($"Counter: {(int)counter}"));
    }
}

```

## Compliant Code Examples
```csharp
class MyClass {
    public static void myFunction(string s)
    {
        Console.WriteLine(string.Create(CultureInfo.CurrentCulture, "foobar"));
        Console.WriteLine(string.Create(CultureInfo.InvariantCulture, $"Counter: {(int)counter}"));
    }
}

```
