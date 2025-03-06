---
aliases:
- /code_analysis/static_analysis_rules/kotlin-security/avoid-weak-ciphers
- /continuous_integration/static_analysis/rules/kotlin-security/avoid-weak-ciphers
- /static_analysis/rules/kotlin-security/avoid-weak-ciphers
dependencies: []
disable_edit: true
group_id: kotlin-security
meta:
  category: Security
  id: kotlin-security/avoid-weak-ciphers
  language: Kotlin
  severity: Error
  severity_rank: 1
title: Use strong cipher algorithms instead of deprecated ones
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `kotlin-security/avoid-weak-ciphers`

**Language:** Kotlin

**Severity:** Error

**Category:** Security

**CWE**: [327](https://cwe.mitre.org/data/definitions/327.html)

## Description
This rule enforces the use of strong cipher algorithms and discourages the use of deprecated or weak ones in your Kotlin code. Cipher algorithms are crucial for ensuring data security in applications. However, not all ciphers provide the same level of security. Some older ciphers, such as DES, have known vulnerabilities and have been deprecated.

Using weak or deprecated cipher algorithms can expose your application's data to potential security breaches. By exploiting the vulnerabilities of these weak ciphers, attackers can decrypt sensitive information, leading to data breaches.

To adhere to this rule, always use strong, up-to-date cipher algorithms in your Kotlin code. For example, instead of using `Cipher.getInstance("DES")`, which uses the deprecated DES algorithm, use `Cipher.getInstance("AES/GCM/NoPadding")`, which uses the strong AES algorithm with GCM mode and no padding. Regularly update your knowledge on the latest recommended cipher algorithms and avoid those known to be weak or compromised.

## Non-Compliant Code Examples
```kotlin
import javax.crypto.Cipher

fun main(args: Array<String>) {
    val insecureDES = Cipher.getInstance("DES")
}
```

## Compliant Code Examples
```kotlin
import javax.crypto.Cipher

fun main(args: Array<String>) {
    val secureAES = Cipher.getInstance("AES/GCM/NoPadding")
}
```
