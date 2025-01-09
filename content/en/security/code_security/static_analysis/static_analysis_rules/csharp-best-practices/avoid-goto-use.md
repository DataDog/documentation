---
aliases:
- /continuous_integration/static_analysis/rules/csharp-best-practices/avoid-goto-use
- /static_analysis/rules/csharp-best-practices/avoid-goto-use
dependencies: []
disable_edit: true
group_id: csharp-best-practices
meta:
  category: Best Practices
  id: csharp-best-practices/avoid-goto-use
  language: C#
  language_alias: CSharp
  severity: Notice
  severity_rank: 3
title: Avoid using goto statements
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `csharp-best-practices/avoid-goto-use`

**Language:** C#

**Severity:** Notice

**Category:** Best Practices

## Description
The use of `goto` statements can make your code harder to maintain. A structured control flow statement such as an `if`, a loop, a `continue`, or a `break` can make the code much easier to read.

## Non-Compliant Code Examples
```csharp
string ID = "baz";
switch (ID)
{
    case "foo":
        Console.WriteLine("foo");
        break;
    case "bar":
        Console.WriteLine("bar");
        goto case "baz";
        break;
    case "baz":
        Console.WriteLine("baz");
    default:
        Console.WriteLine("n/a");
        break;
}
```

## Compliant Code Examples
```csharp
string ID = "baz";
switch (ID)
{
    case "foo":
        Console.WriteLine("foo");
        break;
    case "bar":
        Console.WriteLine("bar");
        break;
    case "baz":
        Console.WriteLine("baz");
    default:
        Console.WriteLine("n/a");
        break;
}

```
