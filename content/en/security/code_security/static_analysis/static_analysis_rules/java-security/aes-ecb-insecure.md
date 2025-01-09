---
aliases:
- /continuous_integration/static_analysis/rules/java-security/aes-ecb-insecure
- /static_analysis/rules/java-security/aes-ecb-insecure
dependencies: []
disable_edit: true
group_id: java-security
meta:
  category: Security
  id: java-security/aes-ecb-insecure
  language: Java
  severity: Error
  severity_rank: 1
title: ECB mode is insecure
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `java-security/aes-ecb-insecure`

**Language:** Java

**Severity:** Error

**Category:** Security

**CWE**: [326](https://cwe.mitre.org/data/definitions/326.html)

## Description
Electronic Code Book (ECB) is insecure. Datadog recommends using other mechanisms.

#### Learn More

 - [ECB is insecure](https://find-sec-bugs.github.io/bugs.htm#ECB_MODE)
 - [CWE-326 - Inadequate Encryption Strength](https://cwe.mitre.org/data/definitions/326.html)

## Non-Compliant Code Examples
```java
class MyClass {

    public void test1() {
        Cipher c = Cipher.getInstance("AES/ECB/NoPadding");
        c.init(Cipher.ENCRYPT_MODE, k, iv);
        byte[] cipherText = c.doFinal(plainText);
    }
    public void test2() {
        Cipher c = javax.crypto.Cipher.getInstance("AES/ECB/NoPadding");
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
}
```
