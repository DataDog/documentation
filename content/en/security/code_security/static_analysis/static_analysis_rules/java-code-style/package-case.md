---
aliases:
- /continuous_integration/static_analysis/rules/java-code-style/package-case
- /static_analysis/rules/java-code-style/package-case
dependencies: []
disable_edit: true
group_id: java-code-style
meta:
  category: Code Style
  id: java-code-style/package-case
  language: Java
  severity: Notice
  severity_rank: 3
title: Package names should not contain uppercase characters
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `java-code-style/package-case`

**Language:** Java

**Severity:** Notice

**Category:** Code Style

## Description
Package names should only contain lowercase characters.

## Non-Compliant Code Examples
```java
package com.fooCompany;  // should be lowercase name

public class Foo {}
```

## Compliant Code Examples
```java
package com.foocompany;

public class Foo {}
```
