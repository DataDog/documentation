---
aliases:
- /continuous_integration/static_analysis/rules/java-code-style/generics-naming
- /static_analysis/rules/java-code-style/generics-naming
dependencies: []
disable_edit: true
group_id: java-code-style
meta:
  category: Code Style
  id: java-code-style/generics-naming
  language: Java
  severity: Notice
  severity_rank: 3
title: Enforce generic naming standards
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `java-code-style/generics-naming`

**Language:** Java

**Severity:** Notice

**Category:** Code Style

## Description
Generic values should not contain more than a single uppercase letter.

## Non-Compliant Code Examples
```java
// 'e' is lowercased
public interface GenericFoo<e extends BaseBar, K extends Serializable> {}

// 'EF' is two characters.
public interface GenericFoo<EF extends BaseBar, K extends Serializable> {}
```

## Compliant Code Examples
```java
public interface GenericFoo<E extends BaseBar, K extends Serializable> extends BaseFoo {
    // This is ok...
}

public interface GenericFoo<E extends BaseBar, K extends Serializable> {
    // Also this
}
```
