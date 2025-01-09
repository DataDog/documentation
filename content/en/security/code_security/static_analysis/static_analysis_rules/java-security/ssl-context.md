---
aliases:
- /continuous_integration/static_analysis/rules/java-security/ssl-context
- /static_analysis/rules/java-security/ssl-context
dependencies: []
disable_edit: true
group_id: java-security
meta:
  category: Security
  id: java-security/ssl-context
  language: Java
  severity: Notice
  severity_rank: 3
title: Do not use weak SSL context
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `java-security/ssl-context`

**Language:** Java

**Severity:** Notice

**Category:** Security

## Description
Do not use `"SSL"` as it uses an old protocol. Use `"TLS"` instead.

#### Learn More

 - [Difference between SSL and TLS](https://serverfault.com/questions/64484/functional-implications-of-differences-in-ssl-and-tls/368574#368574)
 - [Weak SSL Context](https://find-sec-bugs.github.io/bugs.htm#SSL_CONTEXT)

## Non-Compliant Code Examples
```java
public class Foo {
    
    public static foobar() {
        SSLContext.getInstance("SSL");
    }
}
    
```

## Compliant Code Examples
```java
public class Foo {
    
    public static foobar() {
        SSLContext.getInstance("TLS");
    }
}
    
```
