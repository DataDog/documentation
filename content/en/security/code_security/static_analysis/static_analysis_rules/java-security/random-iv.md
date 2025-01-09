---
aliases:
- /continuous_integration/static_analysis/rules/java-security/random-iv
- /static_analysis/rules/java-security/random-iv
dependencies: []
disable_edit: true
group_id: java-security
meta:
  category: Security
  id: java-security/random-iv
  language: Java
  severity: Warning
  severity_rank: 2
title: Use a randomly-generated IV
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `java-security/random-iv`

**Language:** Java

**Severity:** Warning

**Category:** Security

**CWE**: [1204](https://cwe.mitre.org/data/definitions/1204.html)

## Description
The initialization vector (IV) for a cryptographic operation must be random and not statically declared. Instead of using a static initialization vector, use the `SecureRandom` class that will initialize your vector with real random values.

#### Learn More

 - [`SecureRandom` documentation](https://docs.oracle.com/javase/8/docs/api/java/security/SecureRandom.html)
 - [CWE-1204: Generation of Weak Initialization Vector (IV)](https://cwe.mitre.org/data/definitions/1204.html)

## Non-Compliant Code Examples
```java
public class Foo {
    void bad() {
        byte[] iv = new byte[] { 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, };
    }

    void alsoBad() {
        byte[] iv = "secret iv in here".getBytes();
    }
}
```

## Compliant Code Examples
```java
public class Foo {
    void good() {
        SecureRandom random = new SecureRandom();
        byte iv[] = new byte[16];
        random.nextBytes(bytes);
    }
}
```
