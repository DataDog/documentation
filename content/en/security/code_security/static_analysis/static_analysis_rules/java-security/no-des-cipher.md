---
aliases:
- /continuous_integration/static_analysis/rules/java-security/no-des-cipher
- /static_analysis/rules/java-security/no-des-cipher
dependencies: []
disable_edit: true
group_id: java-security
meta:
  category: Security
  id: java-security/no-des-cipher
  language: Java
  severity: Warning
  severity_rank: 2
title: Do not use DES
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `java-security/no-des-cipher`

**Language:** Java

**Severity:** Warning

**Category:** Security

**CWE**: [326](https://cwe.mitre.org/data/definitions/326.html)

## Description
DES is considered strong ciphers for modern applications. NIST recommends the usage of AES block ciphers instead of DES.

#### Learn More

 - [DES is insecure](https://find-sec-bugs.github.io/bugs.htm#DES_USAGE)
 - [CWE-326 - Inadequate Encryption Strength](https://cwe.mitre.org/data/definitions/326.html)

## Non-Compliant Code Examples
```java
class MyClass {

    public void test1() {
        Cipher c = Cipher.getInstance("DES/ECB/PKCS5Padding");
        c.init(Cipher.ENCRYPT_MODE, k, iv);
        byte[] cipherText = c.doFinal(plainText);
    }

    public void test2() {
        Cipher c = Cipher.getInstance("DESede/ECB/PKCS5Padding");
        c.init(Cipher.ENCRYPT_MODE, k, iv);
        byte[] cipherText = c.doFinal(plainText);
    }

    public void test3() {
        javax.crypto.Cipher c = javax.crypto.Cipher.getInstance("DES/ECB/PKCS5Padding");
        // Prepare the cipher to encrypt
        javax.crypto.SecretKey key = javax.crypto.KeyGenerator.getInstance("DES").generateKey();
        java.security.spec.AlgorithmParameterSpec paramSpec =
                new javax.crypto.spec.IvParameterSpec(iv);
        c.init(javax.crypto.Cipher.ENCRYPT_MODE, key, paramSpec);
    }
}
```

## Compliant Code Examples
```java
class MyClass {

    public void test() {
        Cipher c = Cipher.getInstance("AES/GCM/NoPadding");
        c.init(Cipher.ENCRYPT_MODE, k, iv);
        byte[] cipherText = c.doFinal(plainText);
    }
}
```
