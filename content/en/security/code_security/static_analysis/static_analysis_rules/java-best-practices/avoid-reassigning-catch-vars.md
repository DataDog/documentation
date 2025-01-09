---
aliases:
- /continuous_integration/static_analysis/rules/java-best-practices/avoid-reassigning-catch-vars
- /static_analysis/rules/java-best-practices/avoid-reassigning-catch-vars
dependencies: []
disable_edit: true
group_id: java-best-practices
meta:
  category: Best Practices
  id: java-best-practices/avoid-reassigning-catch-vars
  language: Java
  severity: Notice
  severity_rank: 3
title: Don't reassign a catch variable
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `java-best-practices/avoid-reassigning-catch-vars`

**Language:** Java

**Severity:** Notice

**Category:** Best Practices

## Description
Maintaining a consistent link between the caught variable and the exception thrown in the corresponding `try` block brings clarity and predictability. Reassigning the caught variable disrupts this expectation and can lead to confusion. By refraining from these reassignments, developers can know that the variable encapsulates the essence of the original exception.

## Non-Compliant Code Examples
```java
public class Foo {
    public void foo() {
        try {
            // do something
        } catch (Exception e) {
            e = new NullPointerException(); // should not reassign here
        }
    }
}
```

## Compliant Code Examples
```java
public class Foo {
    public void foo() {
        try {
            // do something
        } catch (MyException e) {
            newError = new RuntimeException(); // created a new error variable
        }
    }
}
```
