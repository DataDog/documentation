---
aliases:
- /continuous_integration/static_analysis/rules/kotlin-code-style/no-line-break-before-assignment
- /static_analysis/rules/kotlin-code-style/no-line-break-before-assignment
dependencies: []
disable_edit: true
group_id: kotlin-code-style
meta:
  category: Code Style
  id: kotlin-code-style/no-line-break-before-assignment
  language: Kotlin
  severity: Notice
  severity_rank: 3
title: Guard against incorrect line break
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `kotlin-code-style/no-line-break-before-assignment`

**Language:** Kotlin

**Severity:** Notice

**Category:** Code Style

## Description
No description found

## Non-Compliant Code Examples
```kotlin
val valA 
   = ""
```

## Compliant Code Examples
```kotlin
val valA =
      ""
```
