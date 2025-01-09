---
aliases:
- /continuous_integration/static_analysis/rules/java-security/cipher-padding-oracle
- /static_analysis/rules/java-security/cipher-padding-oracle
dependencies: []
disable_edit: true
group_id: java-security
meta:
  category: Security
  id: java-security/cipher-padding-oracle
  language: Java
  severity: Error
  severity_rank: 1
title: ECB mode is insecure
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `java-security/cipher-padding-oracle`

**Language:** Java

**Severity:** Error

**Category:** Security

**CWE**: [326](https://cwe.mitre.org/data/definitions/326.html)

## Description
CBC mode used with `PKCS5Padding` is susceptible to padding attacks. Datadog recommends using `AES/GCM/NoPadding`.

#### Learn More

 - [Cipher is susceptible to Padding Oracle](https://find-sec-bugs.github.io/bugs.htm#PADDING_ORACLE)
 - [CWE-326 - Inadequate Encryption Strength](https://cwe.mitre.org/data/definitions/326.html)

## Non-Compliant Code Examples
```java
class MyClass {

    public void test1() {
        Cipher c = Cipher.getInstance("AES/CBC/PKCS5Padding");
        c.init(Cipher.ENCRYPT_MODE, k, iv);
        byte[] cipherText = c.doFinal(plainText);
    }

    public void test2() {
        Cipher c = javax.crypto.Cipher.getInstance("AES/CBC/PKCS5Padding");
        c.init(Cipher.ENCRYPT_MODE, k, iv);
        byte[] cipherText = c.doFinal(plainText);
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

    public void test2() {
        Cipher c = javax.crypto.Cipher.getInstance("AES/GCM/NoPadding");
        c.init(Cipher.ENCRYPT_MODE, k, iv);
        byte[] cipherText = c.doFinal(plainText);
    }
}
```
