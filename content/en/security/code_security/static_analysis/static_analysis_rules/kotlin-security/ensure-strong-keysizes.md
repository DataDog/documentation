---
aliases:
- /code_analysis/static_analysis_rules/kotlin-security/ensure-strong-keysizes
- /continuous_integration/static_analysis/rules/kotlin-security/ensure-strong-keysizes
- /static_analysis/rules/kotlin-security/ensure-strong-keysizes
dependencies: []
disable_edit: true
group_id: kotlin-security
meta:
  category: Security
  id: kotlin-security/ensure-strong-keysizes
  language: Kotlin
  severity: Error
  severity_rank: 1
title: Cryptographic key generation must use strong key sizes
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `kotlin-security/ensure-strong-keysizes`

**Language:** Kotlin

**Severity:** Error

**Category:** Security

**CWE**: [326](https://cwe.mitre.org/data/definitions/326.html)

## Description
This rule enforces the use of strong key sizes in cryptographic key generation. Key size is a critical factor in the security of a cryptographic system. The larger the key size, the harder it is for an attacker to break the encryption. Using weak key sizes can expose sensitive data to attackers and lead to a compromise of the system.

To adhere to this rule, always use recommended key sizes for the cryptographic algorithm in use. For RSA, use a minimum key size of 2048 bits. For AES, use a minimum key size of 128 bits. For elliptic curve cryptography (EC), use a NIST approved curve such as 'secp256r1'. Avoid using deprecated or weak key sizes because they provide less security.

## Non-Compliant Code Examples
```kotlin
// Weak RSA key size
val keyGen = KeyPairGenerator.getInstance("RSA")
keyGen.initialize(1024)  // Noncompliant: too weak

// Weak AES key size
val aesGen = KeyGenerator.getInstance("AES")
aesGen.initialize(64)    // Noncompliant: too weak

// Weak EC curve
val ecGen = KeyPairGenerator.getInstance("EC")
val params = ECGenParameterSpec("secp112r1")  // Noncompliant: too weak
ecGen.initialize(params)
```

## Compliant Code Examples
```kotlin
// Strong RSA key size
val keyGen = KeyPairGenerator.getInstance("RSA")
keyGen.initialize(2048)  // Minimum recommended
// or keyGen.initialize(3072)  // Preferred

// Strong AES key size
val aesGen = KeyGenerator.getInstance("AES")
aesGen.initialize(128)   // Minimum recommended
// or aesGen.initialize(256)  // Preferred

// Strong EC curve
val ecGen = KeyPairGenerator.getInstance("EC")
val params = ECGenParameterSpec("secp256r1")  // NIST approved
ecGen.initialize(params)
```
