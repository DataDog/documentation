---
aliases:
- /continuous_integration/static_analysis/rules/java-code-style/confusing-ternary
- /static_analysis/rules/java-code-style/confusing-ternary
dependencies: []
disable_edit: true
group_id: java-code-style
meta:
  category: Code Style
  id: java-code-style/confusing-ternary
  language: Java
  severity: Notice
  severity_rank: 3
title: Avoid negation in your ternary operation
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `java-code-style/confusing-ternary`

**Language:** Java

**Severity:** Notice

**Category:** Code Style

## Description
Using a negative comparison in `if` expressions with an `else` clause can be confusing. Consider modifying your comparison by switching your `if` and else` block statements.

## Non-Compliant Code Examples
```java
public class Foo {
    String bar(int x, int y) {
        return (x != y) ? "diff" : "same";
    }
}
```

## Compliant Code Examples
```java
public class Foo {
    String bar(int x, int y) {
        return (x == y) ? "same" : "diff";
    }
}
```
