---
aliases:
- /continuous_integration/static_analysis/rules/csharp-code-style/class-naming-conventions
- /static_analysis/rules/csharp-code-style/class-naming-conventions
dependencies: []
disable_edit: true
group_id: csharp-code-style
meta:
  category: Code Style
  id: csharp-code-style/class-naming-conventions
  language: C#
  language_alias: CSharp
  severity: Notice
  severity_rank: 3
title: Follow class naming conventions
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `csharp-code-style/class-naming-conventions`

**Language:** C#

**Severity:** Notice

**Category:** Code Style

## Description
Class names should use the `PascalCase` and start with an uppercase.

#### Learn More

 - [C# Google Style Guide](https://google.github.io/styleguide/csharp-style.html)

## Non-Compliant Code Examples
```csharp
class My_Class {
    void SampleMethod();
}
```

```csharp
class myClass {
    void SampleMethod();
}
```

```csharp
interface myInterface {
    void SampleMethod();
}
```

## Compliant Code Examples
```csharp
class MyClass {
    void SampleMethod();
}
```

```csharp
class MyClass {
    void SampleMethod();
}
```
