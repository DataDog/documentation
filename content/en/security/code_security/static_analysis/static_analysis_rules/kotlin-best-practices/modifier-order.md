---
aliases:
- /continuous_integration/static_analysis/rules/kotlin-best-practices/modifier-order
- /static_analysis/rules/kotlin-best-practices/modifier-order
dependencies: []
disable_edit: true
group_id: kotlin-best-practices
meta:
  category: Best Practices
  id: kotlin-best-practices/modifier-order
  language: Kotlin
  severity: Notice
  severity_rank: 3
title: Enforce modifier ordering
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `kotlin-best-practices/modifier-order`

**Language:** Kotlin

**Severity:** Notice

**Category:** Best Practices

## Description
No description found

## Non-Compliant Code Examples
```kotlin
abstract class Foo {
    final public val foo = "foo"
    
    open protected val bar = "bar"

    open suspend internal fun baz(v: Any): Any = ""
}
```

## Compliant Code Examples
```kotlin
abstract class Foo {
    public final val foo = "foo"

    protected open val bar = "bar"

    internal open suspend fun baz(v: Any): Any = ""
}
```
