---
aliases:
- /continuous_integration/static_analysis/rules/kotlin-best-practices/if-else-bracing
- /static_analysis/rules/kotlin-best-practices/if-else-bracing
dependencies: []
disable_edit: true
group_id: kotlin-best-practices
meta:
  category: Best Practices
  id: kotlin-best-practices/if-else-bracing
  language: Kotlin
  severity: Notice
  severity_rank: 3
title: Enforce if/else expressions to use braces
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `kotlin-best-practices/if-else-bracing`

**Language:** Kotlin

**Severity:** Notice

**Category:** Best Practices

## Description
No description found

## Non-Compliant Code Examples
```kotlin
fun func(value: Int) {
    if (value > 0)
        foo()
    else if (value < 0) {
        bar()
    } else
        baz()
}
```

## Compliant Code Examples
```kotlin
fun func(value: Int) {
    if (value > 0) {
        foo()
    } else if (value < 0) {
        bar()
    } else {
        baz()
    }
}
```
