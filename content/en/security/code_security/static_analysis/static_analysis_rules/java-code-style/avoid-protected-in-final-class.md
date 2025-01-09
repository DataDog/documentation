---
aliases:
- /continuous_integration/static_analysis/rules/java-code-style/avoid-protected-in-final-class
- /static_analysis/rules/java-code-style/avoid-protected-in-final-class
dependencies: []
disable_edit: true
group_id: java-code-style
meta:
  category: Code Style
  id: java-code-style/avoid-protected-in-final-class
  language: Java
  severity: Notice
  severity_rank: 3
title: Avoid using protected field in final class
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `java-code-style/avoid-protected-in-final-class`

**Language:** Java

**Severity:** Notice

**Category:** Code Style

## Description
Avoid setting fields as protected inside a final class as they cannot be subclassed.

If flagged, review your class and its usage. Consider adjusting your modifiers and their access.

## Non-Compliant Code Examples
```java
public final class Foo {
    private int x;
    protected int y; // visibility should be reviewed

    protected int getY() { // visibility should be reviewed
        return y;
    };
    Foo() {}
}
```

## Compliant Code Examples
```java
public final class Foo {
    private int x;
    public int y;

    public int getY() {
        return y;
    }; 
    Foo() {}
}
```
