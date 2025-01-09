---
aliases:
- /continuous_integration/static_analysis/rules/java-security/hardcoded-crypto-key
- /static_analysis/rules/java-security/hardcoded-crypto-key
dependencies: []
disable_edit: true
group_id: java-security
meta:
  category: Security
  id: java-security/hardcoded-crypto-key
  language: Java
  severity: Error
  severity_rank: 1
title: Secret should not be hardcoded in code
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `java-security/hardcoded-crypto-key`

**Language:** Java

**Severity:** Error

**Category:** Security

**CWE**: [312](https://cwe.mitre.org/data/definitions/312.html)

## Description
Sensitive information should not be written in cleartext in code. This would leak secrets to unauthorized entities. Instead of writing secrets directly into the code, store the secrets in a secure vault or in environment variables. Make sure you also rotate secrets periodically.

#### Learn More

 - [CWE-312: Cleartext Storage of Sensitive Information](https://cwe.mitre.org/data/definitions/312.html)

## Non-Compliant Code Examples
```java
public class Foo {
    void bad() {
        SecretKeySpec secretKeySpec = new SecretKeySpec("my secret here".getBytes(), "AES");
    }
}
```

## Compliant Code Examples
```java
public class Foo {
    void good() {
        SecretKeySpec secretKeySpec = new SecretKeySpec(Properties.getKey(), "AES");
    }
}
```
