---
aliases:
- /continuous_integration/static_analysis/rules/java-best-practices/add-empty-string
- /static_analysis/rules/java-best-practices/add-empty-string
dependencies: []
disable_edit: true
group_id: java-best-practices
meta:
  category: Best Practices
  id: java-best-practices/add-empty-string
  language: Java
  severity: Warning
  severity_rank: 2
title: Do not add an empty string
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `java-best-practices/add-empty-string`

**Language:** Java

**Severity:** Warning

**Category:** Best Practices

## Description
Do not add an empty string. Use the appropriate method to generate the data you need, and add the `toString` method of the type you want to export as a string.

## Non-Compliant Code Examples
```java
class Main {

    public static void main(String[] args) {
        String s = "" + 239;
        String t = "123" + 456;
    }
}
```

## Compliant Code Examples
```java
class Main {

    public static void main(String[] args) {
        String s = Integer.toString(239);
    }
}
```
