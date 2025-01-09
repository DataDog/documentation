---
aliases:
- /continuous_integration/static_analysis/rules/java-security/hostname-verifier-true
- /static_analysis/rules/java-security/hostname-verifier-true
dependencies: []
disable_edit: true
group_id: java-security
meta:
  category: Security
  id: java-security/hostname-verifier-true
  language: Java
  severity: Error
  severity_rank: 1
title: HostnameVerifier should check certificates
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `java-security/hostname-verifier-true`

**Language:** Java

**Severity:** Error

**Category:** Security

**CWE**: [295](https://cwe.mitre.org/data/definitions/295.html)

## Description
A `HostnameVerifier` implementation should never just return `true`.

#### Learn More

 - [HostnameVerifier that accept any signed certificates](https://find-sec-bugs.github.io/bugs.htm#WEAK_HOSTNAME_VERIFIER)
 - [CWE-295: Improper Certificate Validation](https://cwe.mitre.org/data/definitions/295.html)

## Non-Compliant Code Examples
```java
public class AllHosts implements HostnameVerifier {
    public boolean verify(final String hostname, final SSLSession session) {
        return true;
    }
}
```

## Compliant Code Examples
```java
public class AllHosts implements HostnameVerifier {
    public boolean verify(final String hostname, final SSLSession session) {
        if(isValidCertificate) {
            return true;
        }
        return false;
    }
}
```
