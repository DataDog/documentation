---
aliases:
- /continuous_integration/static_analysis/rules/kotlin-code-style/multiline-if-else
- /static_analysis/rules/kotlin-code-style/multiline-if-else
dependencies: []
disable_edit: true
group_id: kotlin-code-style
meta:
  category: Code Style
  id: kotlin-code-style/multiline-if-else
  language: Kotlin
  severity: Notice
  severity_rank: 3
title: Braces required for multiline if/else statements.
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `kotlin-code-style/multiline-if-else`

**Language:** Kotlin

**Severity:** Notice

**Category:** Code Style

## Description
No description found

## Arguments

 * `foo`: Blah

## Non-Compliant Code Examples
```kotlin
if (true)
    return 0
else
    return 1
```

## Compliant Code Examples
```kotlin
if (true) {
    return 0
} else {
    return 1
}
```
