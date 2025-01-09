---
aliases:
- /continuous_integration/static_analysis/rules/kotlin-code-style/nullable-type-spacing
- /static_analysis/rules/kotlin-code-style/nullable-type-spacing
dependencies: []
disable_edit: true
group_id: kotlin-code-style
meta:
  category: Code Style
  id: kotlin-code-style/nullable-type-spacing
  language: Kotlin
  severity: Notice
  severity_rank: 3
title: Enforce nullable type spacing
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `kotlin-code-style/nullable-type-spacing`

**Language:** Kotlin

**Severity:** Notice

**Category:** Code Style

## Description
No description found

## Non-Compliant Code Examples
```kotlin
val foo: String ? = null
val foo: List<String ?> = listOf(null)
```

## Compliant Code Examples
```kotlin
val foo: String? = null
val foo: List<String?> = listOf(null)
```
