---
aliases:
- /code_analysis/static_analysis_rules/kotlin-security/no-pseudo-random
- /continuous_integration/static_analysis/rules/kotlin-security/no-pseudo-random
- /static_analysis/rules/kotlin-security/no-pseudo-random
dependencies: []
disable_edit: true
group_id: kotlin-security
meta:
  category: Security
  id: kotlin-security/no-pseudo-random
  language: Kotlin
  severity: Error
  severity_rank: 1
title: Avoid pseudo-random numbers
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `kotlin-security/no-pseudo-random`

**Language:** Kotlin

**Severity:** Error

**Category:** Security

**CWE**: [330](https://cwe.mitre.org/data/definitions/330.html)

## Description
This rule enforces the use of secure and unpredictable random numbers in Kotlin applications. Using pseudo-random numbers can make your code vulnerable to attacks because pseudo-random numbers follow a deterministic sequence that can be predicted if the initial seed is known. This is especially crucial in contexts such as generating encryption keys, generating random identifiers, or performing any other security-related functionalities.

To adhere to this rule, avoid using `SecureRandom` with a fixed seed using the `setSeed()` method or passing a byte array to the `SecureRandom` constructor. Both of these methods produce pseudo-random numbers, which can lead to vulnerabilities in your code. Also, avoid reseeding a `SecureRandom` instance with a predictable value, such as the current time.

Instead, create a `SecureRandom` instance without a set seed, or use `SecureRandom.getInstanceStrong()`. Following these best practices helps you generate secure and unpredictable random numbers in your Kotlin applications.

## Non-Compliant Code Examples
```kotlin
import java.security.SecureRandom

// Setting a fixed numeric seed
val random1 = SecureRandom()
random1.setSeed(123456L)  // Noncompliant

// Setting a fixed string seed
val random2 = SecureRandom("myseed".toByteArray())  // Noncompliant

// Reseeding with predictable value
val random3 = SecureRandom()
val time = System.currentTimeMillis()
random3.setSeed(time)  // Noncompliant: timestamp is predictable
```

## Compliant Code Examples
```kotlin
import java.security.SecureRandom

// Let SecureRandom choose its own seed
val random1 = SecureRandom()
val bytes = random1.nextBytes(32)

// Use strong instance (preferred)
val random2 = SecureRandom.getInstanceStrong()
val number = random2.nextInt()
```
