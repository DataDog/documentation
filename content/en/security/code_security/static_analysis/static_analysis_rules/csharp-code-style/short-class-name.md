---
aliases:
- /continuous_integration/static_analysis/rules/csharp-code-style/short-class-name
- /static_analysis/rules/csharp-code-style/short-class-name
dependencies: []
disable_edit: true
group_id: csharp-code-style
meta:
  category: Code Style
  id: csharp-code-style/short-class-name
  language: C#
  language_alias: CSharp
  severity: Notice
  severity_rank: 3
title: Avoid short class names
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `csharp-code-style/short-class-name`

**Language:** C#

**Severity:** Notice

**Category:** Code Style

## Description
Do not use class names that are too short. Class names should be descriptive of the functionalities of the class.

#### Learn More

 - [C# Google Style Guide](https://google.github.io/styleguide/csharp-style.html)

## Non-Compliant Code Examples
```csharp
interface I {
    void SampleMethod();
}
```

```csharp
class A {

}

```

## Compliant Code Examples
```csharp
interface MyInterface {
    void SampleMethod();
}
```
