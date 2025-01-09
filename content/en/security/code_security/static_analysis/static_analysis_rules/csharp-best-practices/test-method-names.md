---
aliases:
- /continuous_integration/static_analysis/rules/csharp-best-practices/test-method-names
- /static_analysis/rules/csharp-best-practices/test-method-names
dependencies: []
disable_edit: true
group_id: csharp-best-practices
meta:
  category: Best Practices
  id: csharp-best-practices/test-method-names
  language: C#
  language_alias: CSharp
  severity: Info
  severity_rank: 4
title: Test method name should follow conventions
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `csharp-best-practices/test-method-names`

**Language:** C#

**Severity:** Info

**Category:** Best Practices

## Description
Test methods should follow the following guidelines:
 - must be `public` and not `async`
 - the name should start with `Test`

#### Learn More

 - [mstest documentation](https://learn.microsoft.com/en-us/dotnet/core/testing/unit-testing-with-mstest)

## Non-Compliant Code Examples
```csharp
class MyTests {
    [TestMethod]
    void FooBar()
    {

    }

    [TestMethod]
    public async void BlipBlop()
    {

    }
}

```

## Compliant Code Examples
```csharp
class MyTests {
    [TestMethod]
    public void TestSomething()
    {

    }
}

```
