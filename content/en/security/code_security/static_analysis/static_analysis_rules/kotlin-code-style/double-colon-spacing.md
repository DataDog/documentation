---
aliases:
- /continuous_integration/static_analysis/rules/kotlin-code-style/double-colon-spacing
- /static_analysis/rules/kotlin-code-style/double-colon-spacing
dependencies: []
disable_edit: true
group_id: kotlin-code-style
meta:
  category: Code Style
  id: kotlin-code-style/double-colon-spacing
  language: Kotlin
  severity: Notice
  severity_rank: 3
title: Enforce double colon spacing
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `kotlin-code-style/double-colon-spacing`

**Language:** Kotlin

**Severity:** Notice

**Category:** Code Style

## Description
No description found

## Non-Compliant Code Examples
```kotlin
val foo = Foo ::class

val bar = Bar:: class

val baz = Baz :: class

val qux = Qux::
    class
```

## Compliant Code Examples
```kotlin
val foo = Foo::class
```
