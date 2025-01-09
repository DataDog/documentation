---
aliases:
- /continuous_integration/static_analysis/rules/kotlin-code-style/angle-bracket-spacing
- /static_analysis/rules/kotlin-code-style/angle-bracket-spacing
dependencies: []
disable_edit: true
group_id: kotlin-code-style
meta:
  category: Code Style
  id: kotlin-code-style/angle-bracket-spacing
  language: Kotlin
  severity: Notice
  severity_rank: 3
title: Enforce angle bracket spacing
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `kotlin-code-style/angle-bracket-spacing`

**Language:** Kotlin

**Severity:** Notice

**Category:** Code Style

## Description
No description found

## Non-Compliant Code Examples
```kotlin
val foo: Map< Int, String> = mapOf()

val bar: Map<Int, String > = mapOf()

val foo: Map< Int, String > = mapOf()

val baz: Set<String > = setOf()
```

## Compliant Code Examples
```kotlin
val foo: Map<Int, String> = mapOf()

val bar: Map<Int, String> = mapOf()

val baz: Map<Int, String> = mapOf()
```
