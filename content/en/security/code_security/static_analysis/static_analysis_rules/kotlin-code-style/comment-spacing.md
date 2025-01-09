---
aliases:
- /continuous_integration/static_analysis/rules/kotlin-code-style/comment-spacing
- /static_analysis/rules/kotlin-code-style/comment-spacing
dependencies: []
disable_edit: true
group_id: kotlin-code-style
meta:
  category: Code Style
  id: kotlin-code-style/comment-spacing
  language: Kotlin
  severity: Notice
  severity_rank: 3
title: Enforce line comment spacing
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `kotlin-code-style/comment-spacing`

**Language:** Kotlin

**Severity:** Notice

**Category:** Code Style

## Description
No description found

## Non-Compliant Code Examples
```kotlin
//comment
fun main() {
    System.out.println(
         //123
        "test"
    )
}
```

## Compliant Code Examples
```kotlin
// comment
fun main() {
    System.out.println(
        // comment
        "test",
    )
}
```
