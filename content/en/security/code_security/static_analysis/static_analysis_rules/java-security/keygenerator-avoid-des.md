---
aliases:
- /continuous_integration/static_analysis/rules/java-security/keygenerator-avoid-des
- /static_analysis/rules/java-security/keygenerator-avoid-des
dependencies: []
disable_edit: true
group_id: java-security
meta:
  category: Security
  id: java-security/keygenerator-avoid-des
  language: Java
  severity: Warning
  severity_rank: 2
title: Avoid DES keys
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `java-security/keygenerator-avoid-des`

**Language:** Java

**Severity:** Warning

**Category:** Security

**CWE**: [326](https://cwe.mitre.org/data/definitions/326.html)

## Description
The DES protocol is deprecated. Consider using a stronger protocol such as AES.

#### Learn More

 - [CWE-326: Inadequate Encryption Strength](https://cwe.mitre.org/data/definitions/326.html)

## Non-Compliant Code Examples
```java
public Class {

    void test1() {
            javax.crypto.SecretKey key = javax.crypto.KeyGenerator.getInstance("DES").generateKey();
            java.security.spec.AlgorithmParameterSpec paramSpec =
                    new javax.crypto.spec.IvParameterSpec(iv);
            c.init(javax.crypto.Cipher.ENCRYPT_MODE, key, paramSpec);

    }

    void test2() {
            javax.crypto.SecretKey key = KeyGenerator.getInstance("DES").generateKey();
            java.security.spec.AlgorithmParameterSpec paramSpec =
                    new javax.crypto.spec.IvParameterSpec(iv);
            c.init(javax.crypto.Cipher.ENCRYPT_MODE, key, paramSpec);

    }
}
```
