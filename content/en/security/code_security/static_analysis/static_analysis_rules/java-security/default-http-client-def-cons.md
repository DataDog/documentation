---
aliases:
- /continuous_integration/static_analysis/rules/java-security/default-http-client-def-cons
- /static_analysis/rules/java-security/default-http-client-def-cons
dependencies: []
disable_edit: true
group_id: java-security
meta:
  category: Security
  id: java-security/default-http-client-def-cons
  language: Java
  severity: Notice
  severity_rank: 3
title: DefaultHttpClient with default constructor is not secure
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `java-security/default-http-client-def-cons`

**Language:** Java

**Severity:** Notice

**Category:** Security

**CWE**: [326](https://cwe.mitre.org/data/definitions/326.html)

## Description
DefaultHttpClient with default constructor is not compatible with TLS 1.2. Make sure your HTTP client support advanced encryption protocols.

#### Learn more

 - [DefaultHttpClient with default constructor is not compatible with TLS 1.2 ](https://find-sec-bugs.github.io/bugs.htm#SSL_CONTEXT)

## Non-Compliant Code Examples
```java
public Class {

    public void foobar(){
        HttpClient client = new DefaultHttpClient();
    }
}
```

## Compliant Code Examples
```java
public Class {

    public void foobar() {
        HttpClient client1 = HttpClients.createSystem();
        HttpClient client = HttpClientBuilder.create().useSystemProperties().build();
    }
}
```
