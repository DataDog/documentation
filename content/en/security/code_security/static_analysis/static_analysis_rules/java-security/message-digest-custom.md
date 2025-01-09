---
aliases:
- /continuous_integration/static_analysis/rules/java-security/message-digest-custom
- /static_analysis/rules/java-security/message-digest-custom
dependencies: []
disable_edit: true
group_id: java-security
meta:
  category: Security
  id: java-security/message-digest-custom
  language: Java
  severity: Notice
  severity_rank: 3
title: Do not use custom digest
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `java-security/message-digest-custom`

**Language:** Java

**Severity:** Notice

**Category:** Security

**CWE**: [328](https://cwe.mitre.org/data/definitions/328.html)

## Description
Avoid custom digest. Datadog recommends using existing digests that are proven to be secure. [NIST](https://csrc.nist.gov/projects/hash-functions) recommends the use of SHA-224, SHA-256, SHA-384, SHA-512, SHA-512/224, or SHA-512/256.

#### Learn More

 - [Hash functions from NIST](https://csrc.nist.gov/projects/hash-functions)
 - [Message digest is custom](https://find-sec-bugs.github.io/bugs.htm#CUSTOM_MESSAGE_DIGEST)

## Non-Compliant Code Examples
```java
class MyProprietaryMessageDigest extends MessageDigest {

    @Override
    protected byte[] engineDigest() {
        // Do not use your own digest
        return null;
    }
}
```

## Compliant Code Examples
```java
class UseExistingDigest {

    protected void usingDigest {
        // instead of defining your own digest, use existing ones
        MessageDigest sha256Digest = MessageDigest.getInstance("SHA256");
        sha256Digest.update(password.getBytes());
    }
}
```
