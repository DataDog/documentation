---
aliases:
- /continuous_integration/static_analysis/rules/kotlin-code-style/block-comment-formatting
- /static_analysis/rules/kotlin-code-style/block-comment-formatting
dependencies: []
disable_edit: true
group_id: kotlin-code-style
meta:
  category: Code Style
  id: kotlin-code-style/block-comment-formatting
  language: Kotlin
  severity: Notice
  severity_rank: 3
title: Enforce block comment alignment
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `kotlin-code-style/block-comment-formatting`

**Language:** Kotlin

**Severity:** Notice

**Category:** Code Style

## Description
No description found

## Non-Compliant Code Examples
```kotlin
/*
 * This comment is not formatted well.
   */

/*
  * This comment is not either.
 */

/*
*   Nor is this comment.
 */
```

## Compliant Code Examples
```kotlin
/*
 * This comment is formatted well.
 */
```
