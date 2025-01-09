---
aliases:
- /continuous_integration/static_analysis/rules/kotlin-code-style/type-argument-comment
- /static_analysis/rules/kotlin-code-style/type-argument-comment
dependencies: []
disable_edit: true
group_id: kotlin-code-style
meta:
  category: Code Style
  id: kotlin-code-style/type-argument-comment
  language: Kotlin
  severity: Notice
  severity_rank: 3
title: Enforce comment placement in type argument
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `kotlin-code-style/type-argument-comment`

**Language:** Kotlin

**Severity:** Notice

**Category:** Code Style

## Description
No description found

## Non-Compliant Code Examples
```kotlin
fun Foo<out /* some comment */ Any>.foo() {}
```

## Compliant Code Examples
```kotlin
fun Foo<
    /* some comment */ 
    out Any
    >.foo() {}
fun Foo<
    // some comment 
    out Any
    >.foo() {}
```
