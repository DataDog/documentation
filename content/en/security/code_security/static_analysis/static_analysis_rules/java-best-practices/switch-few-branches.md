---
aliases:
- /continuous_integration/static_analysis/rules/java-best-practices/switch-few-branches
- /static_analysis/rules/java-best-practices/switch-few-branches
dependencies: []
disable_edit: true
group_id: java-best-practices
meta:
  category: Best Practices
  id: java-best-practices/switch-few-branches
  language: Java
  severity: Warning
  severity_rank: 2
title: Avoid switch with very few branches
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `java-best-practices/switch-few-branches`

**Language:** Java

**Severity:** Warning

**Category:** Best Practices

## Description
`switch` statements are used to trigger different block of code based on different values. Developers should avoid `switch` statements with less than 3 branches. If a `switch` statement has less than 3 branches, we should rather use a `if` statement.

## Arguments

 * `max-cases`: Max number of cases allowed

## Non-Compliant Code Examples
```java
class Main {
    public static void main(String[] args) {
        switch (condition) {
            case value1:
                break;
        }

        switch (condition) {
            case value1:
                break;
            case value2:
                break;
            default:
                break;
        }
    }
}
```

## Compliant Code Examples
```java
class Main {
    public static void main(String[] args) {
        switch (condition) {
            case value1:
                break;
            case value2:
                break;
            default:
                break;
        }

        switch (condition) {
            case value1: // comments are supported
            case value2:
                break;
            default:
                break;
        }
    }
}
```
