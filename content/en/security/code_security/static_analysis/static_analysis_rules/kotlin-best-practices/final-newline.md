---
aliases:
- /continuous_integration/static_analysis/rules/kotlin-best-practices/final-newline
- /static_analysis/rules/kotlin-best-practices/final-newline
dependencies: []
disable_edit: true
group_id: kotlin-best-practices
meta:
  category: Best Practices
  id: kotlin-best-practices/final-newline
  language: Kotlin
  severity: Notice
  severity_rank: 3
title: Enforce final newline
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `kotlin-best-practices/final-newline`

**Language:** Kotlin

**Severity:** Notice

**Category:** Best Practices

## Description
No description found

## Non-Compliant Code Examples
```kotlin
package main 

fun main(args : Array<String>) {
    println("Hello world!")
}
```

## Compliant Code Examples
```kotlin
package main 

fun main(args : Array<String>) {
    println("Hello world!")
}

```
