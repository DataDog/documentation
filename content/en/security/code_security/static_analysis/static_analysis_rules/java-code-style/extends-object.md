---
aliases:
- /continuous_integration/static_analysis/rules/java-code-style/extends-object
- /static_analysis/rules/java-code-style/extends-object
dependencies: []
disable_edit: true
group_id: java-code-style
meta:
  category: Code Style
  id: java-code-style/extends-object
  language: Java
  severity: Notice
  severity_rank: 3
title: Avoid unnecessary object extend
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `java-code-style/extends-object`

**Language:** Java

**Severity:** Notice

**Category:** Code Style

## Description
A class implicitly extends `Object`. As a result, there is no need to extend it.

## Non-Compliant Code Examples
```java
public class Foo extends Object {} // no need to extend Object
```

## Compliant Code Examples
```java
public class Foo {}
```
