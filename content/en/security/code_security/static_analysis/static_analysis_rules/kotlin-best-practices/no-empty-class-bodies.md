---
aliases:
- /continuous_integration/static_analysis/rules/kotlin-best-practices/no-empty-class-bodies
- /static_analysis/rules/kotlin-best-practices/no-empty-class-bodies
dependencies: []
disable_edit: true
group_id: kotlin-best-practices
meta:
  category: Best Practices
  id: kotlin-best-practices/no-empty-class-bodies
  language: Kotlin
  severity: Notice
  severity_rank: 3
title: Class bodies should not be empty
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `kotlin-best-practices/no-empty-class-bodies`

**Language:** Kotlin

**Severity:** Notice

**Category:** Best Practices

## Description
No description found

## Non-Compliant Code Examples
```kotlin
class Foo {}

data class Bar(val v: Any) { }

interface Baz {

}

object FooBar {}
```

## Compliant Code Examples
```kotlin
class Foo

data class Bar(val v: Any)

interface Baz

object FooBar
```
