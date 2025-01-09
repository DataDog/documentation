---
aliases:
- /continuous_integration/static_analysis/rules/kotlin-code-style/comment-declaration-spacing
- /static_analysis/rules/kotlin-code-style/comment-declaration-spacing
dependencies: []
disable_edit: true
group_id: kotlin-code-style
meta:
  category: Code Style
  id: kotlin-code-style/comment-declaration-spacing
  language: Kotlin
  severity: Notice
  severity_rank: 3
title: Enforce proper spacing for declarations with comments
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `kotlin-code-style/comment-declaration-spacing`

**Language:** Kotlin

**Severity:** Notice

**Category:** Code Style

## Description
No description found

## Non-Compliant Code Examples
```kotlin
// some comment 1
bar()
/*
 * some comment 2
 */
foo()
```

## Compliant Code Examples
```kotlin
// some comment 1
bar()

/*
 * some comment 2
 */
foo()
```
