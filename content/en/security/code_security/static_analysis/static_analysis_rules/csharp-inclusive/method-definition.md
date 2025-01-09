---
aliases:
- /continuous_integration/static_analysis/rules/csharp-inclusive/method-definition
- /static_analysis/rules/csharp-inclusive/method-definition
dependencies: []
disable_edit: true
group_id: csharp-inclusive
meta:
  category: Best Practices
  id: csharp-inclusive/method-definition
  language: C#
  language_alias: CSharp
  severity: Notice
  severity_rank: 3
title: Check function definition language
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `csharp-inclusive/method-definition`

**Language:** C#

**Severity:** Notice

**Category:** Best Practices

## Description
Avoid using words such as `blacklist`, `whitelist`, `slave` or `master` in method names. Consider using more inclusive wording in your code.

## Non-Compliant Code Examples
```csharp
abstract class Motorcycle
{
    public void BlackList() { }

    protected void AddGas(int blacklistNames) {}


}
```

## Compliant Code Examples
```csharp
abstract class Motorcycle
{
    public void Denylist() { }

    protected void AddGas(int denylistNames) {}


}
```
