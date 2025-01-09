---
aliases:
- /continuous_integration/static_analysis/rules/kotlin-code-style/range-spacing
- /static_analysis/rules/kotlin-code-style/range-spacing
dependencies: []
disable_edit: true
group_id: kotlin-code-style
meta:
  category: Code Style
  id: kotlin-code-style/range-spacing
  language: Kotlin
  severity: Notice
  severity_rank: 3
title: Enforce range operator spacing
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `kotlin-code-style/range-spacing`

**Language:** Kotlin

**Severity:** Notice

**Category:** Code Style

## Description
No description found

## Non-Compliant Code Examples
```kotlin
val foo1 = (1.. 12 step 2).last
val foo2 = (1 .. 12 step 2).last
val foo3 = (1 ..12 step 2).last
```

## Compliant Code Examples
```kotlin
val foo1 = (1..12 step 2).last
val foo2 = (1..12 step 2).last
val foo3 = (1..12 step 2).last
```
