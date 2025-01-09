---
aliases:
- /continuous_integration/static_analysis/rules/kotlin-code-style/max-line-len
- /static_analysis/rules/kotlin-code-style/max-line-len
dependencies: []
disable_edit: true
group_id: kotlin-code-style
meta:
  category: Code Style
  id: kotlin-code-style/max-line-len
  language: Kotlin
  severity: Notice
  severity_rank: 3
title: Line cannot exceed default max length
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `kotlin-code-style/max-line-len`

**Language:** Kotlin

**Severity:** Notice

**Category:** Code Style

## Description
No description found

## Non-Compliant Code Examples
```kotlin
val fooooooooooooooo = "fooooooooooooooooooooo"
val foo = "foo" + "ooooooooooooooooooooooooooo"
val foooooooooooooo = "foooooooooooooooooooo" // some comment
val bad = "fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff"

```

## Compliant Code Examples
```kotlin
val fooooooooooooooo = "fooooooooooooooooooooo"
val foo = "foo" + "ooooooooooooooooooooooooooo"
val foooooooooooooo = "foooooooooooooooooooo" // some comment
```
