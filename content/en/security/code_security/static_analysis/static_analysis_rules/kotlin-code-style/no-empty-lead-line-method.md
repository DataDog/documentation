---
aliases:
- /continuous_integration/static_analysis/rules/kotlin-code-style/no-empty-lead-line-method
- /static_analysis/rules/kotlin-code-style/no-empty-lead-line-method
dependencies: []
disable_edit: true
group_id: kotlin-code-style
meta:
  category: Code Style
  id: kotlin-code-style/no-empty-lead-line-method
  language: Kotlin
  severity: Notice
  severity_rank: 3
title: No leading empty lines in method blocks
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `kotlin-code-style/no-empty-lead-line-method`

**Language:** Kotlin

**Severity:** Notice

**Category:** Code Style

## Description
No description found

## Non-Compliant Code Examples
```kotlin
fun foo() {
   
   val a = 2
   val b = 3
   println("bar")
}
```

## Compliant Code Examples
```kotlin
fun foo() {
   val a = 2
   val b = 3
   print("bar")
}
```
