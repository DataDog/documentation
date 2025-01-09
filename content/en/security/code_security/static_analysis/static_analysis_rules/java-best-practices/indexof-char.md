---
aliases:
- /continuous_integration/static_analysis/rules/java-best-practices/indexof-char
- /static_analysis/rules/java-best-practices/indexof-char
dependencies: []
disable_edit: true
group_id: java-best-practices
meta:
  category: Performance
  id: java-best-practices/indexof-char
  language: Java
  severity: Warning
  severity_rank: 2
title: Do not use a string with only one character
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `java-best-practices/indexof-char`

**Language:** Java

**Severity:** Warning

**Category:** Performance

## Description
When using `indexOf` with only one character, use a character and not a string as it executes faster.

## Non-Compliant Code Examples
```java
class Main {
    public static void main(String[] args) {
        int pos = s.indexOf("f"); 
    }
}
```

## Compliant Code Examples
```java
class Main {
    public static void main(String[] args) {
        int pos = s.indexOf('f'); 
    }
}
```
