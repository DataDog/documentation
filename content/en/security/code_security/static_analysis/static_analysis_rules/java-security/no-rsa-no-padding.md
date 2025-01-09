---
aliases:
- /continuous_integration/static_analysis/rules/java-security/no-rsa-no-padding
- /static_analysis/rules/java-security/no-rsa-no-padding
dependencies: []
disable_edit: true
group_id: java-security
meta:
  category: Security
  id: java-security/no-rsa-no-padding
  language: Java
  severity: Error
  severity_rank: 1
title: RSA with no padding is insecure
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `java-security/no-rsa-no-padding`

**Language:** Java

**Severity:** Error

**Category:** Security

**CWE**: [780](https://cwe.mitre.org/data/definitions/780.html)

## Description
You should never use RSA without padding. RSA should always be used with some padding to prevent any weak encryption.


#### Learn More

 - [RSA with no padding is insecure](https://find-sec-bugs.github.io/bugs.htm#RSA_NO_PADDING)
 - [CWE-780: Use of RSA Algorithm without OAEP](https://cwe.mitre.org/data/definitions/780.html)

## Non-Compliant Code Examples
```java
class MyClass {

    public void test1() {
        Cipher c = Cipher.getInstance("RSA/NONE/NoPadding");
        c.init(Cipher.ENCRYPT_MODE, k, iv);
        byte[] cipherText = c.doFinal(plainText);
    }

    public void test2() {
        Cipher c = javax.crypto.Cipher.getInstance("RSA/NONE/NoPadding");
        c.init(Cipher.ENCRYPT_MODE, k, iv);
        byte[] cipherText = c.doFinal(plainText);
    }
}
```

## Compliant Code Examples
```java
class MyClass {

    public void test() {
        Cipher c = Cipher.getInstance("RSA/ECB/OAEPWithMD5AndMGF1Padding");
        c.init(Cipher.ENCRYPT_MODE, k, iv);
        byte[] cipherText = c.doFinal(plainText);
    }


}
```
