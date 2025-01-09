---
aliases:
- /continuous_integration/static_analysis/rules/kotlin-best-practices/class-naming
- /static_analysis/rules/kotlin-best-practices/class-naming
dependencies: []
disable_edit: true
group_id: kotlin-best-practices
meta:
  category: Best Practices
  id: kotlin-best-practices/class-naming
  language: Kotlin
  severity: Notice
  severity_rank: 3
title: Class names should be upper camel case
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `kotlin-best-practices/class-naming`

**Language:** Kotlin

**Severity:** Notice

**Category:** Best Practices

## Description
No description found

## Non-Compliant Code Examples
```kotlin
class foo {}

class Foo_Bar {}
```

## Compliant Code Examples
```kotlin
class Foo {}

class Foo1 {}

class FooBar {}

 // Any keyword is allowed when wrapped between backticks
class `class`
```
