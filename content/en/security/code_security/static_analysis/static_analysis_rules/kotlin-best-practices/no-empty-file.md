---
aliases:
- /continuous_integration/static_analysis/rules/kotlin-best-practices/no-empty-file
- /static_analysis/rules/kotlin-best-practices/no-empty-file
dependencies: []
disable_edit: true
group_id: kotlin-best-practices
meta:
  category: Best Practices
  id: kotlin-best-practices/no-empty-file
  language: Kotlin
  severity: Notice
  severity_rank: 3
title: A Kotlin (script) file should not be empty.
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `kotlin-best-practices/no-empty-file`

**Language:** Kotlin

**Severity:** Notice

**Category:** Best Practices

## Description
A Kotlin (script) file should not be empty. It needs to contain at least one declaration. Files only  containing a package and/or import statements are disallowed. 

## Non-Compliant Code Examples
```kotlin
package foo

import foo
```

## Compliant Code Examples
```kotlin
package test.foo.bar

import foo

fun foo() {
    println("File has declaration")
}
```
