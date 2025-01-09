---
aliases:
- /continuous_integration/static_analysis/rules/java-best-practices/forloop-variable-count
- /static_analysis/rules/java-best-practices/forloop-variable-count
dependencies: []
disable_edit: true
group_id: java-best-practices
meta:
  category: Best Practices
  id: java-best-practices/forloop-variable-count
  language: Java
  severity: Warning
  severity_rank: 2
title: Too many control variables in for loop
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `java-best-practices/forloop-variable-count`

**Language:** Java

**Severity:** Warning

**Category:** Best Practices

## Description
The presence of multiple control variables in a `for` loop can obscure the range of values over which the loop iterates and make your code brittle and difficult to debug.

To follow this rule, regular `for` loops should have only one control variable.

## Arguments

 * `max-variables`: Maximum number of control variables. Default: 1.

## Non-Compliant Code Examples
```java
public class Main {
   public void foo() {
      for (int i = 0, j = 0; i < 10; i++, j += 2) { // more than one control variable
         foo();
      }
   }
}

```

## Compliant Code Examples
```java
public class Main {
   public void foo() {
      for (int i = 0; i < 10; i++) {
         foo();
      }
   }
}
```
