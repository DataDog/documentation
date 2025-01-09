---
aliases:
- /continuous_integration/static_analysis/rules/kotlin-code-style/statement-wrapping
- /static_analysis/rules/kotlin-code-style/statement-wrapping
dependencies: []
disable_edit: true
group_id: kotlin-code-style
meta:
  category: Code Style
  id: kotlin-code-style/statement-wrapping
  language: Kotlin
  severity: Notice
  severity_rank: 3
title: Enforce block body not on brace line
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `kotlin-code-style/statement-wrapping`

**Language:** Kotlin

**Severity:** Notice

**Category:** Code Style

## Description
No description found

## Non-Compliant Code Examples
```kotlin
fun foo() { if (true) {
        // do something
    }
}
```

## Compliant Code Examples
```kotlin
fun foo() {
    if (true) {
        // do something
    }
}

class A {
    val a = 0
    val b = 1
}

enum class FooBar1 { FOO, BAR }

enum class FooBar2 {
    FOO,
    BAR,
}
```
