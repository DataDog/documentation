---
aliases:
- /continuous_integration/static_analysis/rules/kotlin-code-style/annotation-spacing
- /static_analysis/rules/kotlin-code-style/annotation-spacing
dependencies: []
disable_edit: true
group_id: kotlin-code-style
meta:
  category: Code Style
  id: kotlin-code-style/annotation-spacing
  language: Kotlin
  severity: Notice
  severity_rank: 3
title: Enforce annotation separation
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `kotlin-code-style/annotation-spacing`

**Language:** Kotlin

**Severity:** Notice

**Category:** Code Style

## Description
No description found

## Non-Compliant Code Examples
```kotlin
@JvmField

fun foo() {}

@Foo @Bar
/**
 * block comment
 */
class FooBar {
}
```

## Compliant Code Examples
```kotlin
@JvmField
fun foo() {}

/**
 * block comment
 */
@Foo @Bar
class FooBar {
}
```
