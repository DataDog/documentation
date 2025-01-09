---
aliases:
- /continuous_integration/static_analysis/rules/java-inclusive/variable-assignment
- /static_analysis/rules/java-inclusive/variable-assignment
dependencies: []
disable_edit: true
group_id: java-inclusive
meta:
  category: Best Practices
  id: java-inclusive/variable-assignment
  language: Java
  severity: Notice
  severity_rank: 3
title: Check variable assignment language
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `java-inclusive/variable-assignment`

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
        whitelist = 1;
        this.whitelist = 1;
    }

    int BlackList(int WhiteList) {
        int blacklist = 42;
    }
}
```

## Compliant Code Examples
```java
class AllowList {
    void allowlist() {
        allowlist = 1;
    }

    int AllowList(int AllowList) {
        int denylist = 42;
    }
}
```
