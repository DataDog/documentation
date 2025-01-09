---
aliases:
- /continuous_integration/static_analysis/rules/csharp-code-style/short-method-name
- /static_analysis/rules/csharp-code-style/short-method-name
dependencies: []
disable_edit: true
group_id: csharp-code-style
meta:
  category: Code Style
  id: csharp-code-style/short-method-name
  language: C#
  language_alias: CSharp
  severity: Notice
  severity_rank: 3
title: Avoid short method names
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `csharp-code-style/short-method-name`

**Language:** C#

**Severity:** Notice

**Category:** Code Style

## Description
Method names should be descriptive of the function behavior and functionalities. Instead of using a very short name, always have a name that indicates what the function is doing.

#### Learn More

 - [C# Google Style Guide](https://google.github.io/styleguide/csharp-style.html)

## Non-Compliant Code Examples
```csharp
class MyClass {
    void ab(){
        
    }
}
```

```csharp
interface MyInterface {
    void ab();
}
```

## Compliant Code Examples
```csharp
interface MyInterface {
    void myMethod();
}
```

```csharp
class MyClass {
    void myMethod(){
        
    }
}
```
