---
aliases:
- /continuous_integration/static_analysis/rules/kotlin-code-style/no-consecutive-comments
- /static_analysis/rules/kotlin-code-style/no-consecutive-comments
dependencies: []
disable_edit: true
group_id: kotlin-code-style
meta:
  category: Code Style
  id: kotlin-code-style/no-consecutive-comments
  language: Kotlin
  severity: Notice
  severity_rank: 3
title: Enforce correct block comment usage
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `kotlin-code-style/no-consecutive-comments`

**Language:** Kotlin

**Severity:** Notice

**Category:** Code Style

## Description
No description found

## Non-Compliant Code Examples
```kotlin
/*
 * Block comments can not be consecutive ...
 */

/*
 * ... even when separated by a new line.
 */
```

## Compliant Code Examples
```kotlin
// An EOL comment
// may be followed by another EOL comment
val foo = "foo"

// Different comment types (including KDoc) may be consecutive ..

/*
 * ... but do need to be separated by a blank line ...
 */

```
