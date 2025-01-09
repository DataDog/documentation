---
aliases:
- /continuous_integration/static_analysis/rules/kotlin-code-style/value-argument-comment
- /static_analysis/rules/kotlin-code-style/value-argument-comment
dependencies: []
disable_edit: true
group_id: kotlin-code-style
meta:
  category: Code Style
  id: kotlin-code-style/value-argument-comment
  language: Kotlin
  severity: Notice
  severity_rank: 3
title: Enforce comment placement in value argument
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `kotlin-code-style/value-argument-comment`

**Language:** Kotlin

**Severity:** Notice

**Category:** Code Style

## Description
No description found

## Non-Compliant Code Examples
```kotlin
val foo1 = foo(bar /* some comment */ = "bar")
val foo2 = 
    foo(
        bar = // some comment
            "bar"
    )
```

## Compliant Code Examples
```kotlin
val foo1 =
    foo(
        /* some comment */
        bar = "bar"
    )
val foo2 =
    foo(
        // some comment
        bar = "bar"
    )
```
