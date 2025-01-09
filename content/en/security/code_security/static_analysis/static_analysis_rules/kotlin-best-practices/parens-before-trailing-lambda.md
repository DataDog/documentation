---
aliases:
- /continuous_integration/static_analysis/rules/kotlin-best-practices/parens-before-trailing-lambda
- /static_analysis/rules/kotlin-best-practices/parens-before-trailing-lambda
dependencies: []
disable_edit: true
group_id: kotlin-best-practices
meta:
  category: Best Practices
  id: kotlin-best-practices/parens-before-trailing-lambda
  language: Kotlin
  severity: Notice
  severity_rank: 3
title: An empty parentheses block before a lambda is redundant.
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `kotlin-best-practices/parens-before-trailing-lambda`

**Language:** Kotlin

**Severity:** Notice

**Category:** Best Practices

## Description
No description found

## Non-Compliant Code Examples
```kotlin
val foo = "some-string".count() { it == '-' }
```

## Compliant Code Examples
```kotlin
val foo = "some-string".count { it == '-' }
```
