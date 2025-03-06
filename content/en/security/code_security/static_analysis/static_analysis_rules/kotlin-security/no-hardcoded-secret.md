---
aliases:
- /code_analysis/static_analysis_rules/kotlin-security/no-hardcoded-secret
- /continuous_integration/static_analysis/rules/kotlin-security/no-hardcoded-secret
- /static_analysis/rules/kotlin-security/no-hardcoded-secret
dependencies: []
disable_edit: true
group_id: kotlin-security
meta:
  category: Security
  id: kotlin-security/no-hardcoded-secret
  language: Kotlin
  severity: Error
  severity_rank: 1
title: Avoid hardcoding secrets in JWT signing algorithms
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `kotlin-security/no-hardcoded-secret`

**Language:** Kotlin

**Severity:** Error

**Category:** Security

**CWE**: [798](https://cwe.mitre.org/data/definitions/798.html)

## Description
Hardcoding secrets in JWT (JSON Web Token) signing algorithms can expose sensitive data and compromise your application's security. JWTs are used for authorization, and if their secrets are exposed, unauthorized parties can manipulate these tokens and gain access to your system.

Hardcoding secrets in your code means they are directly included in your source code. This practice is dangerous because if your code is exposed or your system is breached, these secrets can be found and exploited by attackers. Additionally, hard-coded secrets are difficult to rotate or change without updating and redeploying your code.

To adhere to this rule, always load secrets from a secure configuration that is separate from your code. This can be done using secret management systems, environment variables, or secure configuration files. In the case of JWT signing, use a secure method to retrieve the signing secret just before you create the JWT. This ensures that your secret is not stored in an insecure location and that it can be changed without updating your code.

## Non-Compliant Code Examples
```kotlin
// Non-compliant: Hardcoded secrets in JWT algorithms
class UnsafeJwtManager {
    fun createToken(userId: String): String {
        try {
            // Dangerous: Using hardcoded secret
            val algorithm = Algorithm.HMAC256("my_super_secret_key_123")
            return JWT.create()
                .withSubject(userId)
                .sign(algorithm)
        } catch (e: JWTCreationException) {
            throw SecurityException("Token creation failed", e)
        }
    }
}
```

## Compliant Code Examples
```kotlin
// Compliant: Secrets loaded from secure configuration
class SecureJwtManager(
    private val secretProvider: SecretProvider // Interface to secret management system
) {
    fun createToken(userId: String): String {
        try {
            // Safe: Secret retrieved from secure storage
            val jwtSecret = secretProvider.getSecret("jwt_signing_key")
            val algorithm = Algorithm.HMAC256(jwtSecret)
            return JWT.create()
                .withSubject(userId)
                .sign(algorithm)
        } catch (e: JWTCreationException) {
            throw SecurityException("Token creation failed", e)
        }
    }
}
```
