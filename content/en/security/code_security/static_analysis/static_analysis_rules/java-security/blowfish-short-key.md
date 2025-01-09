---
aliases:
- /continuous_integration/static_analysis/rules/java-security/blowfish-short-key
- /static_analysis/rules/java-security/blowfish-short-key
dependencies: []
disable_edit: true
group_id: java-security
meta:
  category: Security
  id: java-security/blowfish-short-key
  language: Java
  severity: Warning
  severity_rank: 2
title: Blowfish should use a large key
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `java-security/blowfish-short-key`

**Language:** Java

**Severity:** Warning

**Category:** Security

**CWE**: [326](https://cwe.mitre.org/data/definitions/326.html)

## Description
When using Blowfish, use at least 128 bits of entropy to prevent potential vulnerabilities.

#### Learn More

 - [Wikipedia - Blowfish weaknesses](https://en.wikipedia.org/wiki/Blowfish_(cipher)#Weakness_and_successors)
 - [CWE-326: Inadequate Encryption Strength](https://cwe.mitre.org/data/definitions/326.html)

## Arguments

 * `min-length`: Minimum length for a Blowfish key. Default: 128.

## Non-Compliant Code Examples
```java
public class MyClass {

    public void test () {
        KeyGenerator keyGen = KeyGenerator.getInstance("Blowfish");
        keyGen.init(64);
    }
}
```

## Compliant Code Examples
```java
public class MyClass {

    public void test () {
        KeyGenerator keyGen = KeyGenerator.getInstance("Blowfish");
        keyGen.init(128);
    }
}
```
