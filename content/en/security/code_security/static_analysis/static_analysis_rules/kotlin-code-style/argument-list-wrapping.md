---
aliases:
- /continuous_integration/static_analysis/rules/kotlin-code-style/argument-list-wrapping
- /static_analysis/rules/kotlin-code-style/argument-list-wrapping
dependencies: []
disable_edit: true
group_id: kotlin-code-style
meta:
  category: Code Style
  id: kotlin-code-style/argument-list-wrapping
  language: Kotlin
  severity: Notice
  severity_rank: 3
title: Enforce argument list wrapping
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `kotlin-code-style/argument-list-wrapping`

**Language:** Kotlin

**Severity:** Notice

**Category:** Code Style

## Description
No description found

## Non-Compliant Code Examples
```kotlin
val foo =
    foo(
        a,
        b, c,
    )
```

## Compliant Code Examples
```kotlin
val foo =
    foo(
        a,
        b,
        c,
    )

val foo = foo(a, b, c)
```
