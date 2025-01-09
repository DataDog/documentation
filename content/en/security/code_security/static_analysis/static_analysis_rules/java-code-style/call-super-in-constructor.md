---
aliases:
- /continuous_integration/static_analysis/rules/java-code-style/call-super-in-constructor
- /static_analysis/rules/java-code-style/call-super-in-constructor
dependencies: []
disable_edit: true
group_id: java-code-style
meta:
  category: Code Style
  id: java-code-style/call-super-in-constructor
  language: Java
  severity: Notice
  severity_rank: 3
title: Consider calling super in constructor
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `java-code-style/call-super-in-constructor`

**Language:** Java

**Severity:** Notice

**Category:** Code Style

## Description
In Java, it is suggested to call `super()` in an extended class. This rule will report a violation if both a call to `super()` and an overloaded constructor are absent.

## Non-Compliant Code Examples
```java
public class Foo extends Bar{
    public Foo() {} // missing super()
}
```

## Compliant Code Examples
```java
public class Foo extends Bar{
    public Foo() {
        super(); // calls the Bar constructor
    }
    
    public Foo(int code) {
        this(); // also valid
    }
}
```
