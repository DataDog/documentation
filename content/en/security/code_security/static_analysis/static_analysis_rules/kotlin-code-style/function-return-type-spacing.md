---
aliases:
- /continuous_integration/static_analysis/rules/kotlin-code-style/function-return-type-spacing
- /static_analysis/rules/kotlin-code-style/function-return-type-spacing
dependencies: []
disable_edit: true
group_id: kotlin-code-style
meta:
  category: Code Style
  id: kotlin-code-style/function-return-type-spacing
  language: Kotlin
  severity: Notice
  severity_rank: 3
title: Enforce function return type spacing
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `kotlin-code-style/function-return-type-spacing`

**Language:** Kotlin

**Severity:** Notice

**Category:** Code Style

## Description
No description found

## Non-Compliant Code Examples
```kotlin
fun foo():  String = "some-result"

fun bar():
    String = "some-result"
```

## Compliant Code Examples
```kotlin
fun foo(): String = "some-result"
```
