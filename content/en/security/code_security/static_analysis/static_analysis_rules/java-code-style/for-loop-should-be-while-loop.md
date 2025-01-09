---
aliases:
- /continuous_integration/static_analysis/rules/java-code-style/for-loop-should-be-while-loop
- /static_analysis/rules/java-code-style/for-loop-should-be-while-loop
dependencies: []
disable_edit: true
group_id: java-code-style
meta:
  category: Code Style
  id: java-code-style/for-loop-should-be-while-loop
  language: Java
  severity: Notice
  severity_rank: 3
title: Simplify for loops for while loops
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `java-code-style/for-loop-should-be-while-loop`

**Language:** Java

**Severity:** Notice

**Category:** Code Style

## Description
This rule identifies instances where simplifying for loops is possible which can make these loops more concise.

## Non-Compliant Code Examples
```java
// No init or update nodes; can be rewritten `while (condition)`
public class Foo {
    void bar() {
        for(;true;) true;

        for(; true ;){
        	System.out.println("bar");
        }
        
        for(; i < 42 ;) true;
        
        for(;;);
    }
}
```

## Compliant Code Examples
```java
public class Foo {
    void bar() {
        for(int i = 0; i < 42; i++);
    }
}
```
