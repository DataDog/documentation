---
aliases:
- /continuous_integration/static_analysis/rules/kotlin-best-practices/function-naming
- /static_analysis/rules/kotlin-best-practices/function-naming
dependencies: []
disable_edit: true
group_id: kotlin-best-practices
meta:
  category: Best Practices
  id: kotlin-best-practices/function-naming
  language: Kotlin
  severity: Notice
  severity_rank: 3
title: Function names should be camel case
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `kotlin-best-practices/function-naming`

**Language:** Kotlin

**Severity:** Notice

**Category:** Best Practices

## Description
No description found

## Non-Compliant Code Examples
```kotlin
fun Foo() {}

fun Foo_Bar() {}

fun `Foo Bar`() {}

fun foo_bar() {}
```

## Compliant Code Examples
```kotlin
fun foo() {}

fun fooBar() {}

// Any keyword is allowed when wrapped between backticks
fun `fun`() {} 
```
