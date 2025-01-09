---
aliases:
- /continuous_integration/static_analysis/rules/csharp-code-style/interface-first-letter
- /static_analysis/rules/csharp-code-style/interface-first-letter
dependencies: []
disable_edit: true
group_id: csharp-code-style
meta:
  category: Code Style
  id: csharp-code-style/interface-first-letter
  language: C#
  language_alias: CSharp
  severity: Notice
  severity_rank: 3
title: Interface names should start with I
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `csharp-code-style/interface-first-letter`

**Language:** C#

**Severity:** Notice

**Category:** Code Style

## Description
The first letter of an interface should be `I`.

#### Learn More

 - [C# Google Style Guide](https://google.github.io/styleguide/csharp-style.html)

## Non-Compliant Code Examples
```csharp
interface Service {
    void myMethod();
}
```

## Compliant Code Examples
```csharp
interface IService {
    void myMethod();
}
```
