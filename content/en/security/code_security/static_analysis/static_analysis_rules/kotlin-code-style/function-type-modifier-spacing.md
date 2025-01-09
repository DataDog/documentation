---
aliases:
- /continuous_integration/static_analysis/rules/kotlin-code-style/function-type-modifier-spacing
- /static_analysis/rules/kotlin-code-style/function-type-modifier-spacing
dependencies: []
disable_edit: true
group_id: kotlin-code-style
meta:
  category: Code Style
  id: kotlin-code-style/function-type-modifier-spacing
  language: Kotlin
  severity: Notice
  severity_rank: 3
title: Enforce function type spacing
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `kotlin-code-style/function-type-modifier-spacing`

**Language:** Kotlin

**Severity:** Notice

**Category:** Code Style

## Description
No description found

## Non-Compliant Code Examples
```kotlin
val foo: suspend() -> Unit = {}

suspend fun bar(baz: suspend   () -> Unit) = baz()
```

## Compliant Code Examples
```kotlin
val foo: suspend () -> Unit = {}

suspend fun bar(baz: suspend () -> Unit) = baz()
```
