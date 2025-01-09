---
aliases:
- /continuous_integration/static_analysis/rules/java-code-style/boolean-get-method-name
- /static_analysis/rules/java-code-style/boolean-get-method-name
dependencies: []
disable_edit: true
group_id: java-code-style
meta:
  category: Code Style
  id: java-code-style/boolean-get-method-name
  language: Java
  severity: Notice
  severity_rank: 3
title: Avoid prefix boolean returning method with `get`
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `java-code-style/boolean-get-method-name`

**Language:** Java

**Severity:** Notice

**Category:** Code Style

## Description
To improve readability, methods that return a boolean should be named accordingly. Instead of prefixing a method with `get`, consider using `is`, `has`, `can`, or `will` .

## Non-Compliant Code Examples
```java
public class Foo {
    public boolean getFoo(); // you are not getting foo
}
```

## Compliant Code Examples
```java
public class Foo {
    public boolean isFoo();
}
```
