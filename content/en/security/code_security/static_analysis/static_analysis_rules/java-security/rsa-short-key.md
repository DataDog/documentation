---
aliases:
- /continuous_integration/static_analysis/rules/java-security/rsa-short-key
- /static_analysis/rules/java-security/rsa-short-key
dependencies: []
disable_edit: true
group_id: java-security
meta:
  category: Security
  id: java-security/rsa-short-key
  language: Java
  severity: Warning
  severity_rank: 2
title: RSA should use a long key
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `java-security/rsa-short-key`

**Language:** Java

**Severity:** Warning

**Category:** Security

**CWE**: [326](https://cwe.mitre.org/data/definitions/326.html)

## Description
When using RSA, use keys with at least 2048 bits.

#### Learn More

 - [CWE-326: Inadequate Encryption Strength](https://cwe.mitre.org/data/definitions/326.html)

## Arguments

 * `min-length`: Minimum length for an RSA key. Default: 2048.

## Non-Compliant Code Examples
```java
public class MyClass {

    public void test () {
        KeyPairGenerator keyGen = KeyPairGenerator.getInstance("RSA");
        keyGen.initialize(512);
    }
}
```

## Compliant Code Examples
```java
public class MyClass {

    public void test () {
        KeyPairGenerator keyGen = KeyPairGenerator.getInstance("RSA");
        keyGen.initialize(2048);
    }
}
```
