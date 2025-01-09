---
aliases:
- /continuous_integration/static_analysis/rules/csharp-inclusive/comments
- /static_analysis/rules/csharp-inclusive/comments
dependencies: []
disable_edit: true
group_id: csharp-inclusive
meta:
  category: Best Practices
  id: csharp-inclusive/comments
  language: C#
  language_alias: CSharp
  severity: Notice
  severity_rank: 3
title: Ensure comment wording is inclusive
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `csharp-inclusive/comments`

**Language:** C#

**Severity:** Notice

**Category:** Best Practices

## Description
Avoid using words such as `blacklist`, `whitelist`, `slave` or `master` in comments. Consider using more inclusive wording in your code.

## Non-Compliant Code Examples
```csharp
abstract class Motorcycle
{
    // this is to get a blacklist
    public void Denylist() { }

    protected void AddGas(int denylistNames) {}


}
```

## Compliant Code Examples
```csharp
abstract class Motorcycle
{
    // this is to get a denylist
    public void Denylist() { }

    protected void AddGas(int denylistNames) {}


}
```
