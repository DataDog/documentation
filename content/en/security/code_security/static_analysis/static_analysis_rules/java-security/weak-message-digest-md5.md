---
aliases:
- /continuous_integration/static_analysis/rules/java-security/weak-message-digest-md5
- /static_analysis/rules/java-security/weak-message-digest-md5
dependencies: []
disable_edit: true
group_id: java-security
meta:
  category: Security
  id: java-security/weak-message-digest-md5
  language: Java
  severity: Warning
  severity_rank: 2
title: MD2, MD4, and MD5 are weak hash functions
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `java-security/weak-message-digest-md5`

**Language:** Java

**Severity:** Warning

**Category:** Security

**CWE**: [328](https://cwe.mitre.org/data/definitions/328.html)

## Description
The security of the MD5 hash function is severely compromised. A collision attack exists that can find collisions within seconds on a computer with a 2.6 GHz Pentium 4 processor. Further, there is also a chosen-prefix collision attack that can produce a collision for two inputs with specified prefixes within hours, using off-the-shelf computing hardware.

#### Learn More

 - [CWE-328: Use of Weak Hash](https://cwe.mitre.org/data/definitions/328.html)
 - [On Collisions for MD5](https://www.win.tue.nl/hashclash/On%20Collisions%20for%20MD5%20-%20M.M.J.%20Stevens.pdf)

## Non-Compliant Code Examples
```java
public class MyClass {
    public void myMethod1() {
        MessageDigest md5Digest = MessageDigest.getInstance("MD5");
        md5Digest.update(password.getBytes());
        byte[] hashValue = md5Digest.digest();
    }
    public void myMethod2() {
        MessageDigest md5Digest = java.security.MessageDigest.getInstance("MD5");
        md5Digest.update(password.getBytes());
        byte[] hashValue = md5Digest.digest();
    }
}
```

## Compliant Code Examples
```java
public class MyClass {
    public static byte[] getEncryptedPassword(String password, byte[] salt) throws NoSuchAlgorithmException, InvalidKeySpecException {
        PKCS5S2ParametersGenerator gen = new PKCS5S2ParametersGenerator(new SHA256Digest());
        gen.init(password.getBytes("UTF-8"), salt.getBytes(), 4096);
        return ((KeyParameter) gen.generateDerivedParameters(256)).getKey();
    }
}
```
