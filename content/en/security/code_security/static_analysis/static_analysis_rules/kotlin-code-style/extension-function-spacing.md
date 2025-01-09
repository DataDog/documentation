---
aliases:
- /continuous_integration/static_analysis/rules/kotlin-code-style/extension-function-spacing
- /static_analysis/rules/kotlin-code-style/extension-function-spacing
dependencies: []
disable_edit: true
group_id: kotlin-code-style
meta:
  category: Code Style
  id: kotlin-code-style/extension-function-spacing
  language: Kotlin
  severity: Notice
  severity_rank: 3
title: Enforce extension function spacing
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `kotlin-code-style/extension-function-spacing`

**Language:** Kotlin

**Severity:** Notice

**Category:** Code Style

## Description
No description found

## Non-Compliant Code Examples
```kotlin
fun String . foo() = "foo"
```

## Compliant Code Examples
```kotlin
fun String.foo() = "foo"
```
