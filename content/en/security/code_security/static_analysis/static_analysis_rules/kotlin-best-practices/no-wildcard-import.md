---
aliases:
- /continuous_integration/static_analysis/rules/kotlin-best-practices/no-wildcard-import
- /static_analysis/rules/kotlin-best-practices/no-wildcard-import
dependencies: []
disable_edit: true
group_id: kotlin-best-practices
meta:
  category: Best Practices
  id: kotlin-best-practices/no-wildcard-import
  language: Kotlin
  severity: Notice
  severity_rank: 3
title: No wildcard imports
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `kotlin-best-practices/no-wildcard-import`

**Language:** Kotlin

**Severity:** Notice

**Category:** Best Practices

## Description
No description found

## Non-Compliant Code Examples
```kotlin
import foobar.foo.*
```

## Compliant Code Examples
```kotlin
import foo
import foobar.Bar
import foobar.Foo
```
