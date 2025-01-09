---
aliases:
- /continuous_integration/static_analysis/rules/csharp-code-style/boolean-get-method-name
- /static_analysis/rules/csharp-code-style/boolean-get-method-name
dependencies: []
disable_edit: true
group_id: csharp-code-style
meta:
  category: Code Style
  id: csharp-code-style/boolean-get-method-name
  language: C#
  language_alias: CSharp
  severity: Notice
  severity_rank: 3
title: Avoid prefix boolean returning method with `get`
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `csharp-code-style/boolean-get-method-name`

**Language:** C#

**Severity:** Notice

**Category:** Code Style

## Description
If a method returns a boolean, do not use a name that starts with `get`. Instead, use a name that shows a better description of the method objective. For example, start the method name with `is`, `has`, or `can`.

#### Learn More

 - [C# Google Style Guide](https://google.github.io/styleguide/csharp-style.html)

## Non-Compliant Code Examples
```csharp
class MyClass {
    bool getAttribute(){
        
    }
}
```

## Compliant Code Examples
```csharp
class MyClass {
    bool hasAttribute(){
        
    }
}
```
