---
aliases:
- /code_analysis/static_analysis_rules/kotlin-security/enforce-secure-tls
- /continuous_integration/static_analysis/rules/kotlin-security/enforce-secure-tls
- /static_analysis/rules/kotlin-security/enforce-secure-tls
dependencies: []
disable_edit: true
group_id: kotlin-security
meta:
  category: Security
  id: kotlin-security/enforce-secure-tls
  language: Kotlin
  severity: Error
  severity_rank: 1
title: Enforce secure TLS version
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `kotlin-security/enforce-secure-tls`

**Language:** Kotlin

**Severity:** Error

**Category:** Security

**CWE**: [757](https://cwe.mitre.org/data/definitions/757.html)

## Description
This rule enforces the use of secure Transport Layer Security (TLS) versions in Kotlin applications. TLS is a protocol that ensures privacy and data integrity between applications communicating over a network. Older versions of TLS, specifically versions 1.0 and 1.1, have known vulnerabilities and are no longer considered secure.

Failing to use a secure TLS version can expose sensitive information to attackers and compromise the security of your application. It's crucial to ensure that your Kotlin application is configured to use a secure TLS version.

To adhere to this rule, always use TLS version 1.2 or 1.3 in your Kotlin code. For example, when using the `OkHttpClient` library, you can specify the TLS version by using the `ConnectionSpec.MODERN_TLS` or by manually setting the SSLContext to `TLSv1.2` or `TLSv1.3`. Avoid using `ConnectionSpec.COMPATIBLE_TLS`, which allows for the use of insecure TLS versions.

## Non-Compliant Code Examples
```kotlin
import okhttp3.ConnectionSpec
import okhttp3.OkHttpClient

val client = OkHttpClient.Builder()
    .connectionSpecs(listOf(ConnectionSpec.COMPATIBLE_TLS))  // Insecure: allows older versions
    .build()
```

```kotlin
import javax.net.ssl.SSLContext

// Weak TLS versions
val sslContext1 = SSLContext.getInstance("TLSv1")      // Insecure
val sslContext2 = SSLContext.getInstance("TLSv1.1")    // Insecure
val sslContext3 = SSLContext.getInstance("SSLv3")      // Insecure

// Weak configuration in OkHttpClient
val client = OkHttpClient.Builder()
    .sslSocketFactory(sslContext1.socketFactory)       // Noncompliant
    .build()
```

## Compliant Code Examples
```kotlin
import okhttp3.ConnectionSpec
import okhttp3.OkHttpClient

val client = OkHttpClient.Builder()
    .connectionSpecs(listOf(ConnectionSpec.MODERN_TLS))  // Enforces TLS 1.2+
    .build()
```

```kotlin
import javax.net.ssl.SSLContext

// Use TLS 1.2 or 1.3
val sslContext = SSLContext.getInstance("TLSv1.2")  // TLSv1.3 also acceptable

// Configure OkHttpClient with strong TLS
val client = OkHttpClient.Builder()
    .sslSocketFactory(sslContext.socketFactory)
    .build()
```
