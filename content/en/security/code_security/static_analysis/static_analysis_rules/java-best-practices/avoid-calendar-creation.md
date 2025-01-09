---
aliases:
- /continuous_integration/static_analysis/rules/java-best-practices/avoid-calendar-creation
- /static_analysis/rules/java-best-practices/avoid-calendar-creation
dependencies: []
disable_edit: true
group_id: java-best-practices
meta:
  category: Best Practices
  id: java-best-practices/avoid-calendar-creation
  language: Java
  severity: Warning
  severity_rank: 2
title: Avoid Calendar class use
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `java-best-practices/avoid-calendar-creation`

**Language:** Java

**Severity:** Warning

**Category:** Best Practices

## Description
Creating instances of `java.util.Calendar` is expensive. Use alternatives that are less heavy and better in terms of performance.

## Non-Compliant Code Examples
```java
public class Main {
    public static void main(String[] args) {
        Date d = Calendar.getInstance().getTime();
        long ms = Calendar.getInstance().getTimeInMillis();
    }
}
```

## Compliant Code Examples
```java
public class Main {
    public static void main(String[] args) {
        Date d = new Date();
        long ms = System.currentTimeMillis();
    }
}
```
