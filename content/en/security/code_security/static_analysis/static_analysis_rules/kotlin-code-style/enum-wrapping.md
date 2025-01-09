---
aliases:
- /continuous_integration/static_analysis/rules/kotlin-code-style/enum-wrapping
- /static_analysis/rules/kotlin-code-style/enum-wrapping
dependencies: []
disable_edit: true
group_id: kotlin-code-style
meta:
  category: Code Style
  id: kotlin-code-style/enum-wrapping
  language: Kotlin
  severity: Notice
  severity_rank: 3
title: Enforce enum entry line wrapping
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `kotlin-code-style/enum-wrapping`

**Language:** Kotlin

**Severity:** Notice

**Category:** Code Style

## Description
No description found

## Non-Compliant Code Examples
```kotlin
enum class Foo {
    A,
    B, C,
    D
}
```

## Compliant Code Examples
```kotlin
enum class Foo { A, B, C, D }

enum class Foo { 
    A, 
    B,
    C, 
    D 
}
```
