---
aliases:
- /continuous_integration/static_analysis/rules/java-security/no-pseudo-random-secret
- /static_analysis/rules/java-security/no-pseudo-random-secret
dependencies: []
disable_edit: true
group_id: java-security
meta:
  category: Security
  id: java-security/no-pseudo-random-secret
  language: Java
  severity: Warning
  severity_rank: 2
title: Do not use a pseudo-random number to generate a secret
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `java-security/no-pseudo-random-secret`

**Language:** Java

**Severity:** Warning

**Category:** Security

**CWE**: [338](https://cwe.mitre.org/data/definitions/338.html)

## Description
Never use the `Random` class to generate secrets. Instead, use the `SecureRandom` class.

#### Learn More

 - [CWE-338: Use of Cryptographically Weak Pseudo-Random Number Generator](https://cwe.mitre.org/data/definitions/338.html)
 - [Predictable pseudorandom number generator](https://find-sec-bugs.github.io/bugs.htm#PREDICTABLE_RANDOM)

## Non-Compliant Code Examples
```java
class MyClass{
    public String generateSecretToken() {
        Random r = new Random();
        return Long.toHexString(r.nextLong());
    }
}
```

## Compliant Code Examples
```java
import org.apache.commons.codec.binary.Hex;

class Class {
    String generateSecretToken() {
        SecureRandom secRandom = new SecureRandom();

        byte[] result = new byte[32];
        secRandom.nextBytes(result);
        return Hex.encodeHexString(result);
    }
}

```
