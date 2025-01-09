---
aliases:
- /continuous_integration/static_analysis/rules/kotlin-code-style/type-parameter-comment
- /static_analysis/rules/kotlin-code-style/type-parameter-comment
dependencies: []
disable_edit: true
group_id: kotlin-code-style
meta:
  category: Code Style
  id: kotlin-code-style/type-parameter-comment
  language: Kotlin
  severity: Notice
  severity_rank: 3
title: Enforce type parameter comment spacing
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `kotlin-code-style/type-parameter-comment`

**Language:** Kotlin

**Severity:** Notice

**Category:** Code Style

## Description
No description found

## Non-Compliant Code Examples
```kotlin
class Foo1<in /* some comment */ Bar>
```

## Compliant Code Examples
```kotlin
class Foo1<
    /* some comment */ 
    out Bar
    >
class Foo2<
    // some comment 
    out Bar
    >
```
