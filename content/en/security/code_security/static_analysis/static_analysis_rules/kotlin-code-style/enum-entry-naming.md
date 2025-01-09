---
aliases:
- /continuous_integration/static_analysis/rules/kotlin-code-style/enum-entry-naming
- /static_analysis/rules/kotlin-code-style/enum-entry-naming
dependencies: []
disable_edit: true
group_id: kotlin-code-style
meta:
  category: Code Style
  id: kotlin-code-style/enum-entry-naming
  language: Kotlin
  severity: Notice
  severity_rank: 3
title: Enum names are uppercase
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `kotlin-code-style/enum-entry-naming`

**Language:** Kotlin

**Severity:** Notice

**Category:** Code Style

## Description
No description found

## Non-Compliant Code Examples
```kotlin
enum class Foo {
    foo,
    bAr,
    Foo_Bar,
}
```

## Compliant Code Examples
```kotlin
enum class Foo {
    FOO,
    Foo,
    FOO_BAR,
    FooBar,
}
```
