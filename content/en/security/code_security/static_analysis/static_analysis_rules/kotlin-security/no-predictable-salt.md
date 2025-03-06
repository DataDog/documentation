---
aliases:
- /code_analysis/static_analysis_rules/kotlin-security/no-predictable-salt
- /continuous_integration/static_analysis/rules/kotlin-security/no-predictable-salt
- /static_analysis/rules/kotlin-security/no-predictable-salt
dependencies: []
disable_edit: true
group_id: kotlin-security
meta:
  category: Security
  id: kotlin-security/no-predictable-salt
  language: Kotlin
  severity: Error
  severity_rank: 1
title: Do not use a predictable salt
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `kotlin-security/no-predictable-salt`

**Language:** Kotlin

**Severity:** Error

**Category:** Security

**CWE**: [760](https://cwe.mitre.org/data/definitions/760.html)

## Description
Do not use a predictable salt in cryptographic operations. Salts are meant to add randomness to data, making it harder for attackers to guess the input even if they know the hash. If the salt is predictable, such as a hard-coded string or a fixed byte array, it defeats the purpose of adding randomness and makes the data more vulnerable to attacks.

It's also important to use a sufficiently large salt. A small salt size such as 8 bytes doesn't provide enough randomness and can be easily brute-forced by attackers. The recommended salt size is a minimum of 16 bytes, and 32 bytes or more is ideal.

To comply with this rule, always generate a secure random salt using `SecureRandom` or `SecureRandom.getInstanceStrong()`. Fill a byte array of at least 16 bytes with this random salt, and use this array in the `PBEParameterSpec`. This ensures that the salt is unpredictable and large enough to provide sufficient randomness.

## Non-Compliant Code Examples
```kotlin
// Hardcoded string salt
val salt1 = "somesalt".toByteArray()
val spec1 = PBEParameterSpec(salt1, 10000)

// Fixed byte array salt
val salt2 = ByteArray(16).apply { fill(1) }
val spec2 = PBEParameterSpec(salt2, 10000)

// Small salt size
val random = SecureRandom()
val salt3 = ByteArray(8)  // Too small
random.nextBytes(salt3)
val spec3 = PBEParameterSpec(salt3, 10000)
```

## Compliant Code Examples
```kotlin
// Generate secure random salt
val random = SecureRandom()
val salt = ByteArray(32)  // At least 32 bytes
random.nextBytes(salt)
val spec = PBEParameterSpec(salt, 10000)

// Alternative using .getInstanceStrong()
val random = SecureRandom.getInstanceStrong()
val salt = ByteArray(32)
random.nextBytes(salt)
val spec = PBEParameterSpec(salt, 10000)
```
