---
aliases:
- /continuous_integration/static_analysis/rules/java-security/weak-message-digest-sha1
- /static_analysis/rules/java-security/weak-message-digest-sha1
dependencies: []
disable_edit: true
group_id: java-security
meta:
  category: Security
  id: java-security/weak-message-digest-sha1
  language: Java
  severity: Warning
  severity_rank: 2
title: SHA-1 is a weak hash function
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `java-security/weak-message-digest-sha1`

**Language:** Java

**Severity:** Warning

**Category:** Security

**CWE**: [328](https://cwe.mitre.org/data/definitions/328.html)

## Description
SHA-1 may only be used for digital signature generation where specifically allowed by NIST protocol-specific guidance. For all other applications, _SHA-1 shall not be used for digital signature generation. For digital signature verification, _SHA-1 is allowed for legacy-use.

Datadog recommends using the following protocols: SHA-224, SHA-256, SHA-384, SHA-512, SHA-512/224, and SHA-512/256.

#### Learn More

 - [CWE-328: Use of Weak Hash](https://cwe.mitre.org/data/definitions/328.html)
 - [NIST: Transitioning the Use of Cryptographic Algorithms and Key Lengths](https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-131Ar2.pdf)
 - [SHA-1 is a weak hash function](https://find-sec-bugs.github.io/bugs.htm#WEAK_MESSAGE_DIGEST_SHA1)

## Non-Compliant Code Examples
```java
public class MyClass {
  public byte[] test(String password) {
    byte[] hashValue = DigestUtils.getSha1Digest().digest(password.getBytes());
    return hashValue;
  }
}
```

```java
public class MyClass {
    public void myMethod1() {
        MessageDigest md5Digest = MessageDigest.getInstance("SHA1");
        md5Digest.update(password.getBytes());
        byte[] hashValue = md5Digest.digest();
    }

    public void myMethod2() {
        MessageDigest md5Digest = java.security.MessageDigest.getInstance("SHA1", "SUN");
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

    public static byte[] getEncryptedPassword(String password, byte[] salt) throws NoSuchAlgorithmException, InvalidKeySpecException {
        KeySpec spec = new PBEKeySpec(password.toCharArray(), salt, 4096, 256 * 8);
        SecretKeyFactory f = SecretKeyFactory.getInstance("PBKDF2WithHmacSHA256");
        return f.generateSecret(spec).getEncoded();
    }
}
```
