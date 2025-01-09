---
aliases:
- /continuous_integration/static_analysis/rules/kotlin-code-style/function-name-min-length
- /static_analysis/rules/kotlin-code-style/function-name-min-length
dependencies: []
disable_edit: true
group_id: kotlin-code-style
meta:
  category: Code Style
  id: kotlin-code-style/function-name-min-length
  language: Kotlin
  severity: Notice
  severity_rank: 3
title: Avoid very short function names
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `kotlin-code-style/function-name-min-length`

**Language:** Kotlin

**Severity:** Notice

**Category:** Code Style

## Description
Function names should be descriptive of the function behavior and functionalities. Instead of using a very short name, always have a name that indicates what the function is doing.

## Arguments

 * `min-length`: Minimum length for function names. Default: 2.

## Non-Compliant Code Examples
```kotlin
fun a() {
    
}

```

## Compliant Code Examples
```kotlin
fun valid() {
    
}

infix fun to() {
    
}

```
