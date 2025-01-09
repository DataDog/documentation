---
aliases:
- /continuous_integration/static_analysis/rules/java-security/bad-hexa-concatenation
- /static_analysis/rules/java-security/bad-hexa-concatenation
dependencies: []
disable_edit: true
group_id: java-security
meta:
  category: Security
  id: java-security/bad-hexa-concatenation
  language: Java
  severity: Warning
  severity_rank: 2
title: Bad hexadecimal concatenation
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `java-security/bad-hexa-concatenation`

**Language:** Java

**Severity:** Warning

**Category:** Security

**CWE**: [704](https://cwe.mitre.org/data/definitions/704.html)

## Description
Using `Integer.toHexString()` may trim leading zeroes and other missing information. This mistake weakens the hash value computed since it introduces more collisions. For example, the hash values "0x0123" and "0x1203" would both output as "123" for the above function.


## Non-Compliant Code Examples
```java
class NotCompliant {
    public void myMethod() {
        MessageDigest md = MessageDigest.getInstance("SHA-256");
        byte[] resultBytes = md.digest(password.getBytes("UTF-8"));

        StringBuilder stringBuilder = new StringBuilder();
        for(byte b :resultBytes) {
            stringBuilder.append(Integer.toHexString( b & 0xFF ));
        }

        return stringBuilder.toString();
    }
}
```

## Compliant Code Examples
```java
class NotCompliant {
    public void myMethod() {
        MessageDigest md = MessageDigest.getInstance("SHA-256");
        byte[] resultBytes = md.digest(password.getBytes("UTF-8"));

        StringBuilder stringBuilder = new StringBuilder();
        for(byte b :resultBytes) {
            stringBuilder.append( String.format( "%02X", b ) );
        }

        return stringBuilder.toString();
    }
}
```
