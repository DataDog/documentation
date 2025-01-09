---
aliases:
- /continuous_integration/static_analysis/rules/csharp-inclusive/variable-assignment
- /static_analysis/rules/csharp-inclusive/variable-assignment
dependencies: []
disable_edit: true
group_id: csharp-inclusive
meta:
  category: Best Practices
  id: csharp-inclusive/variable-assignment
  language: C#
  language_alias: CSharp
  severity: Notice
  severity_rank: 3
title: Check variable assignment language
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `csharp-inclusive/variable-assignment`

**Language:** C#

**Severity:** Notice

**Category:** Best Practices

## Description
Avoid using words such as `blacklist`, `whitelist`, `slave` or `master` in variable names. Consider using more inclusive wording in your code.

## Non-Compliant Code Examples
```csharp
class Student
{
    static void Main()
    {
        TestClass slaveVariable = new TestClass();

    }
}
```

```csharp
class Student
{
    private int masterName;


}
```

## Compliant Code Examples
```csharp
class Student
{
    static void Main()
    {
        TestClass secondaryVariable = new TestClass();

    }
}
```
