---
aliases:
- /continuous_integration/static_analysis/rules/kotlin-best-practices/no-unit-return
- /static_analysis/rules/kotlin-best-practices/no-unit-return
dependencies: []
disable_edit: true
group_id: kotlin-best-practices
meta:
  category: Best Practices
  id: kotlin-best-practices/no-unit-return
  language: Kotlin
  severity: Notice
  severity_rank: 3
title: Enforce not returning Unit type
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `kotlin-best-practices/no-unit-return`

**Language:** Kotlin

**Severity:** Notice

**Category:** Best Practices

## Description
No description found

## Non-Compliant Code Examples
```kotlin
fun foo(): Unit{}
```

## Compliant Code Examples
```kotlin
fun foo() {}

fun bar(a: Int, b: Int): Int {
    return a + b
}
```
