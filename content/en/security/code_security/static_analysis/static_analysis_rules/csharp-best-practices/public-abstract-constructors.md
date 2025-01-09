---
aliases:
- /continuous_integration/static_analysis/rules/csharp-best-practices/public-abstract-constructors
- /static_analysis/rules/csharp-best-practices/public-abstract-constructors
dependencies: []
disable_edit: true
group_id: csharp-best-practices
meta:
  category: Best Practices
  id: csharp-best-practices/public-abstract-constructors
  language: C#
  language_alias: CSharp
  severity: Notice
  severity_rank: 3
title: Avoid using a public contructor for an abstract class
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `csharp-best-practices/public-abstract-constructors`

**Language:** C#

**Severity:** Notice

**Category:** Best Practices

## Description
Using an [abstract](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/keywords/abstract) modifier in a class declaration indicates that a class is intended only to be a base class of other classes and not instantiated by itself. Due to this, there is no need for `public` or `internal` constructors within. Any initialization logic should be added in a `private`,`private protected`, or `protected` constructor.

## Non-Compliant Code Examples
```csharp
abstract class Foo
{
    internal Foo()
    {
      //...
    }
}
```

```csharp
abstract class Foo
{
    public Foo()
    {
      //...
    }
}
```

## Compliant Code Examples
```csharp
abstract class Foo
{
    private protected Foo()
    {
      //...
    }
}
```

```csharp
abstract class Foo
{
    private Foo()
    {
      //...
    }
}
```

```csharp
abstract class Foo
{
    protected Foo()
    {
      //...
    }
}
```
