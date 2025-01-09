---
aliases:
- /continuous_integration/static_analysis/rules/kotlin-code-style/unary-operator-spacing
- /static_analysis/rules/kotlin-code-style/unary-operator-spacing
dependencies: []
disable_edit: true
group_id: kotlin-code-style
meta:
  category: Code Style
  id: kotlin-code-style/unary-operator-spacing
  language: Kotlin
  severity: Notice
  severity_rank: 3
title: Enforce unary operator spacing
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `kotlin-code-style/unary-operator-spacing`

**Language:** Kotlin

**Severity:** Notice

**Category:** Code Style

## Description
No description found

## Non-Compliant Code Examples
```kotlin
fun foo1(i: Int) = i ++

fun foo2(i: Int) = ++ i

fun foo3(i: Int) = ++
    i
```

## Compliant Code Examples
```kotlin
fun foo1(i: Int) = i++

fun foo2(i: Int) = ++i

fun foo3(i: Int) = ++i
```
