---
aliases:
- /continuous_integration/static_analysis/rules/java-best-practices/redundant-initializer
- /static_analysis/rules/java-best-practices/redundant-initializer
dependencies: []
disable_edit: true
group_id: java-best-practices
meta:
  category: Performance
  id: java-best-practices/redundant-initializer
  language: Java
  severity: Warning
  severity_rank: 2
title: Avoid redundant initialization
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `java-best-practices/redundant-initializer`

**Language:** Java

**Severity:** Warning

**Category:** Performance

## Description
When initializing fields, prevent initializing fields to the default value. Any additional initialization means more bytecode instructions, and allocating many of these objects may impact your application performance.

If you initialize to a default value, remove the initialization.

## Non-Compliant Code Examples
```java
class Test {
    boolean b   = false;
    byte by     = 0;
    short s     = 0;
    char c      = 0;
    int i       = 0;
    long l      = 0;
    float f     = .0f;
    double d    = 0d;
    Object o    = null;

    MyClass mca[] = null;
    int i1 = 0, i2 = 0;
}
```

## Compliant Code Examples
```java
class Test {
    boolean b                = true;
    byte by                  = 1;
    short s                  = 2;
    char c                   = 3;
    int i                    = 4;
    long l                   = 5;
    public final boolean b   = false;
    final long l             = 0;
    float f                  = .1f;
    double d                 = 10d;
    Object o                 = new Object();

    MyClass mca[] = new MyClass[3];
    int i1 = 1, ia1[] = new Something[];

}
```
