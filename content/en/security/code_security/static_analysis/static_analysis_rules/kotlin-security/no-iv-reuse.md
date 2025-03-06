---
aliases:
- /code_analysis/static_analysis_rules/kotlin-security/no-iv-reuse
- /continuous_integration/static_analysis/rules/kotlin-security/no-iv-reuse
- /static_analysis/rules/kotlin-security/no-iv-reuse
dependencies: []
disable_edit: true
group_id: kotlin-security
meta:
  category: Security
  id: kotlin-security/no-iv-reuse
  language: Kotlin
  severity: Error
  severity_rank: 1
title: Create new IVs for every counter mode encryption operation
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `kotlin-security/no-iv-reuse`

**Language:** Kotlin

**Severity:** Error

**Category:** Security

**CWE**: [323](https://cwe.mitre.org/data/definitions/323.html)

## Description
This rule addresses the use of Initialization Vectors (IVs) in counter mode encryption. An Initialization Vector is a random number that is used as the starting point for encryption algorithms. It's essential to generate fresh IVs for every encryption operation to ensure the output is not predictable, enhancing the overall security of the encryption process.

Using static or hard-coded IVs introduces a significant security risk. If an attacker knows the IV, they can predict the output of the encryption, making it much easier to break. The fundamental principle of cryptography is to keep all aspects of the encryption process as unpredictable as possible.

To adhere to this rule, always generate a fresh, random IV for each encryption operation. This ensures that even if an attacker manages to compromise one encryption operation, subsequent operations remain secure due to the unpredictability of the IVs.

## Non-Compliant Code Examples
```kotlin
// Noncompliant - Using a static IV
class InsecureEncryption {
    fun encryptData(secretKey: String, data: ByteArray): ByteArray {
        // BAD: Hardcoded IV that will be reused for every encryption
        val staticIV = "staticIVvalue123".toByteArray()
        
        val cipher = Cipher.getInstance("AES/CCM/NoPadding")
        val key = SecretKeySpec(secretKey.toByteArray(), "AES")
        val paramSpec = CCMParameterSpec(128, staticIV)
        
        cipher.init(Cipher.ENCRYPT_MODE, key, paramSpec)
        return cipher.doFinal(data)
    }
}
```

## Compliant Code Examples
```kotlin
// Compliant - Using a secure random IV
class SecureEncryption {
    fun encryptData(secretKey: String, data: ByteArray): ByteArray {
        // GOOD: Generate fresh random IV for each encryption
        val secureRandom = SecureRandom()
        val randomIV = ByteArray(12).apply {
            secureRandom.nextBytes(this)
        }
        
        val cipher = Cipher.getInstance("AES/CCM/NoPadding")
        val key = SecretKeySpec(secretKey.toByteArray(), "AES")
        val paramSpec = CCMParameterSpec(128, randomIV)
        
        cipher.init(Cipher.ENCRYPT_MODE, key, paramSpec)
        return cipher.doFinal(data)
    }
}
```
