---
aliases:
- /continuous_integration/static_analysis/rules/kotlin-code-style/annotation-blank-line
- /static_analysis/rules/kotlin-code-style/annotation-blank-line
dependencies: []
disable_edit: true
group_id: kotlin-code-style
meta:
  category: Code Style
  id: kotlin-code-style/annotation-blank-line
  language: Kotlin
  severity: Notice
  severity_rank: 3
title: Annotated entities need to be separated
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `kotlin-code-style/annotation-blank-line`

**Language:** Kotlin

**Severity:** Notice

**Category:** Code Style

## Description
No description found

## Non-Compliant Code Examples
```kotlin
fun a()
@Bar
fun b()
```

## Compliant Code Examples
```kotlin
fun a()

@Bar
fun b()
```
