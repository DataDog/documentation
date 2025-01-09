---
aliases:
- /continuous_integration/static_analysis/rules/java-code-style/local-home-naming-convention
- /static_analysis/rules/java-code-style/local-home-naming-convention
dependencies: []
disable_edit: true
group_id: java-code-style
meta:
  category: Code Style
  id: java-code-style/local-home-naming-convention
  language: Java
  severity: Notice
  severity_rank: 3
title: Enforce using the LocalHome suffix for Session EJB
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `java-code-style/local-home-naming-convention`

**Language:** Java

**Severity:** Notice

**Category:** Code Style

## Description
When extending Session EJB, you should use `LocalHome` as a suffix.

## Non-Compliant Code Examples
```java
public interface MissingProperSuffix extends javax.ejb.EJBLocalHome {}  // non-standard name

public class MissingProperSuffix extends javax.ejb.EJBLocalHome {}  // non-standard name
```

## Compliant Code Examples
```java
public interface MyBeautifulLocalHome extends javax.ejb.EJBLocalHome {}

public class MyBeautifulLocalHome extends javax.ejb.EJBLocalHome {}
```
