---
aliases:
- /continuous_integration/static_analysis/rules/java-security/unencrypted-socket
- /static_analysis/rules/java-security/unencrypted-socket
dependencies: []
disable_edit: true
group_id: java-security
meta:
  category: Security
  id: java-security/unencrypted-socket
  language: Java
  severity: Error
  severity_rank: 1
title: Use of socket on HTTP port
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `java-security/unencrypted-socket`

**Language:** Java

**Severity:** Error

**Category:** Security

**CWE**: [319](https://cwe.mitre.org/data/definitions/319.html)

## Description
Do not initiate socket on unencrypted ports. Use secure alternatives.

#### Learn More

 - [CWE-319: Cleartext Transmission of Sensitive Information](https://cwe.mitre.org/data/definitions/319.html)
 - [Use of Unencrypted Socket](https://find-sec-bugs.github.io/bugs.htm#UNENCRYPTED_SOCKET)

## Non-Compliant Code Examples
```java
class Class {

    public void test(){
        Socket soc = new Socket("www.google.com",80);
    }

}
```

## Compliant Code Examples
```java
class Class {

    public void test(){
        Socket soc = new Socket("www.google.com",443);
    }

}
```
