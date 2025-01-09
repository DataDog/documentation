---
aliases:
- /continuous_integration/static_analysis/rules/csharp-code-style/variable-naming-conventions
- /static_analysis/rules/csharp-code-style/variable-naming-conventions
dependencies: []
disable_edit: true
group_id: csharp-code-style
meta:
  category: Code Style
  id: csharp-code-style/variable-naming-conventions
  language: C#
  language_alias: CSharp
  severity: Notice
  severity_rank: 3
title: Follow variable naming conventions
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `csharp-code-style/variable-naming-conventions`

**Language:** C#

**Severity:** Notice

**Category:** Code Style

## Description
Variable names should follow the `camelCase` pattern and start with a lowercase letter, except for private and protected fields that should start with `_`.

#### Learn More

 - [C# Google Style Guide](https://google.github.io/styleguide/csharp-style.html)

## Non-Compliant Code Examples
```csharp
class My_Class {
    int MyVariable = 10;

    public void foo() {
        int FooBar = 14;
        int BAZ_QUUX = 3;
        DateTimeOffset t1 = TimeZoneInfo.ConvertTime();
    }
}
```

## Compliant Code Examples
```csharp
public class CertificateHelperTests {
    private const string PemCertPublic = "";
}
```

```csharp
class My_Class {
    int _myVariable = 10;
    [TestMethod]
    public void BooleanToIntegerConverterTest()
    {
        var converter = new BooleanToIntegerConverter
        {
            ValueOnTrue = 1,
            ValueOnFalse = 2
        };

        Assert.AreEqual(1, converter.Convert(true, typeof(int), null, null));
        Assert.AreEqual(2, converter.Convert(false, typeof(int), null, null));
    }
}

```

```csharp
class My_Class {
    int myVariable = 10;
}
```
