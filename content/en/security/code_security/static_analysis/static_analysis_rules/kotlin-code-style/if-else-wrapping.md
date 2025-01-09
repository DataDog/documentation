---
aliases:
- /continuous_integration/static_analysis/rules/kotlin-code-style/if-else-wrapping
- /static_analysis/rules/kotlin-code-style/if-else-wrapping
dependencies: []
disable_edit: true
group_id: kotlin-code-style
meta:
  category: Code Style
  id: kotlin-code-style/if-else-wrapping
  language: Kotlin
  severity: Notice
  severity_rank: 3
title: Enforce single line if statement styling
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `kotlin-code-style/if-else-wrapping`

**Language:** Kotlin

**Severity:** Notice

**Category:** Code Style

## Description
No description found

## Non-Compliant Code Examples
```kotlin
fun foobar() {
    if (true) if (false) foo() else bar()
    if (true) bar() else if (false) foo() else bar()
    if (true) { foo() } else bar()
    if (true) bar() else { if (false) foo() else bar() }
}
```

## Compliant Code Examples
```kotlin
fun foobar() {
    if (true) foo()
    if (true) foo() else bar()
}
```
