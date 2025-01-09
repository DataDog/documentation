---
aliases:
- /continuous_integration/static_analysis/rules/java-best-practices/avoid-string-instantiation
- /static_analysis/rules/java-best-practices/avoid-string-instantiation
dependencies: []
disable_edit: true
group_id: java-best-practices
meta:
  category: Performance
  id: java-best-practices/avoid-string-instantiation
  language: Java
  severity: Warning
  severity_rank: 2
title: 'Avoid instantiating strings '
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `java-best-practices/avoid-string-instantiation`

**Language:** Java

**Severity:** Warning

**Category:** Performance

## Description
Instead of creating a new string with `new String()`, use the string directly.

## Non-Compliant Code Examples
```java
class Main{
    public static void main(String[] args){
        String s = new String("foobar");
    }
}
```

## Compliant Code Examples
```java
class Main{
    public static void main(String[] args){
        String s = "foobar";
    }
}
```
