---
aliases:
- /continuous_integration/static_analysis/rules/kotlin-code-style/curly-bracket-spacing
- /static_analysis/rules/kotlin-code-style/curly-bracket-spacing
dependencies: []
disable_edit: true
group_id: kotlin-code-style
meta:
  category: Code Style
  id: kotlin-code-style/curly-bracket-spacing
  language: Kotlin
  severity: Notice
  severity_rank: 3
title: Enforce curly bracket spacing
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `kotlin-code-style/curly-bracket-spacing`

**Language:** Kotlin

**Severity:** Notice

**Category:** Code Style

## Description
No description found

## Non-Compliant Code Examples
```kotlin
val foo = bar{foo()} 
```

## Compliant Code Examples
```kotlin
val foo = bar { foo() }
```
