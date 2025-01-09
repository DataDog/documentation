---
aliases:
- /continuous_integration/static_analysis/rules/csharp-code-style/short-variable
- /static_analysis/rules/csharp-code-style/short-variable
dependencies: []
disable_edit: true
group_id: csharp-code-style
meta:
  category: Code Style
  id: csharp-code-style/short-variable
  language: C#
  language_alias: CSharp
  severity: Notice
  severity_rank: 3
title: Avoid short variable names
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `csharp-code-style/short-variable`

**Language:** C#

**Severity:** Notice

**Category:** Code Style

## Description
Variable names should be descriptive of the purpose of the variable. Do not use names that are too short, and use names that help other developers understand the objective of this variable.

#### Learn More

 - [C# Google Style Guide](https://google.github.io/styleguide/csharp-style.html)

## Non-Compliant Code Examples
```csharp
class MyClass {
    void myMethod(){
        int fo = 20 + 10;
    }
}
```

## Compliant Code Examples
```csharp
class MyClass {
    void myMethod(){
        int foobar = 20 + 10;
    }
}
```
