---
aliases:
- /continuous_integration/static_analysis/rules/kotlin-code-style/no-consecutive-blank-lines
- /static_analysis/rules/kotlin-code-style/no-consecutive-blank-lines
dependencies: []
disable_edit: true
group_id: kotlin-code-style
meta:
  category: Code Style
  id: kotlin-code-style/no-consecutive-blank-lines
  language: Kotlin
  severity: Notice
  severity_rank: 3
title: Enforce correct newline usage
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `kotlin-code-style/no-consecutive-blank-lines`

**Language:** Kotlin

**Severity:** Notice

**Category:** Code Style

## Description
No description found

## Non-Compliant Code Examples
```kotlin
package com.test

import com.test.util


val a = "a"




fun b() {
}


fun c()
```

## Compliant Code Examples
```kotlin
package com.test

import com.test.util

val a = "a"

fun b() {
}

fun c()
```
