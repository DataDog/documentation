---
aliases:
- /continuous_integration/static_analysis/rules/kotlin-best-practices/package-naming
- /static_analysis/rules/kotlin-best-practices/package-naming
dependencies: []
disable_edit: true
group_id: kotlin-best-practices
meta:
  category: Best Practices
  id: kotlin-best-practices/package-naming
  language: Kotlin
  severity: Notice
  severity_rank: 3
title: Enforce packing naming convention
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `kotlin-best-practices/package-naming`

**Language:** Kotlin

**Severity:** Notice

**Category:** Best Practices

## Description
No description found

## Non-Compliant Code Examples
```kotlin
package foo.`foo bar`
```

```kotlin
package `foo bar`
```

```kotlin
package Foo

```

```kotlin
package foo.Foo
```

## Compliant Code Examples
```kotlin
package foo.bar
```

```kotlin
package foo
```
