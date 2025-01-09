---
aliases:
- /continuous_integration/static_analysis/rules/csharp-best-practices/class-no-private-constructors
- /static_analysis/rules/csharp-best-practices/class-no-private-constructors
dependencies: []
disable_edit: true
group_id: csharp-best-practices
meta:
  category: Best Practices
  id: csharp-best-practices/class-no-private-constructors
  language: C#
  language_alias: CSharp
  severity: Warning
  severity_rank: 2
title: Warns on class private constructors that are dead code
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `csharp-best-practices/class-no-private-constructors`

**Language:** C#

**Severity:** Warning

**Category:** Best Practices

## Description
Classes with a private constructor can't be instantiated outside of the class itself. Because they are unreachable, they should be removed or made public.

An exception is made for classes that access their own constructors (like a singleton), and classes that derive from `System.Runtime.InteropServices.SafeHandle`.

## Non-Compliant Code Examples
```csharp
class NonCompliant {
    private static int n1 = 1;
    private NonCompliant() { /* ... */ }
}

class NonCompliant : Test {
    private NonCompliant() { /* ... */ }
}

class NonCompliant {
    private static readonly Foo _foo = new Foo();
    private NonCompliant() { /* ... */ }
}
```

## Compliant Code Examples
```csharp
class Compliant {
    private NonCompliant() { /* ... */ }
    public static int n = 1;
}

class Compliant {
    public static int n1 = 1;
    public static int n2 = 2;
}

class Compliant {
    public Compliant() { /* ... */ }
}

class Compliant {
    private static readonly Compliant _singleton = new Compliant();
    private Compliant() { /* ... */ }
}

public sealed class CompliantEnum : SmartEnum<CompliantEnum> {
    public static readonly CompliantEnum One = new CompliantEnum(nameof(One), 1);
    private CompliantEnum(string name, int value) : base(name, value) {}
}

// Utility class
public static class Compliant {
    public static int Sum(int a, int b) { /* ... */ }
    private Compliant() { /* ... */ }
    public static int Value = 1;
}

class Compliant : SafeAccessTokenHandle {
    private Compliant() { /* ... */ }
}

class Compliant {
    private static readonly Compliant _singleton = new Compliant();
    public Compliant() { /* ... */ }
}


```
