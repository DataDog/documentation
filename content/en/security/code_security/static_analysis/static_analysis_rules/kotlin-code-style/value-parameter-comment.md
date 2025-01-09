---
aliases:
- /continuous_integration/static_analysis/rules/kotlin-code-style/value-parameter-comment
- /static_analysis/rules/kotlin-code-style/value-parameter-comment
dependencies: []
disable_edit: true
group_id: kotlin-code-style
meta:
  category: Code Style
  id: kotlin-code-style/value-parameter-comment
  language: Kotlin
  severity: Notice
  severity_rank: 3
title: Enforce comment placement in value param
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `kotlin-code-style/value-parameter-comment`

**Language:** Kotlin

**Severity:** Notice

**Category:** Code Style

## Description
No description found

## Non-Compliant Code Examples
```kotlin
class Foo(
   foo: /** some kdoc */ String
)
class Bar(
    bar:
       // some comment
       String
)
```

## Compliant Code Examples
```kotlin
class Foo(
    /** some kdoc */
    foo: String
)
class Bar(
    // some comment
    bar: String
)
```
