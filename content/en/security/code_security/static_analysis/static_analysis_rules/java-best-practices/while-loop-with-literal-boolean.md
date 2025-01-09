---
aliases:
- /continuous_integration/static_analysis/rules/java-best-practices/while-loop-with-literal-boolean
- /static_analysis/rules/java-best-practices/while-loop-with-literal-boolean
dependencies: []
disable_edit: true
group_id: java-best-practices
meta:
  category: Best Practices
  id: java-best-practices/while-loop-with-literal-boolean
  language: Java
  severity: Notice
  severity_rank: 3
title: Loops can be simplified or removed
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `java-best-practices/while-loop-with-literal-boolean`

**Language:** Java

**Severity:** Notice

**Category:** Best Practices

## Description
Using `do {} while (true);` makes it less obvious that the loop runs forever, since the loop condition is placed after the loop body. By using `while (true) {}`, your code clearly indicates an infinite loop from the beginning.

The `do {} while (false);` construct is redundant and may cause confusion too. In a `do-while` loop, the loop body is executed first, and then the condition is checked. Since the condition `while (false)` always evaluates to false, the loop exits after one iteration. When an inner variable scope is required within this loop, a simple block `{}` can be used instead of the `do-while` construct.

Unlike the `do {} while (false);` above, the `while (false) {}` construct represents dead code because the loop condition here is evaluated first and the body will never execute. Removing unnecessary loops here can enhances your code's readability and maintainability.

## Non-Compliant Code Examples
```java
public class Foo {
  {
    while (false) { }
    do { } while (true);
    do { } while (false);
    do { } while (false | false);
    do { } while (false || false);
  }
}
```

## Compliant Code Examples
```java
public class Foo {
  {
    while (true) { }
  }
}
```
