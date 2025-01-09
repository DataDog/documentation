---
aliases:
- /continuous_integration/static_analysis/rules/csharp-best-practices/no-sleep-in-tests
- /static_analysis/rules/csharp-best-practices/no-sleep-in-tests
dependencies: []
disable_edit: true
group_id: csharp-best-practices
meta:
  category: Best Practices
  id: csharp-best-practices/no-sleep-in-tests
  language: C#
  language_alias: CSharp
  severity: Notice
  severity_rank: 3
title: Avoid Thread.sleep in tests
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `csharp-best-practices/no-sleep-in-tests`

**Language:** C#

**Severity:** Notice

**Category:** Best Practices

## Description
Avoid sleeping in tests. It blocks the test execution and leads to unpredictable results.

## Non-Compliant Code Examples
```csharp
class MyClass {
    [TestMethod]
    public void TestMyMethod()
    {
        Thread.Sleep(500);
    }
}

```

## Compliant Code Examples
```csharp
class MyClass {
    [TestMethod]
    public void TestMyMethod()
    {
        // statements
    }
}

```
