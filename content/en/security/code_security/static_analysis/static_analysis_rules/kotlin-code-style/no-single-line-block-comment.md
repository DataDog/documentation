---
aliases:
- /continuous_integration/static_analysis/rules/kotlin-code-style/no-single-line-block-comment
- /static_analysis/rules/kotlin-code-style/no-single-line-block-comment
dependencies: []
disable_edit: true
group_id: kotlin-code-style
meta:
  category: Code Style
  id: kotlin-code-style/no-single-line-block-comment
  language: Kotlin
  severity: Notice
  severity_rank: 3
title: Use an EOL comment over a single line block comment
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `kotlin-code-style/no-single-line-block-comment`

**Language:** Kotlin

**Severity:** Notice

**Category:** Code Style

## Description
No description found

## Non-Compliant Code Examples
```kotlin
/* Some comment */

val foo = "foo" /* Some comment */
```

## Compliant Code Examples
```kotlin
/*
 * Some comment
 */
val foo = "foo" // Some comment

val foo = { /* no-op */ }
```
