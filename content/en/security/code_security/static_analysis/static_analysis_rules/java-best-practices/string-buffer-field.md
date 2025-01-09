---
aliases:
- /continuous_integration/static_analysis/rules/java-best-practices/string-buffer-field
- /static_analysis/rules/java-best-practices/string-buffer-field
dependencies: []
disable_edit: true
group_id: java-best-practices
meta:
  category: Best Practices
  id: java-best-practices/string-buffer-field
  language: Java
  severity: Warning
  severity_rank: 2
title: Do not use StringBuffer or StringBuilder as a class field
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `java-best-practices/string-buffer-field`

**Language:** Java

**Severity:** Warning

**Category:** Best Practices

## Description
StringBuffers and StringBuilders have the potential to grow significantly, which could lead to memory leaks if they are retained within objects with extended lifetimes.

## Non-Compliant Code Examples
```java
public class Foo {
    
    private StringBuffer buffer1;    // potential memory leak as an instance variable;
    private String buffer2;
    private StringBuilder buffer3;    // potential memory leak as an instance variable;

}
```

## Compliant Code Examples
```java
public class Foo {
    
    public void method() {
        StringBuffer buffer;
    }
    
}
```
