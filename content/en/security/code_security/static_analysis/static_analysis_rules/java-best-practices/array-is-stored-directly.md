---
aliases:
- /continuous_integration/static_analysis/rules/java-best-practices/array-is-stored-directly
- /static_analysis/rules/java-best-practices/array-is-stored-directly
dependencies: []
disable_edit: true
group_id: java-best-practices
meta:
  category: Best Practices
  id: java-best-practices/array-is-stored-directly
  language: Java
  severity: Notice
  severity_rank: 3
title: Should clone array
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `java-best-practices/array-is-stored-directly`

**Language:** Java

**Severity:** Notice

**Category:** Best Practices

## Description
In Java, it is recommended that constructors and methods clone any arrays received through parameters. This practice prevents the original array from being affected by any future changes made by the caller.

It is advisable to clone the array before storing it to ensure that you retain a copy of the array that will remain unaffected by any external changes made to the original array. By following this approach, you can promote code safety and maintain the integrity of the original array.

## Non-Compliant Code Examples
```java
public class Foo {
    private String[] x;
    private int y;
    
    public Foo(String[] param1, int param2) {
        this.x = param1; // should make a copy of this array first
    }
}
```

```java
public class Foo {
    private int[] x;
    private int y;
    
    public void foo (int[] param1, int param2) {
        this.x = param1; // should make a copy of this array first
    }
}
```

```java
public class Foo {
    private String[] x;
    private int y;
    
    public void foo (String[] param1, int param2) {
        this.x = param1; // should make a copy of this array first
    }
}
```

## Compliant Code Examples
```java
public class Foo {
    private String[] x;
    private int y;
    
    public void foo (String[] param1, int param2) {
        this.x = Arrays.copyOf(param1, param1.length);
    }
}
```

```java
public class Foo {
    private String[] x;
    private int y;
    
    private void foo (String[] param1, int param2) {
        this.x = param1; // no violation since the method is private
    }
}
```
