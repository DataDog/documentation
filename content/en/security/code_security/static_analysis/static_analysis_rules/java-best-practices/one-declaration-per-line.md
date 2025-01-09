---
aliases:
- /continuous_integration/static_analysis/rules/java-best-practices/one-declaration-per-line
- /static_analysis/rules/java-best-practices/one-declaration-per-line
dependencies: []
disable_edit: true
group_id: java-best-practices
meta:
  category: Best Practices
  id: java-best-practices/one-declaration-per-line
  language: Java
  severity: Notice
  severity_rank: 3
title: Separate lines for each field declaration
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `java-best-practices/one-declaration-per-line`

**Language:** Java

**Severity:** Notice

**Category:** Best Practices

## Description
In Java, it is possible to declare multiple variables of the same type on a single line using commas. This can make code more cluttered and less readable. Declare each variable on a separate line to improve code clarity and maintainability.

## Non-Compliant Code Examples
```java
public class Person {
    // combined declarations (same line) - a violation
    String firstName, lastName;

    // combined declaration (diff line) - no violation
    String firstName,
        lastName;
}
```

## Compliant Code Examples
```java
public class Person {
    // separate declarations - no violation
    String firstName;
    String lastName;     
}
```
