---
aliases:
- /continuous_integration/static_analysis/rules/kotlin-code-style/no-empty-lead-line-class
- /static_analysis/rules/kotlin-code-style/no-empty-lead-line-class
dependencies: []
disable_edit: true
group_id: kotlin-code-style
meta:
  category: Code Style
  id: kotlin-code-style/no-empty-lead-line-class
  language: Kotlin
  severity: Notice
  severity_rank: 3
title: No blank lines at the start of a class
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `kotlin-code-style/no-empty-lead-line-class`

**Language:** Kotlin

**Severity:** Notice

**Category:** Code Style

## Description
No description found

## Non-Compliant Code Examples
```kotlin
class Foo {

    val foo = "foo"
}
```

## Compliant Code Examples
```kotlin
class Foo {
    val bar = "bar"
    val foo = "foo"
}
```
