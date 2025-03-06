---
aliases:
- /code_analysis/static_analysis_rules/kotlin-security/no-finalizers-on-exit
- /continuous_integration/static_analysis/rules/kotlin-security/no-finalizers-on-exit
- /static_analysis/rules/kotlin-security/no-finalizers-on-exit
dependencies: []
disable_edit: true
group_id: kotlin-security
meta:
  category: Security
  id: kotlin-security/no-finalizers-on-exit
  language: Kotlin
  severity: Error
  severity_rank: 1
title: Avoid using runtime finalizers on exit
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `kotlin-security/no-finalizers-on-exit`

**Language:** Kotlin

**Severity:** Error

**Category:** Security

**CWE**: [833](https://cwe.mitre.org/data/definitions/833.html)

## Description
This ensures the proper termination of Kotlin programs. It is generally considered unsafe to use the `System.runFinalizersOnExit(true)` method because it can lead to unpredictable program behavior. This method forces all objects undergoing finalization to be finalized when the JVM exits, which can cause problems if an object is in the middle of a critical operation.

Instead of `System.runFinalizersOnExit(true)`, you can use the Java Runtime API's `addShutdownHook` method. This method registers a new virtual-machine shutdown hook, meaning it adds a thread to run when the JVM begins its shutdown sequence. This allows you to handle any cleanup actions yourself, providing a safer and more predictable termination process.

## Non-Compliant Code Examples
```kotlin
fun foo() {
  System.runFinalizersOnExit(true)
}
```

## Compliant Code Examples
```kotlin
fun main() {
    Runtime.getRuntime().addShutdownHook(object : Thread() {
        override fun run() {
            handleShutdown()
        }
    })
}
```
