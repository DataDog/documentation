---
aliases:
- /continuous_integration/static_analysis/rules/csharp-best-practices/base-equals
- /static_analysis/rules/csharp-best-practices/base-equals
dependencies: []
disable_edit: true
group_id: csharp-best-practices
meta:
  category: Best Practices
  id: csharp-best-practices/base-equals
  language: C#
  language_alias: CSharp
  severity: Error
  severity_rank: 1
title: 'Enforces that base is object when using base.Equals '
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `csharp-best-practices/base-equals`

**Language:** C#

**Severity:** Error

**Category:** Best Practices

## Description
Using `base.Equals` can be dangerous when the base is not an `object` because the new base class can override `Equals`, leading to unexpected behavior. This rule prevents the use of `base.Equals` in a class where the base is not an `object`.

## Non-Compliant Code Examples
```csharp
class NonCompliant : Compliant
{
    private int bar;

    public override bool Equals(object other)
    {
        bool eq1;
        eq1 = base.Equals(other);
        var eq2 = base.Equals(other);
        if (base.Equals(other))
		{
            return true;
        }
        return this.bar == ((NonCompliant)other).bar;
    }
}

class Compliant
{
    private int foo;

    public override bool Equals(object other)
    {
        if (base.Equals(other))
		{
            return true;
        }
        return this.foo == ((Compliant)other).foo;
    }
}
```

## Compliant Code Examples
```csharp
class Compliant
{
    private int foo;

    public override bool Equals(object other)
    {
        if (base.Equals(other))
		{
            return true;
        }
        return this.foo == ((Compliant)other).foo;
    }
}
```
