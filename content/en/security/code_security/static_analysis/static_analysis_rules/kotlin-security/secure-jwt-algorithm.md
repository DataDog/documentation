---
aliases:
- /code_analysis/static_analysis_rules/kotlin-security/secure-jwt-algorithm
- /continuous_integration/static_analysis/rules/kotlin-security/secure-jwt-algorithm
- /static_analysis/rules/kotlin-security/secure-jwt-algorithm
dependencies: []
disable_edit: true
group_id: kotlin-security
meta:
  category: Security
  id: kotlin-security/secure-jwt-algorithm
  language: Kotlin
  severity: Error
  severity_rank: 1
title: Avoid unsafe 'none' algorithm when creating JWTs
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `kotlin-security/secure-jwt-algorithm`

**Language:** Kotlin

**Severity:** Error

**Category:** Security

**CWE**: [327](https://cwe.mitre.org/data/definitions/327.html)

## Description
This rule helps maintain the integrity and security of JSON Web Tokens (JWTs) in your Kotlin applications. JWTs are often used for authentication and information exchange, which makes them a prime target for malicious attacks. Using the `none` algorithm in JWT creation means that the tokens are not signed or validated, which can lead to token forgery and unauthorized access to sensitive data.

This rule is important because an attacker can modify the token payload when the algorithm is `none`. In this case, because there is no signature to verify that the content was not tampered with, the attacker can impersonate any user. This can lead to serious security breaches.

To adhere to this rule, always use a secure algorithm when creating JWTs. For instance, use HMAC combined with SHA-256 (`HMAC256`). This ensures that the tokens are signed and validated, preventing token forgery. Additionally, handle exceptions properly to ensure your application can respond effectively to any JWT creation errors.

## Non-Compliant Code Examples
```kotlin
// Non-compliant: Using 'none' algorithm which allows token forgery
fun createUnsafeJwtToken(issuer: String): String {
    try {
        // WARNING: This allows attackers to forge tokens
        val algorithm = Algorithm.none()
        return JWT.create()
            .withIssuer(issuer)
            .sign(algorithm)
    } catch (e: JWTCreationException) {
        throw SecurityException("Failed to create JWT token", e)
    }
}
```

## Compliant Code Examples
```kotlin
// Compliant: Using secure HMAC256 algorithm
fun createSecureJwtToken(issuer: String, secretKey: String): String {
    try {
        // Secure algorithm with proper key
        val algorithm = Algorithm.HMAC256(secretKey)
        return JWT.create()
            .withIssuer(issuer)
            .withIssuedAt(Date())
            .sign(algorithm)
    } catch (e: JWTCreationException) {
        throw SecurityException("Failed to create JWT token", e)
    }
}
```
