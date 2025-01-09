---
aliases:
- /continuous_integration/static_analysis/rules/java-inclusive/class-definition
- /static_analysis/rules/java-inclusive/class-definition
dependencies: []
disable_edit: true
group_id: java-inclusive
meta:
  category: Best Practices
  id: java-inclusive/class-definition
  language: Java
  severity: Notice
  severity_rank: 3
title: Check class definition language
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `java-inclusive/class-definition`

**Language:** Java

**Severity:** Notice

**Category:** Best Practices

## Description
Ensure that certain words are not used in the codebase and suggest alternatives when appropriate.

Examples of alternative suggestions:

-   `blacklist` with `denylist`
-   `whitelist` with `allowlist`
-   `master` with `primary`
-   `slave` with `secondary`

## Non-Compliant Code Examples
```java
class Blacklist {
    void blacklist() {

    }

    int BlackList(int WhiteList) {

    }
}
```

## Compliant Code Examples
```java
class AllowList {
    void allowlist() {

    }

    int AllowList(int AllowList) {

    }
}
```
