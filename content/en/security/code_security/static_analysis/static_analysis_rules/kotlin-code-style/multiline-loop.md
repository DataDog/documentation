---
aliases:
- /continuous_integration/static_analysis/rules/kotlin-code-style/multiline-loop
- /static_analysis/rules/kotlin-code-style/multiline-loop
dependencies: []
disable_edit: true
group_id: kotlin-code-style
meta:
  category: Code Style
  id: kotlin-code-style/multiline-loop
  language: Kotlin
  severity: Notice
  severity_rank: 3
title: Braces required for multiline for, while, and do statements.
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `kotlin-code-style/multiline-loop`

**Language:** Kotlin

**Severity:** Notice

**Category:** Code Style

## Description
No description found

## Non-Compliant Code Examples
```kotlin
for (i in 1..10)
    println(i)

var i = 0
while (i < 5) 
  println(i)
  i++

do 
    val foo = bar()
while (foo != null) 
```

## Compliant Code Examples
```kotlin
for (i in 1..10) {
    println(i)
}

var i = 0
while (i < 5) {
  println(i)
  i++
} 

do {
    val foo = bar()
} while (foo != null) 
```
