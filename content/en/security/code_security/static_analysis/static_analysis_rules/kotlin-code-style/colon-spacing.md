---
aliases:
- /continuous_integration/static_analysis/rules/kotlin-code-style/colon-spacing
- /static_analysis/rules/kotlin-code-style/colon-spacing
dependencies: []
disable_edit: true
group_id: kotlin-code-style
meta:
  category: Code Style
  id: kotlin-code-style/colon-spacing
  language: Kotlin
  severity: Notice
  severity_rank: 3
title: Enforce consistent spacing around colon
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `kotlin-code-style/colon-spacing`

**Language:** Kotlin

**Severity:** Notice

**Category:** Code Style

## Description
No description found

## Non-Compliant Code Examples
```kotlin
class Foo:Bar

class Foo    :    Bar
```

## Compliant Code Examples
```kotlin
class Foo : Bar
```
