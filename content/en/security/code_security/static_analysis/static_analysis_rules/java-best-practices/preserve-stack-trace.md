---
aliases:
- /continuous_integration/static_analysis/rules/java-best-practices/preserve-stack-trace
- /static_analysis/rules/java-best-practices/preserve-stack-trace
dependencies: []
disable_edit: true
group_id: java-best-practices
meta:
  category: Best Practices
  id: java-best-practices/preserve-stack-trace
  language: Java
  severity: Notice
  severity_rank: 3
title: Preserve the thrown stack trace
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `java-best-practices/preserve-stack-trace`

**Language:** Java

**Severity:** Notice

**Category:** Best Practices

## Description
This rule identifies when exceptions are raised within a `catch` block but are not relevant to the exception parameter specified in the `catch` block. This can result in the original exception's stack trace information being lost, which leads to throwing less detailed exceptions.

## Non-Compliant Code Examples
```java
public class Foo {
    void foo() {
        try {
            Integer.parseInt("foo");
        } catch (Exception e) {
            throw new Exception(e.getMessage()); // only throwing the message here
        }
    }
}

```

## Compliant Code Examples
```java
public class Foo {
    void foo() {
        try {
            Integer.parseInt("foo");
        } catch (Exception e) {
            throw new Exception(e); // sending the full exception at least
        }
    }
}
```
